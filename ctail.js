#!/usr/bin/env node

var
    Tail = require('tail').Tail,
    glob = require("glob"),
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

glob(files, {}, function(error, files) {
    files.forEach(function(file) {

        var color = availableColors[colorIdx++ % availableColors.length];
        if (opts.verbose) {
            console.log(colors[color]("Watch for " + file));
        }

        var tail = new Tail(file);

        tail.on("line", function (data) {
            if (lastFile != file) {
                console.log('==> ' + colors[color](file) + ' <==');
                lastFile = file;
            }

            if (opts.date) {
                data = getDate() + ': ' + data;
            }

            console.log(colors[color](data));
        });

        tail.on("error", function (error) {
            console.log('ERROR: ', error.red);
        });
    });
});

function getDate() {
    return new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
}
