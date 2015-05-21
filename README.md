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

Options
=======
```
Usage: ctail <files>... [options]

files     File(s) to watch at

Options:
   -d, --date      Prefix all lines with current time
   -v, --verbose   Print debugging info
   -c, --color     Colorize the output per file  [true]
```

License
=======
MIT. Please see License file for more details.
