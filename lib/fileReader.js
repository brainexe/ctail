
var fs = require('fs');

module.exports.getLastLines = function(file, lines, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            callback('');
        }

        // todo improve performance
        var fileLines = data.split("\n");
        callback(fileLines.splice(fileLines.length - lines - 1, lines).join("\n"));
    });
};
