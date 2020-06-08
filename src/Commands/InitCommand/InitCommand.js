const fs = require('fs');
const path = require('path');
const { CLIENT_PROJECT_CONFIG } = require('../../Lib/consts/commonConsts');
const Command = require('../../Lib/Command');

class InitCommand extends Command {
    constructor() {
        super(arguments);
        this.signature = 'init <name>';
    }

    action(name) {
        const projectName = name;
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
    }
}`);
        this.logger.success('Project successfully created!');
    }
}

module.exports = InitCommand;
