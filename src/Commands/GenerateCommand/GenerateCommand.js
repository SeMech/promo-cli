const fs = require('fs');
const path = require('path');
const Command = require('../../Lib/Command');
const { TYPE_FRONTEND_MODULE } = require('../../Lib/consts/typesGenerateModules');

class GenerateCommand extends Command {
    constructor() {
        super();
        this.signature = 'generate <entity> <name>';
        this.alias = 'g';
        this.isRequiredProject = true;
        this.options = [
            {
                option: '-f, --frontend',
                description: 'Generate for frontend'
            },
            {
                option: '-b, --backend',
                description: 'Generate for backend'
            },
            {
                option: '--add <targetName>',
                description: 'Generate dependent component for TargetName'
            }
        ];
    }

    action(entity, name, options) {
        this[`generate${options.backend ? 'Backend' : 'Frontend'}`](entity, name, options);
    }

    generateFrontend(entity, name, options) {
        for (let keyTypeModule of Object.keys(TYPE_FRONTEND_MODULE)) {
            if (TYPE_FRONTEND_MODULE[keyTypeModule].flag === entity) {
                this.entityModule = TYPE_FRONTEND_MODULE[keyTypeModule];
                break;
            }
        }

        if (!this.entityModule) {
            this.logger.error('Entity not found');
            return false;
        }

        this.logger.info(`Run generate ${this.entityModule.flag}`);

        let pathToEntity = path.join(
            this.absolutePath,
            'frontend',
            this.entityModule.directory,
            name,
        );

        if (options['add']) {
            if (!fs.existsSync(pathToEntity)) {
                this.logger.info('Entity is not exists!');
                return false;
            }

            pathToEntity = path.join(pathToEntity, options['add']);
        }

        if (fs.existsSync(pathToEntity)) {
            this.logger.info('Entity exists!');
            return false;
        }

        this.generateDirToEntity(pathToEntity);

        const getTemplateFiles = require(`./templates/frontend/${this.entityModule.flag}`);
        const files = getTemplateFiles(options['add'] || name);

        files.map((file) => {
            console.log(`${pathToEntity}/${file.fileName}`);
            fs.writeFileSync(`${pathToEntity}/${file.fileName}`, file.content);
        });

        this.logger.success(`${this.entityModule.flag} successfully created!`);
        return true;
    }

    generateBackend() {
        console.log('back');
    }
}

module.exports = GenerateCommand;
