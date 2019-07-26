#!/usr/bin/env node

'use strict';

const program = require('command-line-args');
const help = require('command-line-usage');

const build = require('../lib/build');
const { commands } = require('../lib/config/commands');

const _exit = process.exit;
process.exit = exit;

const options = program([ { name: 'command', defaultOption: true } ], { stopAtFirstUnknown: true });
const argv = options._unknown || [];

run(options);

function run(options) {
  if (commands.build.command.includes(options.command)) {
    const buildOptions = program(build.options, { argv });

    if (buildOptions.help) {
      console.log(help(build.usage));
      exit(0);
    }

    build(buildOptions.dir);
  }
}

function exit(code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done() {
    if (!(draining--)) _exit(code);
  }

  let draining = 0;
  const streams = [process.stdout, process.stderr];

  exit.exited = true;

  streams.forEach(function(stream) {
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });

  done();
}
