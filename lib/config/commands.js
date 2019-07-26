'use strict';

const commands = module.exports.commands = { };

commands.build = {
  command: ['build', 'b'],
  options: [
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'dir', alias: 'D', type: String, multiple: false, defaultValue: '.' }
  ],
};

const usage = module.exports.usage = { };

usage.build = [
  {
    header: 'Usage',
    content: '$ error build <options>'
  },
  {
    header: 'Options',
    optionList: [
      { name: 'help', alias: 'h', description: 'Output a help file' },
      { name: 'dir', alias: 'D', description: 'The directory that the src will be built to (defaults to \'.\')' }
    ]
  }
];
