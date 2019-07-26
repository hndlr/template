#!/usr/bin/env node

'use strict';

const program = require('command-line-args');
const help = require('command-line-usage');

const build = require('../lib/build');
const codes = require('../lib/codes');
const version = require('../lib/version');

const { commands, usage } = require('../lib/config/commands');

const _exit = process.exit;
process.exit = exit;

const options = program([ { name: 'command', defaultOption: true } ], { stopAtFirstUnknown: true });
const argv = options._unknown || [];

run(options);

function run(options) {
  if (commands.build.command.includes(options.command)) {
    const _options = program(build.options, { argv });

    if (_options.help) {
      console.log(help(build.usage));
      exit(0);
    } else {
      build(_options.dir);
    }
  } else if (commands.version.command.includes(options.command)) {
    const _options = program(version.options, { argv });

    if (_options.help) {
      console.log(help(version.usage));
      exit(0);
    } else {
      version('1.0.0');
    }
  } else if (commands.codes.command.includes(options.command)) {
    const _options = program(codes.options, { argv });

    if (_options.help) {
      console.log(help(codes.usage));
      exit(0);
    } else {
      try {
        codes(_options.range);
      } catch (error) {
        console.log(`\x1b[41m[ERROR]\x1b[0m \x1b[31m${error.message}\x1b[0m`);
        console.log(help(codes.usage));
        exit(1);
      }
    }
  } else {
    console.log(help(usage));
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
