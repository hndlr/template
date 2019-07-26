'use strict';

const path = require('path');

const MODE_0666 = parseInt('0666', 8);
const MODE_0755 = parseInt('0755', 8);
const TEMPLATE_DIR = path.join(__dirname, '../..', 'templates');

const constants = module.exports = { };

constants.MODE_0666 = MODE_0666;
constants.MODE_0755 = MODE_0755;
constants.TEMPLATE_DIR = TEMPLATE_DIR;
