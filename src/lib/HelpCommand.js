const CommandHandler = require('./CommandHandler');

const { MESSAGE_ERROR_CHECK_COMMAND } = require('./consts');
const ClientCommands = require('../Commands/ClientCommands');

require('console.table');

class HelpCommand extends CommandHandler {
    constructor(props) {
        super(props);
    }

    runCommand(error = null) {
        if (error && error.status) this.logger.error(MESSAGE_ERROR_CHECK_COMMAND[error.status]);
        this.logger.info('To get a list of commands enter --help (or -h)');
        this.outputHelpCommand();
    }

    outputHelpCommand() {
        const consoleOutput = [];
        ClientCommands.commands.map((command) => {
            consoleOutput.push({
                command: `${command.command}`,
                description: command.description,
            });
        });
        console.table(consoleOutput);
    }
}

module.exports = HelpCommand;
