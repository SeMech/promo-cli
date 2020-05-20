const getFiles = (entity, entityName, entityFileExt = 'jsx') => {
    const indexFile = {
        fileName: 'index.js',
        content: `export { default } from './${entityName}';\n`,
    };

    const entityFile = (entity, entityName, entityFileExt) => {
        const optionsFile = {
            fileName: `${entityName}.${entityFileExt}`
        };
        switch (entity) {
        default:
        case 'page':
        case 'component':
            optionsFile.content =  "import React, { Component } from 'react';\n"+
                "import styled from 'styled-components';\n"+
                "\n"+
                `class ${entityName} extends Component {\n`+
                "    render() {\n"+
                "        const { className } = this.props;\n"+
                "\n"+
                "        return (\n"+
                "            <Root className={className}>\n"+
                `                ${entityName}\n`+
                "            </Root>\n"+
                "        );\n"+
                "    }\n"+
                "}\n"+
                "\n"+
                "const Root = styled.div``;\n"+
                "\n"+
                `export default ${entityName};\n`;
            break;
        case 'service':
            optionsFile.content = `const ${entityName} = () => {};\n\nexport default ${entityName};\n`;
            break;
        }
        return optionsFile;
    };

    return [indexFile, entityFile(entity, entityName, entityFileExt)];
};

module.exports = getFiles;
