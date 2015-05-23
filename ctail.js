#!/usr/bin/env node

var
    CTail   = require('./lib/ctail'),
    nomnom = require("nomnom");

var opts = nomnom
    .option('files', {
        required: true,
        position: 0,
        list: true,
        help: 'File(s) to watch at'
    })
    .option('lines', {
        abbr: 'n',
        default: 10,
        help: 'Output the last K lines, instead of the last 10;'
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
    .option('quiet', {
        abbr: 'q',
        flag: true,
        help: 'Never output headers giving file names'
    })
    .option('style', {
        list: ['rainbow', 'zebra', 'america', 'random', 'trap'],
        help: 'Color style'
    })
    .parse();

var ctail = new CTail(opts);
ctail.tailFiles(opts.files);
