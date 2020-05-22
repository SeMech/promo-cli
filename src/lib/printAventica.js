const colors = require('colors');
const figlet = require('figlet');

const printAventica = () => {
    console.log(colors.blue(
        figlet.textSync('Aventica', { horizontalLayout: 'full' })
    ));
};

module.exports = printAventica;
