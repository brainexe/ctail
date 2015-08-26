"use strict";

var
    Tail       = require('tail-forever'),
    colors     = require('colors'),
    path       = require('path'),
    fs         = require('fs'),
    fileReader = require('./fileReader'),
    watcher    = require('./watcher');

function formatDate(date) {
    return date
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
}

function getDate() {
    return formatDate(new Date());
}

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
        var stats = fs.statSync(file);

        console.log(stats);
        console.log(color("Watch for " + file.inverse + ". Last modification: " + formatDate(stats.mtime)));
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
