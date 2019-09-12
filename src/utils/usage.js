'use strict';

module.exports = Usage;

function Usage(description, examples = []) {
  this.description = description;

  if (typeof examples === 'string') { examples = [examples]; }
  this.examples = examples;
}

Usage.prototype.toString = function() {
  let txt = '\n';
  txt += this.description;

  if (this.examples.length > 0) {
    txt += '\n\n\t';
    txt += this.examples.join('\n\t');
  }

  txt += '\n';
  return txt;
};
