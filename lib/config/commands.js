'use strict';

const commands = module.exports.commands = { };

commands.build = {
  command: ['build', 'b'],
  options: [
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'dir', alias: 'D', type: String, multiple: false, defaultOptions: true, defaultValue: '.' }
  ],
};

commands.help = {
  command: ['help']
};

commands.version = {
  command: ['version'],
  options: [
    { name: 'help', alias: 'h', type: Boolean }
  ]
};

commands.codes = {
  command: ['codes', 'code'],
  options: [
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'range', alias: 'R', type: Number, multiple: true, defaultValue: [100, 511] }
  ]
};

module.exports.usage = [
  {
    header: 'Synopsis',
    content: '$ error <command> <options>'
  },
  {
    header: 'Command List',
    content: [
      { name: 'help', summary: 'Display help information about error.' },
      { name: 'build', summary: 'Build the src files for error' },
      { name: 'version', summary: 'Print the version.' },
      { name: 'codes', summary: 'Log error codes we are using' }
    ]
  }
];
