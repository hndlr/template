'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const ejs = require('ejs');
const minimatch = require('minimatch');

const { write } = require('./bash_methods');
const { TEMPLATE_DIR } = require('./constants');

/**
 * Copy file from template directory.
 */

function copyTemplate(from, to) {
  write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'));
}

module.exports.copyTemplate = copyTemplate;

/**
 * Copy multiple files from template directory.
 */

module.exports.copyTemplateMulti = function copyTemplateMulti(fromDir, toDir, nameGlob) {
  fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
    .filter(minimatch.filter(nameGlob, { matchBase: true }))
    .forEach(function(name) {
      copyTemplate(path.join(fromDir, name), path.join(toDir, name));
    });
};

/**
 * Load template file.
 */

module.exports.loadTemplate = function loadTemplate(name) {
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
};
