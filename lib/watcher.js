
var glob     = require('glob'),
    config   = require("./config"),
    fileList = [];

function convertFiles(fileGlob) {
    var idx, excludePattern;

    for (idx in config.excludes) {
        excludePattern = config.excludes[idx];
        if (fileGlob.match(excludePattern)) {
            return null;
        }
    }

    if (config.profiles[fileGlob]) {
        return config.profiles[fileGlob];
    }

    return fileGlob;
}

/**
 * @param {String} fileGlob
 * @param {Function} callback is called for each new file matching the glob expression
 */
function fetchFiles(fileGlob, callback) {
    var options = {
        nodir: true,
        silent: true
    };

    glob(fileGlob, options, function(error, files) {
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
    fileGlob = convertFiles(fileGlob);
    if (!fileGlob) {
        return;
    }

    fetchFiles(fileGlob, callback);

    setInterval(function () {
        fetchFiles(fileGlob, callback);
    }, 1000);
};
