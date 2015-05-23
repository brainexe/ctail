[![Build Status](https://travis-ci.org/brainexe/ctail.svg?branch=master)](https://travis-ci.org/brainexe/ctail)

ctail
=====

Make your tail mor colorful!

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
```

![Example](https://mdoetsch.de/wp-content/uploads/2015/05/ctail.png)


Options
=======
```
Usage: ctail <files>... [options]

files     File(s) to watch at

Options:
   -d, --date      Prefix all lines with current time
   -v, --verbose   Print debugging info
```

Tests
=====

```
npm test
```

License
=======
MIT. Please see License file for more details.
