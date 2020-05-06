const chalk = require('chalk');
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
            copyDir.sync(`${root}/promo-cli/src/templates/project`, path.resolve('./', name));
            const yarnFrontend = cspawn.sync('yarn', [], { stdio: 'inherit', cwd: `./${name}/frontend`});
            console.log(chalk.green('Project successfully created\nTo start the project, enter commands:'));
            console.log(chalk.blue(`    $ cd ${name}/frontend`));
            console.log(chalk.blue(`    $ yarn start`));
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
