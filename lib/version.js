'use strict';

const { commands } = require('./config/commands');

module.exports = version;

version.options = commands.version.options;

version.usage = [
  {
    header: 'Usage',
    content: '$ error version <options>'
  },
  {
    header: 'Options',
    optionList: [
      { name: 'help', alias: 'h', description: 'Display help information about error.' }
    ]
  }
];

function version(version) {
  console.log(version);
}
