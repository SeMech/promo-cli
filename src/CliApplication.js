// const chalk = require('chalk');
const Logger = require('./helpers/Logger');
const colors = require('colors');
const path = require('path');
const fs = require('fs');
const cspawn = require('cross-spawn');
const copyDir = require('copy-dir');
const root = require('global-modules');
const TemplateApplication = require('./TemplateApplication');
const getFilesComponentTemplate = require('./templates/component/templateComponent');
require('console.table');
const DEFAULT_PATH = 'src/modules/';

class CliApplication extends TemplateApplication {
    handleCommandInit(args, commandOptions) {
        const name = args.name || args.n;
        if (name === true) {
            Logger.error('Required arguments is not found');
            return false;
        }
        Logger.info('Run Create project');

        Logger.info('Clone boilerplate project');
        copyDir.sync(`${root}/promo-cli/src/templates/project`, path.resolve('./', name));
        Logger.info('Successfully clone');

        Logger.info('Install dependencies on frontend');
        const yarnFrontend = cspawn.sync('yarn', [], { stdio: 'inherit', cwd: `./${name}/frontend`});
        if (yarnFrontend.error) {console.log(yarnFrontend.error); return false;}
        fs.writeFileSync(`./${name}/frontend/config-cli.json`, `{"project": {"name": "${name}"}}`);
        Logger.info('Dependencies installed successfully');

        Logger.success('Project successfully created! To start the project, enter commands:');
        Logger.command(`cd ${name}/frontend`);
        Logger.command('yarn start');
    }

    handleCommandGenerate(args, commandOptions) {
        if (fs.existsSync('./config-cli.json')) {
            let name = args.name || args.n;
            let pathToComponent = `${DEFAULT_PATH}${name}`;
            if (name.indexOf('/') !== -1) {
                pathToComponent = name;
               const splitName = name.split('/');
               name = splitName.splice(splitName.length - 1, 1)[0];
            }
            Logger.info(`Run create component ${name}`);
            pathToComponent.split('/').reduce((parentDir, childDir) => {
                const currentDir = path.resolve('.', parentDir, childDir);
                if (!fs.existsSync(currentDir)) {
                    try {
                        fs.mkdirSync(currentDir);
                    } catch (e) {
                        console.log(e);
                    }
                }
                return currentDir;
            });
            console.log(pathToComponent);
            const files = getFilesComponentTemplate(name);
            files.map((file) => {
                console.log(`${pathToComponent}/${file.fileName}`);
                fs.writeFileSync(`${pathToComponent}/${file.fileName}`, file.content);
            });
            Logger.success('Component successfully created!')
        } else {
            Logger.error('Sorry! You have not created a project or are not at its root!')
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
