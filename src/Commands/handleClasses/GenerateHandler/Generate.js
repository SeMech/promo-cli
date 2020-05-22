const path = require('path');
const fs = require('fs');

const CommandHandler = require('../../../lib/CommandHandler');
const { TYPES_GENERATE_FRONTEND_MODULE } = require('../../../lib/consts');

class Generate extends CommandHandler {
    constructor(args) {
        super(args);
        this.isRequiredProject = true;
        this.isFrontendGenerateModule = true;
        this.typeGenerateModule = TYPES_GENERATE_FRONTEND_MODULE.component;
    }

    runCommand() {
        this.isFrontendGenerateModule = !this.commandArgs.backend;
        if (this.isFrontendGenerateModule) {
            this.generateFrontend();
        } else {
            this.generateBackend();
        }
    }

    generateFrontend() {
        for (let keyTypeModule of Object.keys(TYPES_GENERATE_FRONTEND_MODULE)) {
            if (this.keyCommandArgs.indexOf(TYPES_GENERATE_FRONTEND_MODULE[keyTypeModule].flag) !== -1) {
                this.typeGenerateModule = TYPES_GENERATE_FRONTEND_MODULE[keyTypeModule];
                break;
            }
        }
        this.logger.info(`Run generate ${this.typeGenerateModule.flag}`);

        const getTemplateFiles = require(`./templates/frontend/${this.typeGenerateModule.flag}`);
        const files = getTemplateFiles(this.commandArgs.name);

        const pathToEntity = this.generateDirToEntity(
            path.join(
                this.clientPath,
                'frontend',
                this.typeGenerateModule.directory,
                this.commandArgs.name,
            )
        );

        files.map((file) => {
            console.log(`${pathToEntity}/${file.fileName}`);
            fs.writeFileSync(`${pathToEntity}/${file.fileName}`, file.content);
        });

        this.logger.success(`${this.typeGenerateModule.flag} successfully created!`)
    }

    generateBackend() {
        this.logger.print('run generate backend');
    }

    generateDirToEntity(pathToEntity) {
        return pathToEntity.split(path.sep).reduce((parentDir, childDir) => {
            const currentDir = path.resolve(path.sep, parentDir, childDir);
            if (!fs.existsSync(currentDir)) {
                try {
                    fs.mkdirSync(currentDir);
                } catch (e) {
                    console.log(e);
                }
            }
            return currentDir;
        });
    }
}

module.exports = Generate;
