'use strict';

const _ = require('lodash');
const statuses = require('statuses');

module.exports = function errors() {
  const errors = [];
  for (const [code, title] of Object.entries(statuses.STATUS_CODES)) {
    if (between(parseInt(code), 400, 500) || statuses.empty[code] || statuses.redirect[code] || statuses.retry[code]) {
      errors.push({
        klass: _.upperFirst(_.camelCase(title)),
        status: parseInt(code)
      });
    }
  }
  return errors;
};

function between(x, min, max) {
  return x >= min && x <= max;
}
