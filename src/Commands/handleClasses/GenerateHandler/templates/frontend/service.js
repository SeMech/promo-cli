const service = (entityName) => {
    return [
        {
            fileName: 'index.js',
            content: `export { default } from './${entityName}';\n`,
        },
        {
            fileName: `${entityName}.js`,
            content: `export default class ${entityName} {}\n`,
        }
    ];
};

module.exports = service;
