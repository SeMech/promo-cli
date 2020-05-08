# Aventica React promo-cli
## Installation
```shell script
$ npm install --global promo-cli (or npm i -g promo-cli)
$ yarn global add promo-cli
```
##Commands
#####1. Initial project
Creating a project from a boilerplate.

Folder structure:
```
projectName
├── backend
└── frontend
    ├── src
    └── ...
```
*command:*
```shell script
npm --init --name ProjectName
```
#####2. Generate component
Generate component.

To generate a component, you must be at the root of the project (front-end root). The project must have a `config-cli.json` or `package.json` file. The `config-cli.json` file is generated when the project is initialized.

Generate with default path to component src/modules/ComponentName\
or enter custom path with componentName.

*command:*
```shell script
npm --generate --component --name ComponentName
or
npm --generate --component --name path/to/ComponentName
```
