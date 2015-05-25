var assert = require("assert"),
    reader = require('../lib/fileReader'),
    path   = require('path');

describe('FileReader', function(){
    describe('getLastLines()', function() {
        var fixture = path.resolve('./tests/fixtures/file.log');

        it('Fetch last 5 lines', function(done) {
            reader.getLastLines(fixture, 5, function(data) {
                assert.equal([6, 7, 8, 9, 10].join("\n"), data);
                done();
            });
        });

        it('Fetch last line', function(done) {
            reader.getLastLines(fixture, 1, function(data) {
                assert.equal("10", data);
                done();
            });
        });

        it('Fetch last line of unknown file', function(done) {
            reader.getLastLines('unknown.log', 1, function(data) {
                assert.equal("", data);
                done();
            });
        });
    })
});
