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

![Example](https://space.mdoetsch.de/index.php/apps/files_sharing/ajax/publicpreview.php?x=1307&y=790&a=true&file=ctail.png&t=JXjauX3O4qls9kQ&scalingup=0)


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
