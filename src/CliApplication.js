// const chalk = require('chalk');
const colors = require('colors');
const path = require('path');
const cspawn = require('cross-spawn');
const copyDir = require('copy-dir');
const root = require('global-modules');
const checkRequiredArgs = require('./helpers/CheckRequiredArgs');
const TemplateApplication = require('./TemplateApplication');
require('console.table');

class CliApplication extends TemplateApplication {
    handleCommandInit(args, commandOptions) {
        if (checkRequiredArgs(args, commandOptions.required)) {
            const name = args.name || args.n;
            if (name === true) {
                console.log(colors.red('Required arguments is not found'));
                return false;
            }
            console.log(colors.green('Run Created project'));

            console.log(colors.green('Clone boilerplate project'));
            copyDir.sync(`${root}/promo-cli/src/templates/project`, path.resolve('./', name));
            console.log(colors.green('Successfully clone'));

            console.log(colors.green('Install dependencies on frontend'));
            const yarnFrontend = cspawn.sync('yarn', [], { stdio: 'inherit', cwd: `./${name}/frontend`});
            if (yarnFrontend.error) {console.log(yarnFrontend.error); return false;}
            console.log(colors.green('Dependencies installed successfully'));

            console.log(colors.green('Project successfully created\nTo start the project, enter commands:'));
            console.log(colors.blue(`    $ cd ${name}/frontend`));
            console.log(colors.blue(`    $ yarn start`));
        } else {
            console.log(colors.red('Required arguments is not found'));
        }
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

module.exports = CliApplication;
