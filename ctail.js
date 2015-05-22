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
    .option('style', {
        list: ['rainbow', 'zebra', 'america', 'random', 'trap'],
        help: 'Color style'
    })
    .parse();

var ctail = new CTail(opts);
ctail.tail();
