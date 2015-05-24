var glob = require('glob');

var fileList = [];

/**
 * @param {String} fileGlob
 * @param {Function} callback is called for each new file matching the glob expression
 */
function fetchFiles(fileGlob, callback) {
    glob(fileGlob, function(error, files) {
        for (var i in files) {
            var file = files[i];

            if (fileList.indexOf(file) < 0) {
                fileList.push(file);
                callback(file);
            }
        }
    });
}

/**
 * @param {String} fileGlob
 * @param {Function} callback is called for each new file matching the glob expression
 */
module.exports = function(fileGlob, callback) {
    fetchFiles(fileGlob, callback);

    setInterval(function () {
        fetchFiles(fileGlob, callback);
    }, 1000);
};
