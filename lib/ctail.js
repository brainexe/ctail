
var
    Tail   = require('tail').Tail,
    glob   = require("glob"),
    colors = require('colors');

var CTail = function(options) {
    this.options = options;
};

CTail.prototype.tail = function() {
    var self = this,
        files    = '{' + this.options.files.join(',') + '}',
        lastFile = '',
        colorIdx = 0,
        availableColors = [
            'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'
        ];

    glob(files, function(error, files) {
        if (0 === files.length) {
            console.error(colors.red('No files matched your pattern'));
            return;
        }

        files.forEach(function(file) {
            var color;

            if (self.options.style) {
                color = colors[self.options.style];
            } else {
                color = colors[availableColors[colorIdx++ % availableColors.length]];
            }

            if (self.options.verbose) {
                console.log(color("Watch for " + file));
            }

            var tail = new Tail(file);

            tail.on("line", function (data) {
                if (lastFile != file && !self.options.quiet) {
                    console.log('==> ' + color(file) + ' <==');
                    lastFile = file;
                }

                if (self.options.date) {
                    data = self.getDate() + ': ' + data;
                }

                console.log(color(data));
            });

            tail.on("error", function (error) {
                console.log('ERROR: ', colors.red(error));
            });
        });
    });
};

CTail.prototype.getDate = function() {
    return new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
};


module.exports = CTail;
