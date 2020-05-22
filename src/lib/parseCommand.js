const minimist = require('minimist');

const parseCommand = (command, aliases = {}) => {
    const args = minimist(command, { alias: aliases });
    args._ = args._.slice(2);
    return args;
};

module.exports = parseCommand;
