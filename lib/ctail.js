
var
    Tail       = require('tail-forever'),
    colors     = require('colors'),
    path       = require('path'),
    fileReader = require('./fileReader'),
    watcher    = require('./watcher');

function getDate() {
    return new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
};

var CTail = function(options) {
    this.options  = options;
    this.colorIdx = 0;
    this.lastFile = null;
};

CTail.prototype.tailFiles = function(fileGlob) {
    var self = this;

    watcher(fileGlob, function(file) {
        self.watchFile(file);
    });
};

CTail.prototype.watchFile = function(file) {
    var self = this,
        color;

    color = this.getColor();

    if (this.options.verbose) {
        console.log(color("Watch for " + file.inverse));
    }

    if (this.options.lines) {
        fileReader.getLastLines(file, self.options.lines, function(lines) {
            self.printData(file, color, lines, self.options.date)
        });
    }

    var tail = new Tail(file, {});
    tail.on("line", function (data) {
        self.printData(file, color, data, self.options.date);
    });

    tail.on("error", function (error) {
        console.log('ERROR: ', colors.red(error));
    });
};

CTail.prototype.getColor = function() {
    var availableColors = [
        'grey', 'red', 'green', 'blue', 'white', 'cyan', 'yellow', 'magenta'
    ];

    if (this.options.style) {
        return colors[this.options.style];
    } else {
        return colors[availableColors[this.colorIdx++ % availableColors.length]];
    }
};

CTail.prototype.printData = function(file, color, data, date) {
    if (!data) {
        return;
    }

    if (this.lastFile != file && !this.options.quiet) {
        this.lastFile = file;
        if (this.options.basename) {
            file = path.basename(file);
        }
        console.log("\n==> " + color(file).inverse + ' <==');
    }

    if (date) {
        data = getDate() + ': ' + data;
    }

    console.log(color(data));
};

module.exports = CTail;
