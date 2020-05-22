const fs = require('fs');
const path = require('path');

const CommandHandler = require('../../../lib/CommandHandler');
const { CLIENT_PROJECT_CONFIG } = require('../../../lib/consts');

class Init extends CommandHandler {
    constructor(args) {
        super(args);
    }

    runCommand() {
        const projectName = this.commandArgs.name;
        this.logger.info('Run Create project');
        this.logger.info('Download core...');
        this.spawnSync('git', ['clone', 'git@github.com:c7s/promo-core.git', projectName], {stdio: 'inherit'});
        this.spawnSync('rm', ['-rf', '.git'], {stdio: 'inherit', cwd: `./${projectName}`});
        this.logger.info('Download successfully');

        const pathToProject = path.resolve('.', `${projectName}`);

        fs.writeFileSync(
            `./${projectName}/${CLIENT_PROJECT_CONFIG}`,
            `{
    "project": {
        "name": "${projectName}",
        "path": "${pathToProject}"
    }
}`);

        this.logger.success('Project successfully created!');
    }
}

module.exports = Init;
