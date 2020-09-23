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

build.usage = new Usage('build', 'Build the src files for error', [
  'error build'
], '[--dir=.]');

/* Should we look into checking to see if dir exists first or throw an error?? */
build.run = function(argv, cb) {
  const dir = error.config.get('dir');

  if (!fs.existsSync(dir)) { return cb(new Error('dir does not exist')); }

  const errorTemp = loadTemplate('js/index.js');
  const typeTemp = loadTemplate('ts/index.d.ts');
  errorTemp.locals.errors = typeTemp.locals.errors = errors;

  mkdir(dir, 'src');
  mkdir(dir, 'types');

  write(path.join(dir, 'src/index.js'), errorTemp.render());
  write(path.join(dir, 'types/index.d.ts'), typeTemp.render());

  cb();
};

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
