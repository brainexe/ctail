var assert = require("assert"),
    exec   = require('child_process').exec;

describe('Help', function(){
    describe('callhelp()', function() {
        it('Show correct help page', function(done) {
            exec('node ./ctail.js --help --no-color', function(error, stdout, stderr) {
                assert(stdout.search(/Usage: node ctail\.js/) > 0, 'wrong help:' + stdout);
                done();
            });
        })
    })
});

describe('ctail', function(){
    describe('ctail via cli', function() {
        it('execute ctail without files --no-color', function(done) {
            exec('node ./ctail.js ', function(error, stdout, stderr) {
                assert(stdout.search("files argument is required") > 0, 'wrong help:' + stdout);
                done();
            });
        });
    })
});
