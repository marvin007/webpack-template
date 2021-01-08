const yargs = require('yargs');

const argv = yargs.default({
	cache: true,
	ci: false,
	fixJs: false,
	port: 3000,
	lintPug: false,
	lintScss: false,
	lintJs: false,
	lint: false,
}).argv;

const paths = {
	src: {
		base: './src',
		get components() {return `${this.base}/components`},
		get componentsVue() {return `${this.base}/components-vue`},
		get templates() {return `${this.base}/templates`},
		get pages() {return `${this.templates}/pages`},
		get data() {return `${this.base}/data`},
		get scripts() {return `${this.base}/scripts`},
		get styles() {return `${this.base}/styles`},
        get resources() {return `${this.base}/resources`},
		get img() {return `${this.resources}/images`},
		get sprites() {return `${this.resources}/images/sprites`},
		get fonts() {return `${this.resources}/fonts`},
		get media() {return `${this.resources}/media`},
	},
	build: {
		base: './build',
		get css() {return `${this.base}/css`},
		get js() {return `${this.base}/js`},
		get img() {return `${this.base}/images`},
		get fonts() {return `${this.base}/fonts`},
		get media() {return `${this.base}/media`},
		get pages() {return this.base},
	},
};

const modulesToTranspile = [
	'swiper',
	'dom7'
];

module.exports = {
	argv,
	paths,
	modulesToTranspile,
};
