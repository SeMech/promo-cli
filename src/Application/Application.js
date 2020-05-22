const parseCommand = require('../lib/parseCommand');
const printAventica = require('../lib/printAventica');
const getAbsolutePathProject = require('../lib/getAbsolutePathProject');

const {STATUS_ERROR_CHECK_COMMAND} = require('../lib/consts');

const ClientCommands = require('../Commands/ClientCommands');
const HelpCommand = require('../lib/HelpCommand');

class Application {
    constructor() {
        this.clientArgs = parseCommand(process.argv, ClientCommands.aliasArguments);
        this.currentCommand = null;
        this.clientPath = getAbsolutePathProject();
        this.helpCommand = new HelpCommand();
        this.error = {};
    }

    start() {
        printAventica();

        if (this.checkAndRunHelpCommand()) { return false; }

        if (!this.checkClientCommand()) {
            this.helpCommand.runCommand(this.error);
            return false;
        }

        const HandleClass = require(`../Commands/handleClasses/${this.currentCommand.handleClass}Handler/${this.currentCommand.handleClass}`);
        const HandleCommand = new HandleClass({ args: this.clientArgs, clientPath: this.clientPath });

        if (!this.checkRequiredProject(HandleCommand.isRequiredProject)) {
            this.helpCommand.runCommand(this.error);
            return false;
        }

        HandleCommand.runCommand();
    }

    checkAndRunHelpCommand() {
        if (this.clientArgs && this.clientArgs.help) {
            this.helpCommand.runCommand();
            return true;
        }
        return false;
    }

    checkRequiredProject(isRequiredProject) {
        if ((isRequiredProject && this.clientPath) || !isRequiredProject) {
            return true;
        }
        this.error.status = STATUS_ERROR_CHECK_COMMAND.IS_REQUIRED_PROJECT;
        return false;
    }

    checkClientCommand() {
        const clientCommand = ClientCommands.commands.filter((clientCommand) => clientCommand.command === this.clientArgs._[0])[0];
        if (!clientCommand) {
            this.error.status = STATUS_ERROR_CHECK_COMMAND.COMMAND_NOT_FOUND;
            return false;
        }
        const filteredRequiredArgs = clientCommand.arguments.required.filter((argument) => {
            const argumentValue = this.clientArgs[argument.argName];
            return argumentValue && typeof argumentValue === argument.type;
        });
        this.currentCommand = clientCommand;
        if (filteredRequiredArgs.length !== clientCommand.arguments.required.length) {
            this.error.status = STATUS_ERROR_CHECK_COMMAND.REQUIRED_ARGS_NOT_FOUND;
            return false;
        }
        return true;
    }
}

module.exports = Application;
