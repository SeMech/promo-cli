// const chalk = require('chalk');
const Logger = require('./helpers/Logger');
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
                Logger.error('Required arguments is not found');
                return false;
            }
            Logger.info('Run Created project');

            Logger.info('Clone boilerplate project');
            copyDir.sync(`${root}/promo-cli/src/templates/project`, path.resolve('./', name));
            Logger.info('Successfully clone');

            Logger.info('Install dependencies on frontend');
            const yarnFrontend = cspawn.sync('yarn', [], { stdio: 'inherit', cwd: `./${name}/frontend`});
            if (yarnFrontend.error) {console.log(yarnFrontend.error); return false;}
            Logger.info('Dependencies installed successfully');

            Logger.success('Project successfully created! To start the project, enter commands:');
            Logger.command(`cd ${name}/frontend`);
            Logger.command('yarn start');
        } else {
            Logger.error('Required arguments is not found');
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
