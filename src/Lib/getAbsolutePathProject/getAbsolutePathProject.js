const path = require('path');
const fs = require('fs');

const { CLIENT_PROJECT_CONFIG } = require('../consts/commonConsts');

const getAbsolutePathProject = () => {
    const clientPathSplit = path.resolve('.').split(path.sep);
    let isExistProject = false;
    let pathWithConfig = null;
    clientPathSplit.reduce((parentPath, childPath) => {
        const currentPath = path.resolve(path.sep, parentPath, childPath);
        isExistProject = fs.existsSync(`${currentPath}${path.sep}${CLIENT_PROJECT_CONFIG}`);
        if (isExistProject) pathWithConfig = currentPath;
        return currentPath;
    });
    return pathWithConfig;
};

module.exports = getAbsolutePathProject;
