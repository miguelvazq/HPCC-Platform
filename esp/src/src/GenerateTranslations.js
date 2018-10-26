var fs = require("fs");
var path = require("path");
require("colors");
var Diff = require('diff');

var translationRootDirectory = path.join(__dirname, '..', 'eclwatch', 'nls');
var translationRootFile = path.join(__dirname, '..', 'eclwatch', 'nls', 'es', 'hpcc.js');
var translationMasterFile = fs.readFileSync(path.join(__dirname, '..', 'eclwatch', 'nls', 'hpcc.js'), 'utf8');
var targetDirectory = path.join(__dirname, '..', 'eclwatch', 'nls', 'pending');

function createATranslationDirectory(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: false}, (err) => {
            if (err) {
                throw new Error;
            }
        });
    }
}

fs.readdir(translationRootDirectory, (err, files) => {
    createATranslationDirectory(targetDirectory);
    files.forEach((directory, idx) => {
        createATranslationDirectory(targetDirectory + "\\" + directory);
        fs.stat(translationRootDirectory + "\\" + directory, (err, stat) => {
            if (stat.isDirectory()){
                fs.readdir(translationRootDirectory + "\\" + directory, (err, translateFile) => {
                    fs.readFile(translationRootDirectory + "\\" + directory + "\\" + translateFile[0], 'utf8', (err, contents) => {
                        // var diff = Diff.diffChars(translationMasterFile, contents);
                        // diff.forEach(function(part){
                        //     // green for additions, red for deletions
                        //     // grey for common parts
                        //     var color = part.added ? 'green' :
                        //     part.removed ? 'red' : 'grey';
                        //     process.stderr.write(part.value[color]);
                        // });
                    });
                });
            }
        });
    });
});