'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const ejs = require('ejs');

const error = require('./error');
const Usage = require('./utils/usage');
const errors = require('./config/error-list');
const { write, mkdir } = require('./utils/bash_methods');
const TEMPLATE_DIR = require('./utils/template-dir');

const build = module.exports = {};

build.usage = new Usage('Build the src files for error', [
  'error build [--dir=.]'
]);

/* Should we look into checking to see if dir exists first or throw an error?? */
build.run = function(argv, cb) {
  const dir = error.config.get('dir');

  if (!fs.existsSync(dir)) { return cb(new Error('dir does not exist')); }

  const errorTemp = loadTemplate('js/errors.js');
  errorTemp.locals.errors = errors;

  mkdir(dir, 'src');

  copyTemplate('js/handler.js', path.join(dir, 'src/handler.js'));
  copyTemplate('js/index.js', path.join(dir, 'src/index.js'));

  write(path.join(dir, 'src/errors.js'), errorTemp.render());

  cb();
};

/**
 * Copy file from template directory.
 */

function copyTemplate(from, to) {
  write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'));
}

/**
 * Load template file.
 */

function loadTemplate(name) {
  const contents = fs.readFileSync(path.join(TEMPLATE_DIR, (`${name}.ejs`)), 'utf-8');
  const locals = Object.create(null);

  function render() {
    return ejs.render(contents, locals, {
      escape: util.inspect
    });
  }

  return {
    locals: locals,
    render: render
  };
}
