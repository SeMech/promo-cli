const getFiles = (componentName, componentFileExt = 'jsx') => ([
    {
        fileName: 'index.js',
        content: `export { default } from './${componentName}';\n`,
    },
    {
        fileName: `${componentName}.${componentFileExt}`,
        content: "import React, { Component } from 'react';\n"+
        "import styled from 'styled-components';\n"+
        "\n"+
        `class ${componentName} extends Component {\n`+
        "    render() {\n"+
        "        const { className } = this.props;\n"+
        "\n"+
        "        return (\n"+
        "            <Root className={className}>\n"+
        "                TestPage\n"+
        "            </Root>\n"+
        "        );\n"+
        "    }\n"+
        "}\n"+
        "\n"+
        "const Root = styled.div``;\n"+
        "\n"+
        `export default ${componentName};\n`,
    },
]);

module.exports = getFiles;
