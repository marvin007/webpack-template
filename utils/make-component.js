const os = require('os');
const eol = os.EOL;
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const paths = require(`${process.cwd()}/config`).paths;
const slash = require('./slash');
let fileSources;
const COMPONENTS_DIR = !yargs.argv.vue ? paths.src.components : paths.src.componentsVue;

////////////////////////////////////////////////////////////////////////////////////////////////////

// default content for files in new component
if (!yargs.argv.vue) {
	fileSources = {
		pug: {
			source: `mixin {componentName}()${eol}\t.{componentName}&attributes(attributes)${eol}\t\tblock${eol}`,
			importSource: `include ${slash(path.relative(paths.src.templates,
				`${paths.src.components}/{componentName}/{componentName}`))}`,
			importPath: `${paths.src.templates}/components.pug`,
		},
		sass: {
			source: `.{componentName} ${eol}\tdisplay: block${eol}`,
			importSource: `@import "@/${slash(path.relative(paths.src.base, paths.src.components))}/{componentName}/{componentName}"`,
			importPath: `${paths.src.styles}/components.sass`,
		},
	};
} else {
	fileSources = {
		js: {
			source: `export default {${eol}\tdata () {${eol}\t\treturn {${eol}\t\t\ttest: \'test\'${eol}\t\t}${eol}\t}${eol}}`,
		},
		pug: {
			source:
			`include ${paths.src.templates}/mixins${eol}${eol}` +
			`.{componentName} {{test}}`,
		},
		sass: {
			source: `.{componentName} ${eol}\tdisplay: block${eol}`,
		},
		vue: {
			source:
			`<template src="./{componentName}.pug" lang="pug"></template>${eol}` +
			`<style lang="scss" src="./{componentName}.sass"></style>${eol}` +
			`<script src="./{componentName}.js"></script>`,
		},
	};
}

function validateComponentName(componentName) {
	return new Promise((resolve, reject) => {
		const isValid = /^(\d|\w|-)+$/.test(componentName);

		if (isValid) {
			resolve(isValid);
		} else {
			const errMsg =
				`ERR>>> An incorrect component name '${componentName}'${eol}` +
				'ERR>>> A component name must include letters, numbers & the minus symbol.'

			;

			reject(errMsg);
		}
	});
}

function directoryExist(componentPath, componentName) {
	return new Promise((resolve, reject) => {
		fs.stat(componentPath, (notExist) => {
			if (notExist) {
				resolve();
			} else {
				reject(`ERR>>> The component '${componentName}' already exists.`);
			}
		});
	});
}

function createDir(dirPath) {
	return new Promise((resolve, reject) => {
		fs.mkdir(dirPath, (error) => {
			if (error) {
				reject(`ERR>>> Failed to create a folder '${dirPath}'`);
			} else {
				resolve();
			}
		});
	});
}

function createFiles(componentsPath, componentName) {
	const promises = [];

	Object.keys(fileSources).forEach((ext) => {
		const fileSource = fileSources[ext].source.replace(/\{componentName}/g, componentName);
		const filename = `${componentName}.${ext}`;
		const filePath = path.join(componentsPath, filename);

		promises.push(
			new Promise((resolve, reject) => {
				fs.writeFile(filePath, fileSource, 'utf8', (error) => {
					if (error) {
						reject(`ERR>>> Failed to create a file '${filePath}'`);
					} else {
						resolve();
					}
				});
			})
		);
	});

	return Promise.all(promises);
}

function writeImports(componentName) {
	if (yargs.argv.vue) return new Promise((resolve, reject) => {resolve()});

	const promises = [];

	Object.keys(fileSources).forEach((ext) => {
		let fileImportSource = fileSources[ext].importSource.replace(/\{componentName}/g, componentName);
		const fileImportPath = fileSources[ext].importPath;

		promises.push(
			new Promise((resolve, reject) => {
				fs.stat(fileImportPath, (error, stats) => {
                    if (error) {
                        reject(`ERR>>> Failed to read a file '${fileImportPath}'`);
                    } else {
                        fs.readFile(fileImportPath, 'utf8', (error, data) => {
                            if (error) {
                                reject(`ERR>>> Failed to read a file '${fileImportPath}'`);
                            } else {
                                let newData = data;

                                if (data.includes(fileImportSource)) {
                                    newData = newData.replace(new RegExp(`${fileImportSource}`, 'g'), '');
                                }

                                if (stats.size !== 0) {
                                    fileImportSource = `${eol}${fileImportSource}`;
                                }

                                newData = `${newData}${fileImportSource}`;

                                fs.writeFile(fileImportPath, newData, 'utf8', (error) => {
                                    if (error) {
                                        reject(`ERR>>> Failed to write a file '${fileImportPath}'`);
                                    } else {
                                        resolve();
                                    }
                                });
                            }
                        });
                    }
				});
			})
		);
	});

	return Promise.all(promises);
}

function getFiles(componentPath) {
	return new Promise((resolve, reject) => {
		fs.readdir(componentPath, (error, files) => {
			if (error) {
				reject(`ERR>>> Failed to get a file list from a folder '${componentPath}'`);
			} else {
				resolve(files);
			}
		});
	});
}

function printErrorMessage(errText) {
	console.log(errText);
	rl.close();
}

// //////////////////////////////////////////////////////////////////////////

function initMakeComponent(candidateComponentName) {
	const componentNames = candidateComponentName.trim().split(/\s+/);

	const makeComponent = (componentName) => {
		const componentPath = path.join(COMPONENTS_DIR, componentName);

		return validateComponentName(componentName)
			.then(() => directoryExist(componentPath, componentName))
			.then(() => createDir(componentPath))
			.then(() => createFiles(componentPath, componentName))
			.then(() => writeImports(componentName))
			.then(() => getFiles(componentPath))
			.then((files) => {
				const line = '-'.repeat(66 + componentName.length);

				console.log(line);
				console.log(`The component has just been created in "${COMPONENTS_DIR}/${componentName}"`);
				console.log(line);

				// Displays a list of files created
				files.forEach((file) => console.log(file));

				rl.close();
			});
	};

	if (componentNames.length === 1) {
		return makeComponent(componentNames[0]);
	}

	return componentNames.reduce((promise, name) => {
		return promise.then(() => makeComponent(name));
	}, Promise.resolve());
}

// //////////////////////////////////////////////////////////////////////////
//
// Start here
//

// Command line arguments
const componentNameFromCli = yargs.argv._
// join all arguments to one string (to simplify the capture user input errors)
	.join(' ');

// If the user pass the name of the component in the command-line options
// that create a component. Otherwise - activates interactive mode
if (componentNameFromCli !== '') {
	initMakeComponent(componentNameFromCli).catch(printErrorMessage);
} else {
	rl.setPrompt('Component(s) name: ');
	rl.prompt();
	rl.on('line', (line) => {
		initMakeComponent(line).catch(printErrorMessage);
	});
}
