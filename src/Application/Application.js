const Commander = require('commander');
const { version } = require('../../package');
const getAbsolutePath = require('../Lib/getAbsolutePathProject');
const logger = require('../Lib/logger');

class Application {
    constructor() {
        this.version = version;
        this.programm = new Commander.Command();
        this.programm.passCommandToAction(false);
        this.programm.storeOptionsAsProperties(true);
        this.programm.version(this.version);

        this.absolutePath = getAbsolutePath();
    }

    loadCommands() {
        const commands = require('../Commands');
        commands.map((commandClass) => {
            const command = new commandClass();
            command.absolutePath = this.absolutePath;
            const programCommand = this.programm.command(command.signature);
            if (command.alias) {
                programCommand.alias(command.alias);
            }
            command.options.map((commandOption) => {
                programCommand.option(commandOption.option, commandOption.description);
            });
            programCommand.action((...args) => {
                if (command.isRequiredProject && !this.absolutePath) {
                    logger.error('Project not found!');
                    return false;
                }
                command.action(...args);
            });
        })
    }

    start() {
        this.loadCommands();
        this.programm.parse(process.argv);
    }
}

module.exports = Application;
