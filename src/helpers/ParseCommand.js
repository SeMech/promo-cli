const minimist = require('minimist');

class ParseCommand {
    static parse(command) {
        const args = minimist(command);
        delete args._;
        return args;
    }
}

module.exports = ParseCommand;
