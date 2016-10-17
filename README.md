[![Build Status](https://travis-ci.org/brainexe/ctail.svg?branch=master)](https://travis-ci.org/brainexe/ctail)
[![Downloads](https://img.shields.io/npm/dm/ctail.svg)](https://travis-ci.org/brainexe/ctail)

ctail
=====

Make your tail more colorful!
Inclusive desktop notification in case of new log entries (optional).

Install
=======

```
npm install -g ctail
```

Usage
=====
```
ctail logs/*
ctail /var/log/messages /var/log/syslog

# shows a desktop notification in case of new log entries in syslog
ctail /var/log/syslog --notify

# by default there are aliases for "syslog", "nginx" and "mail". This can be extended in your config.json
ctail nginx

# show the last 10 lines of the log file
ctail /var/log/messages -n 10
```

![Example](https://space.mdoetsch.de/index.php/s/JXjauX3O4qls9kQ/download)

Options
=======
```
Usage: ctail <files>... [options]

files     File(s) to watch at (glob expressions are allowed)

Options:
   -n, --lines      Output the last K lines, instead of the last 5
   -e, --exclude    Excludes certain files
   --notify         Desktop notification in case of new log entries
   -d, --date       Prefix all lines with current time
   -p, --fullpath   Show the full path name instead of basename only
   --style          Special color style (rainbow, zebra, america, random, trap). Using one color per file as default
   -q, --quiet      Never output headers giving file names
   -v, --verbose    Print debugging info
   --no-color       Disable any color
```

Config
======
Just put the config.default.json to your ~/.ctail.json.
In the section "profiles" you can define shortcuts for log files. E.g. you can use the default "ctail syslog" to watch /var/log/syslog.

Tests
=====

```
npm test
```

License
=======
MIT. Please see License file for more details.
