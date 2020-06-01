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
    └── src
        ├── Application
        ├── common
        ├── component
        ├── pages
        ├── services
        ├── utils
        └── config
```
*command:*
```shell script
promo-cli init ProjectName
(promo-cli init<command> PromoProject<argument>)
```
### 2. Generate component
Generate component.

*command:*
```shell script
$ promo-cli g -f page Main
$ promo-cli g -f component Modal
$ promo-cli g -f common Button
$ promo-cli g -f service Api
$ promo-cli g -f utils mediaWidth
```
