#!/usr/bin/env node

const HelperParseCommand = require('../src/helpers/ParseCommand');
const CliApplication = require('../src/CliApplication');
const App = new CliApplication();
const userCommand = process.argv;


const parseUserCommand = HelperParseCommand.parse(userCommand);

App.loadCommandList(require('../src/CommandList'));
App.loadUserCommand(parseUserCommand);

App.start();
