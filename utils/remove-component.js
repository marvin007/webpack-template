const os = require('os');
const eol = os.EOL;
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const paths = require(`${process.cwd()}/config`).paths;
const slash = require('./slash');
const COMPONENTS_DIR = !yargs.argv.vue ? paths.src.components : paths.src.componentsVue;

// //////////////////////////////////////////////////////////////////////////////////////////////////

// default content for files in component
const fileSources = {
	pug: {
		importSource: `include ${slash(path.relative(paths.src.templates,
				`${paths.src.components}/{componentName}/{componentName}`))}`,
		importPath: `${paths.src.templates}/components.pug`,
	},
	// sass: {
	// 	importSource: `@import "${paths.src.components}/{componentName}/{componentName}"`,
	// 	importPath: `${paths.src.scss}/_components.sass`,
	// },
};

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
				reject(`ERR>>> The component '${componentName}' does not exist.`);
			} else {
				resolve();
			}
		});
	});
}

function removeDir(dirPath) {
	return new Promise((resolve, reject) => {
		function removeFolderRecursive(path) {
			fs.readdirSync(path).forEach(function(file, index) {
				let curPath = path + "/" + file;
				if (fs.lstatSync(curPath).isDirectory()) {
					removeFolderRecursive(curPath);
				} else {
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdir(path, (error) => {
				if (error) {
					reject(`ERR>>> Failed to remove a folder '${dirPath}'`);
				} else {
					resolve();
				}
			});
		};
		removeFolderRecursive(dirPath);
	});
}

function removeImports(componentName) {
	if (yargs.argv.vue) return new Promise((resolve, reject) => {resolve()});

	const promises = [];

	Object.keys(fileSources).forEach((ext) => {
		const fileImportSource = fileSources[ext].importSource.replace(/\{componentName}/g, componentName);
		const fileImportPath = fileSources[ext].importPath;

		promises.push(
			new Promise((resolve, reject) => {
				fs.stat(fileImportPath, (error, stats) => {
					let checkSize = !(error || stats.size === 0);

					if (!checkSize) resolve();

					fs.readFile(fileImportPath, 'utf8', (error, data) => {
						if (error) {
							reject(`ERR>>> Failed to remove from file '${fileImportPath}'`);
						}

						let newData;

						if (data.includes(fileImportSource)) {
							newData = data.replace(new RegExp(`${eol}${fileImportSource}`, 'g'), '').replace(new RegExp(`${fileImportSource}${eol}`, 'g'), '');

							fs.writeFile(fileImportPath, newData, 'utf8', (error) => {
								if (error) {
									reject(`ERR>>> Failed to remove from file '${fileImportPath}'`);
								} else {
									resolve();
								}
							});
						} else {
							resolve();
						}
					});
				});
			})
		);
	});

	return Promise.all(promises);
}

function printErrorMessage(errText) {
	console.log(errText);
	rl.close();
}

// //////////////////////////////////////////////////////////////////////////

function initRemoveComponent(candidateComponentName) {
	const componentNames = candidateComponentName.trim().split(/\s+/);

	const removeComponent = (componentName) => {
		const componentPath = path.join(COMPONENTS_DIR, componentName);

		return validateComponentName(componentName)
			.then(() => directoryExist(componentPath, componentName))
			.then(() => removeDir(componentPath))
			.then(() => removeImports(componentName))
			.then(() => {
				const line = '-'.repeat(45 + componentName.length);

				console.log(line);
				console.log(`The component "${componentName}" has been removed`);
				console.log(line);

				rl.close();
			});
	};

	if (componentNames.length === 1) {
		return removeComponent(componentNames[0]);
	}

	return componentNames.reduce((promise, name) => {
		return promise.then(() => removeComponent(name));
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
// that remove a component. Otherwise - activates interactive mode
if (componentNameFromCli !== '') {
	initRemoveComponent(componentNameFromCli).catch(printErrorMessage);
} else {
	rl.setPrompt('Component(s) name: ');
	rl.prompt();
	rl.on('line', (line) => {
		initRemoveComponent(line).catch(printErrorMessage);
	});
}
