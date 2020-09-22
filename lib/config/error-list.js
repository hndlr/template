const _ = require('lodash');
const statuses = require('statuses');

const between = require('../utils/between');

let kErrors;
module.exports = errors();

function errors() {
  if (kErrors) { return kErrors; }

  kErrors = [];
  for (const [code, title] of Object.entries(statuses.message)) {
    if (between(parseInt(code), 400, 500) || statuses.empty[code] || statuses.redirect[code] || statuses.retry[code]) {
      kErrors.push({
        klass: _.upperFirst(_.camelCase(title)),
        status: parseInt(code)
      });
    }
  }
  return kErrors;
}
