'use strict';

const config = require('@harrytwright/cli-config');

const options = require('../src/config/options');
const error = require('../src/error');

/**
 * Parse the argv and set the command of the program
 * */
const cli = config.parse(options.types, options.shorthands);
error.argv = cli.argv.remain;
if (error.deref(error.argv[0])) {
  error.command = error.argv.shift();
} else {
  cli.usage = true;
}

if (cli.version || error.command === 'version') {
  console.log(error.version);
  return process.exit(0);
}

/**
 * due to nopt with array not allowing for values after to count
 * or be added to the array like `--between 200 400`
 *
 * may look into a workaround???
 *
 * like custom option type
 * */
if (cli.between && cli.argv.remain.length > 0) {
  const extra = cli.argv.remain.pop();
  cli.between.push(parseInt(extra, 10));
} else if (cli.between) {
  delete cli.between;
}

if (cli.usage && error.command !== 'help') {
  error.argv.unshift(error.command);
  error.command = 'help';
}

config.load(options.types, cli, options.defaults, (conf) => {
  error.config = conf;

  // console.log(error);

  error.commands[error.command].run(error.argv, function(err) {
    if (err) { console.error(err); process.exit(1); }
    console.log('done');
  });
});
