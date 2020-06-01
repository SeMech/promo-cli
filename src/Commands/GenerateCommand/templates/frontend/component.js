const component = (entityName) => {
    return [
        {
            fileName: 'index.js',
            content: `export { default } from './${entityName}';\n`,
        },
        {
            fileName: `${entityName}.jsx`,
            content: "import React, { Component } from 'react';\n"+
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
                `export default ${entityName};\n`,
        }
    ];
};

module.exports = component;
