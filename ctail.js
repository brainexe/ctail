#!/usr/bin/env node

var
    Tail   = require('tail').Tail,
    glob   = require("glob"),
    colors = require('colors'),
    nomnom = require("nomnom");

var opts = nomnom
    .option('files', {
        required: true,
        position: 0,
        list: true,
        help: 'File(s) to watch at'
    })
    .option('date', {
        abbr: 'd',
        flag: true,
        help: 'Prefix all lines with current time'
    })
    .option('verbose', {
        abbr: 'v',
        flag: true,
        help: 'Print debugging info'
    })
    .option('color', {
        flag: true,
        abbr: 'c',
        default: 'true',
        help: 'Colorize the output per file'
    })
    .parse();

var files    = '{' + opts.files.join(',') + '}';
var lastFile = '';
var colorIdx = 0;
var availableColors = [
    'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'
];

glob(files, function(error, files) {
    if (0 === files.length) {
        console.error(colors.red('No files matched your pattern'));
        return;
    }

    files.forEach(function(file) {
        var color = colors[availableColors[colorIdx++ % availableColors.length]];
        if (opts.verbose) {
            console.log(color("Watch for " + file));
        }

        var tail = new Tail(file);

        tail.on("line", function (data) {
            if (lastFile != file) {
                console.log('==> ' + color(file) + ' <==');
                lastFile = file;
            }

            if (opts.date) {
                data = getDate() + ': ' + data;
            }

            console.log(color(data));
        });

        tail.on("error", function (error) {
            console.log('ERROR: ', colors.red(error));
        });
    });
});

function getDate() {
    return new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
}
