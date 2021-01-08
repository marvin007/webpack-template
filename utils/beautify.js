const paths = require(`${process.cwd()}/config`).paths;
const globby = require('globby');
const fs = require('fs');
const beautify = require('js-beautify').html;

globby.sync(`${paths.build.pages}/**/*.html`).forEach(function (page) {
    fs.readFile(page, 'utf8', function (error, data) {
        if (error) {
            console.log(`ERR>>> Failed to read a file`);
            throw error;
        }

        let beautifyInit = beautify(data, {
            indent_size: 2,
            indent_char: '\t',
            indent_with_tabs: true,
            inline: [
                // https://www.w3.org/TR/html5/dom.html#phrasing-content
                'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
                'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
                'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
                'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
                'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
            ]
        });

        fs.writeFile(page, beautifyInit, 'utf8', (error) => {
            if (error) {
                console.log(`ERR>>> Failed to write a file`);
                throw error;
            }

            console.log(`beautify ${page}`);
        });
    });
});
