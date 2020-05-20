const Logger = require('./helpers/Logger');
const path = require('path');
const fs = require('fs');
const cspawn = require('cross-spawn');
const TemplateApplication = require('./TemplateApplication');
const getFilesComponentTemplate = require('./templates/component/templateComponent');
require('console.table');

const CommandList = require('./CommandList');
const { DEFAULT_FOLDERS } = require('./helpers/Consts');

class CliApplication extends TemplateApplication {
    async handleCommandInit(args, commandOptions) {
        const projectName = args.name || args.n;
        Logger.info('Run Create project');

        Logger.info('Download core...');
        const cloneCore = cspawn.sync('git', ['clone', 'git@github.com:c7s/promo-core.git', projectName], {stdio: 'inherit'});
        const rmGit = cspawn.sync('rm', ['-rf', '.git'], {stdio: 'inherit', cwd: `./${projectName}`});
        Logger.info('Download successfully');

        const pathToProject = path.resolve('.', `${projectName}/frontend`);

        Logger.info('Install dependencies on frontend');
        const yarnFrontend = cspawn.sync('yarn', [], {stdio: 'inherit', cwd: pathToProject});
        if (yarnFrontend.error) {console.log(yarnFrontend.error); return false;}
        fs.writeFileSync(
            `./${projectName}/frontend/config-cli.json`,
            `{
    "project": {
        "name": "${projectName}",
        "path": "${pathToProject}"
    }
}`);
        Logger.info('Dependencies installed successfully');

        Logger.success('Project successfully created! To start the project, enter commands:');
        Logger.command(`cd ${projectName}/frontend`);
        Logger.command('yarn start');
    }

    handleCommandGenerate(args, _, clientPath) {
        if (!clientPath) {
            Logger.error('Project not found');
            return false;
        }
        const entity = Object.keys(CommandList.generate.args).filter((argName) => args[argName[0]] || args[argName])[0];
        const name = args[entity[0]] || args[entity];

        const pathToComponent = `${DEFAULT_FOLDERS[entity]}${name}`;

        const currentPathToComponent = path.resolve(clientPath, pathToComponent);

        if (fs.existsSync(currentPathToComponent)) {
            Logger.info(`Component "${name}" already exist!`);
            return false;
        }

        Logger.info(`Run create component ${name}`);
        currentPathToComponent.split('/').reduce((parentDir, childDir) => {
            const currentDir = path.resolve('/', parentDir, childDir);
            if (!fs.existsSync(currentDir)) {
                try {
                    fs.mkdirSync(currentDir);
                } catch (e) {
                    console.log(e);
                }
            }
            return currentDir;
        });

        const files = getFilesComponentTemplate(entity, name, args.js ? 'js' : 'jsx');
        files.map((file) => {
            console.log(`${pathToComponent}/${file.fileName}`);
            fs.writeFileSync(`${currentPathToComponent}/${file.fileName}`, file.content);
        });
        Logger.success('Component successfully created!');
    }
}

module.exports = CliApplication;
