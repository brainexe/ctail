var glob   = require('glob');

module.exports = function(fileGlobs, callback) {
    glob('{' + fileGlobs.join(',') + '}', function(error, files) {
        if (0 === files.length) {
            console.error(colors.red('No files matched your pattern'));
            return;
        }

        callback(files);
    });
};
