const checkRequiredArgs = (args = {}, requiredOptions = {}) => {
    const keysRequiredOptions = Object.keys(requiredOptions);
    const keysArgs = Object.keys(args);
    if (keysRequiredOptions.length > 0 || keysArgs.length > 0) {
        let successRequired = 0;
        keysRequiredOptions.map((key) => {
            keysArgs.map((argumentKey) => {
                if (requiredOptions[key].command.replace('--', '') === argumentKey
                    || (requiredOptions[key].short && requiredOptions[key].short.replace('-', '') === argumentKey)) {
                    if (typeof args[argumentKey] === requiredOptions[key].type) {
                        successRequired += 1;
                    }
                }
            });
        });
        return successRequired === keysRequiredOptions.length;

    }
    return true;
};

module.exports = checkRequiredArgs;
