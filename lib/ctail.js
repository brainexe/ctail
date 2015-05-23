
var
    Tail       = require('tail').Tail,
    colors     = require('colors'),
    path       = require('path'),
    fileReader = require('./fileReader'),
    watcher    = require('./watcher');

var CTail = function(options) {
    this.options  = options;
    this.colorIdx = 0;
    this.lastFile = null;
};

CTail.prototype.tailFiles = function(filesGlob) {
    var self = this;

    watcher(filesGlob, function(files) {
        files.forEach(function(file) {
            self.watchFile(file);
        });
    });
};

CTail.prototype.watchFile = function(file) {
    var self = this,
        color;

    color = this.getColor();

    if (this.options.verbose) {
        console.log(color("Watch for " + file));
    }

    if (this.options.lines) {
        fileReader.getLastLines(file, self.options.lines, function(lines) {
            self.printData(file, color, lines, self.options.date)
        });
    }

    var tail = new Tail(file);

    tail.on("line", function (data) {
        self.printData(file, color, data, self.options.date);
    });

    tail.on("error", function (error) {
        console.log('ERROR: ', colors.red(error));
    });
};

CTail.prototype.getColor = function() {
    var availableColors = [
        'grey', 'red', 'green', 'blue', 'white', 'yellow', 'cyan', 'magenta'
    ];

    if (this.options.style) {
        return colors[this.options.style];
    } else {
        return colors[availableColors[this.colorIdx++ % availableColors.length]];
    }
};

CTail.prototype.printData = function(file, color, data, date) {
    if (this.lastFile != file && !this.options.quiet) {
        if (this.options.basename) {
            file = path.basename(file);
        }
        console.log('==> ' + color(file).inverse + ' <==');
        this.lastFile = file;
    }

    if (date) {
        data = this.getDate() + ': ' + data;
    }

    console.log(color(data));
};

CTail.prototype.getDate = function() {
    return new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
};


module.exports = CTail;
