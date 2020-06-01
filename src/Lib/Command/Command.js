const fs = require('fs');
const path = require('path');
const crossSpawn = require('cross-spawn');
const logger = require('../logger');

class Command {
    constructor() {
        this.signature = '';
        this.options = [];
        this.logger = logger;
        this.absolutePath = '';
        this.isRequiredProject = false;
        this.action = this.action.bind(this);
    }

    spawnSync(command, args, options) {
        const clientCommand = crossSpawn.sync(command, args, options);
        if (clientCommand.error) {
            console.log(clientCommand.error);
            return false;
        }
        return true;
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

    action() {
        console.log('action Command');
    }
}

module.exports = Command;
