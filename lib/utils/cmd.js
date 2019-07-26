'use strict';

/**
 * Determine if launched from cmd.exe
 */

module.exports = function launchedFromCmd() {
  return process.platform === 'win32' &&
    process.env._ === undefined;
};
