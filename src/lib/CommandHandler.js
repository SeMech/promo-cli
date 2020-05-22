const crossSpawn = require('cross-spawn');
const Logger = require('./Logger');

class CommandHandler {
    constructor(clientArgs = { args: {}, clientPath: '' }) {
        this.logger = Logger;
        this.commandArgs = clientArgs.args;
        this.keyCommandArgs = Object.keys(this.commandArgs);
        this.clientPath = clientArgs.clientPath;
        this.isRequiredProject = false;
    }

    spawnSync(command, args, options) {
        const clientCommand = crossSpawn.sync(command, args, options);
        if (clientCommand.error) {
            console.log(clientCommand.error);
            return false;
        }
        return true;
    }

    runCommand() {
        console.log('runCommand');
    }

}

module.exports = CommandHandler;
