'use strict';

const _ = require('statuses');

const between = require('./utils/between');
const { commands } = require('./config/commands');

module.exports = codes;

codes.options = commands.codes.options;

codes.usage = [
  {
    header: 'Usage',
    content: '$ error codes <options>'
  },
  {
    header: 'Options',
    optionList: [
      { name: 'help', alias: 'h', type: Boolean, description: 'Display help information about error.' },
      { name: 'range', alias: 'R', type: Number, multiple: true, typeLabel: '{underline min} {underline max}', description: 'Set the range of codes you wish to see (defaults to all)' }
    ]
  }
];

function codes(range) {
  if (range.length !== 2) {
    throw new Error('Invalid range, should be called `error codes --range min max`');
  }

  const _range = { min: range[0], max: range[1] };
  const statuses = _.codes.filter((el) => filter(el, _range));

  statuses.forEach((el) => {
    console.log(`\x1b[31m${el}\x1b[0m ${_.STATUS_CODES[el]}`);
  });

}

function filter(key, range) {
  return between(Number(key), range.min, range.max);
}
