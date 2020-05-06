// const chalk = require('chalk');
const colors = require('colors');
const figlet = require('figlet');
const Logger = require('./helpers/Logger');
class TemplateApplication {
    constructor() {
        this.commandList = {};
        this.commandKeysList = [];
        this.userCommandArgs = '';
    }

    start() {
        console.log(colors.blue(
            figlet.textSync('Aventica', { horizontalLayout: 'full' })
        ));
        const firstArgument = Object.keys(this.userCommandArgs)[0];
        this.runCommand(firstArgument);
    }

    runCommand(commandName) {
        let success = false;
        this.commandKeysList.map((key) => {
            if (this.commandList[key].command.replace('--', '') === commandName
                || (this.commandList[key].short && this.commandList[key].short.replace('-', '') === commandName)) {
                const handleCommandName = key.charAt(0).toUpperCase() + key.slice(1);
                try {
                    delete this.userCommandArgs[commandName];
                    const args = this.userCommandArgs;
                    const commandOptions = this.commandList[key];
                    this[`handleCommand${handleCommandName}`](args, commandOptions);
                } catch (e) {
                    console.log(e);
                }
                success = true;
            }
        });
        if (!success) {
            this.handleCommandNotFound(commandName);
        }
    }

    loadCommandList(list) {
        this.commandList = list;
        this.commandKeysList = Object.keys(this.commandList);
    }

    loadUserCommand(command) {
        this.userCommandArgs = command;
    }

    handleCommandNotFound(commandName) {
        if (commandName) {
            Logger.error(`Argument ${chalk.blue(commandName)} not found! To get a list of commands enter --help (or -h)`);
        } else {
            Logger.error('To get a list of commands enter --help (or -h)');
        }
    }
}

module.exports = TemplateApplication;
