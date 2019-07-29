'use strict';

const path = require('path');

const errors = require('./config/errors');
const { commands } = require('./config/commands');
const { mkdir, write } = require('./utils/bash_methods');
const { loadTemplate, copyTemplate } = require('./utils/templates');

module.exports = build;

build.options = commands.build.options;

build.usage = [
  {
    header: 'Usage',
    content: '$ error build <options>'
  },
  {
    header: 'Options',
    optionList: [
      { name: 'help', alias: 'h', type: Boolean, description: 'Display help information about error.' },
      { name: 'dir', alias: 'D', defaultOption: true, typeLabel: '{underline folder}', description: 'The directory that the src will be built to (defaults to \'.\')' }
    ]
  }
];

function build(dir) {
  const error = loadTemplate('js/errors.js');
  error.locals.errors = errors();

  mkdir(dir, 'src');

  copyTemplate('js/handler.js', path.join(dir, 'src/handler.js'));
  copyTemplate('js/index.js', path.join(dir, 'src/index.js'));

  write(path.join(dir, 'src/errors.js'), error.render());

  console.log();
}
