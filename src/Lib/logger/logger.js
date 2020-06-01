const colors = require('colors');

const log = (...args) => console.log(args.join(''));

const info = (string) => log(`${colors.blue('[INFO]')} ${string}`);

const success = (string) => log(colors.green(`[SUCCESS] ${string}`));

const error = (string) => log(colors.red(`[ERROR] ${string}`));

const command = (string) => log(colors.gray.italic(`$ ${string}`));

const print = (string) => log(string);

module.exports = {
    info,
    command,
    success,
    error,
    print,
};
