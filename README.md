[![Build Status](https://travis-ci.org/brainexe/ctail.svg?branch=master)](https://travis-ci.org/brainexe/ctail)

ctail
=====

Make your tail more colorful!

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
ctail /var/log/messages --date

# do not show the last 10 lines of the log file
ctail /var/log/messages -n 0
```

![Example](https://mdoetsch.de/wp-content/uploads/2015/05/Selection_001.png)


Options
=======
```
Usage: ctail <files>... [options]

files     File(s) to watch at

Options:
   -n, --lines     Output the last K lines, instead of the last 10;  [10]
   -d, --date      Prefix all lines with current time
   -v, --verbose   Print debugging info
   -b, --basename  Show the basename only
   -q, --quiet     Never output headers giving file names
   --style         Color style

```

Tests
=====

```
npm test
```

License
=======
MIT. Please see License file for more details.
