var assert = require("assert"),
    exec   = require('child_process').exec;

describe('Help', function(){
    describe('callhelp()', function() {
        var out;

        beforeEach(function(done) {
            exec('node ./ctail.js --help', function(error, stdout, stderr) {
                out = stdout;
                done();
            });
        });

        it('Show correct help page', function() {
            assert(out.search(/Usage: node ctail.js/) > 0, 'wrong help:' + out);
        })
    })
});
