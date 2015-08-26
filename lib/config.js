
var config = {};

try {
    config = require("~/.ctail.json");
    config.custom = true;
} catch (e) {
    config = require("../config.default.json");
    config.custom = false;
}

config.colors   = config.colors   || {};
config.profiles = config.profiles || {};
config.excludes = config.excludes || [];

module.exports = config;
