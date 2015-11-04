#!/usr/bin/env node

"use strict";

var
    CTail  = require('./lib/ctail'),
    nomnom = require("nomnom");

var opts = nomnom
    .option('files', {
        required: true,
        position: 0,
        list: true,
        help: 'File(s) to watch at (glob expressions are allowed)'
    })
    .option('lines', {
        abbr: 'n',
        default: 5,
        help: 'Output the last K lines, instead of the last 5'
    })
    .option('exclude', {
        abbr: 'e',
        help: 'Excludes certain files'
    })
    .option('date', {
        abbr: 'd',
        flag: true,
        help: 'Prefix all lines with current time'
    })
    .option('fullpath', {
        abbr: 'p',
        flag: false,
        help: 'Show the full path name instead of basename only'
    })
    .option('style', {
        list: ['rainbow', 'zebra', 'america', 'random', 'trap'],
        help: 'Special color style (rainbow, zebra, america, random, trap). Using one color per file as default'
    })
    .option('quiet', {
        abbr: 'q',
        flag: true,
        help: 'Never output headers giving file names'
    })
    .option('notify', {
        abbr: 'n',
        flag: true,
        help: 'Desktop notification in case of new log entries'
    })
    .option('verbose', {
        abbr: 'v',
        flag: true,
        help: 'Print debugging info'
    })
    .option('no-color', {
        flag: true,
        help: 'Disable any color'
    })
    .parse();

var ctail = new CTail(opts);

for (var i in opts.files) {
    ctail.tailFiles(opts.files[i]);
}
