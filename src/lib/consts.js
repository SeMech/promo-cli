const STATUS_ERROR_CHECK_COMMAND = {
    COMMAND_NOT_FOUND: 1,
    REQUIRED_ARGS_NOT_FOUND: 2,
    IS_REQUIRED_PROJECT: 3,
};

const MESSAGE_ERROR_CHECK_COMMAND = {};
MESSAGE_ERROR_CHECK_COMMAND[STATUS_ERROR_CHECK_COMMAND.COMMAND_NOT_FOUND] = 'Command not found';
MESSAGE_ERROR_CHECK_COMMAND[STATUS_ERROR_CHECK_COMMAND.REQUIRED_ARGS_NOT_FOUND] = 'Required arguments not found';
MESSAGE_ERROR_CHECK_COMMAND[STATUS_ERROR_CHECK_COMMAND.IS_REQUIRED_PROJECT] = 'To execute, a generated project is required';

const CLIENT_PROJECT_CONFIG = 'promo-cli.config.json';

const TYPES_GENERATE_FRONTEND_MODULE = {
    common: {
        flag: 'common',
        directory: 'src/common',
    },
    component: {
        flag: 'component',
        directory: 'src/components',
    },
    page: {
        flag: 'page',
        directory: 'src/pages',
    },
    service: {
        flag: 'service',
        directory: 'src/services',
    },
    util: {
        flag: 'util',
        directory: 'src/utils',
    },
};

module.exports = {
    STATUS_ERROR_CHECK_COMMAND,
    MESSAGE_ERROR_CHECK_COMMAND,
    CLIENT_PROJECT_CONFIG,
    TYPES_GENERATE_FRONTEND_MODULE,
};
