# Aventica React promo-cli
## Installation
```shell script
$ npm install --global promo-cli (or npm i -g promo-cli)
$ yarn global add promo-cli
```
## Commands
### 1. Initial project
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
promo-cli --init --name ProjectName
```
### 2. Generate component
Generate component.

To generate a component, you can be anywhere in the project. The project must have a `config-cli.json` or `package.json` file. The `config-cli.json` file is generated when the project is initialized.

Generate component. Required arguments for type generate entity (component, service, page).\
 Example `--component ComponentName`

*command:*
```shell script
promo-cli --generate --component ComponentName
promo-cli --generate --service ServiceName
promo-cli --generate --page PageName
```

## Updates
### v1.0.0
* Added command for init download from repository instead of copying from cli folders
* Now you can only generate strictly a service, page or component, without specifying a folder
* Added strict folder structure
* Now you can run cli to generate from anywhere in the current project, the main thing is that there is a `frontend` in the current path
