// const chalk = require('chalk');
const colors = require('colors');
const figlet = require('figlet');
const path = require('path');
const Logger = require('./helpers/Logger');
const checkRequiredArgs = require('./helpers/CheckRequiredArgs');
const fs = require('fs');
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
                    if (checkRequiredArgs(args, commandOptions.required)) {
                        const clientPath = path.resolve('.').split(path.sep);
                        const indexFrontendInPath = clientPath.indexOf('frontend');
                        const currentPath = indexFrontendInPath !== -1
                            ? path.resolve('.', clientPath.slice(0, indexFrontendInPath + 1).join(path.sep))
                            : null;
                        this[`handleCommand${handleCommandName}`](args, commandOptions, currentPath);
                    } else {
                        Logger.error('Required arguments is not found or arguments types do not match!');
                    }
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

        this.handleCommandHelp();
    }

    handleCommandHelp() {
        const consoleOutput = [];
        this.commandKeysList.map((commandKey) => {
            consoleOutput.push({
                command: `${this.commandList[commandKey].command} ${this.commandList[commandKey].short || ''}`,
                description: this.commandList[commandKey].description,
            });
        });
        console.table(consoleOutput);
    }
}

module.exports = TemplateApplication;
