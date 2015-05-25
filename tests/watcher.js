var assert  = require('assert'),
    watcher = require('../lib/watcher'),
    path    = require('path');

describe('FileWatcher', function() {
    var fixtures = path.resolve('./tests/fixtures/file.log');

    describe('fetchFiles()', function() {
        it('Fetch fixtures folder', function(done) {
            watcher(fixtures, function(file) {
                assert.equal(fixtures, file);
                done();
            });
        });
    })
});

