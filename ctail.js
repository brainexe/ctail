#!/usr/bin/env node

var
    CTail   = require('./lib/ctail'),
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
        help: 'Output the last K lines, instead of the last 5;'
    })
    .option('date', {
        abbr: 'd',
        flag: true,
        help: 'Prefix all lines with current time'
    })
    .option('basename', {
        abbr: 'b',
        flag: true,
        help: 'Show the basename only instead of full file path'
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
