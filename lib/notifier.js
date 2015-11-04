
var notifier = require('node-notifier');

var Notifier = function() {
};

Notifier.prototype.register = function(emitter) {
    this.emitter = emitter;

    var self = this;
    this.emitter.on('data', function(file, data) {
        self.notify(file, data);
    });
};

Notifier.prototype.notify = function(title, message) {
    notifier.notify({
        title: title,
        message: message
    }, function (err, response) {
        if (err) {
            console.error(err);
        }
    });
};

module.exports = Notifier;

