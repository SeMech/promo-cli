const util = (entityName) => {
    return [
        {
            fileName: 'index.js',
            content: `export { default } from './${entityName}';\n`,
        },
        {
            fileName: `${entityName}.js`,
            content: `const ${entityName} = () => {}\n`+
                "\n"+
                `export default ${entityName}\n`,
        }
    ];
};

module.exports = util;
