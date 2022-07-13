const { remove } = require('fs-extra')
const {
  ES_DIR,
  LIB_DIR,
  // DIST_DIR,
  // VETUR_DIR,
  // SITE_DIST_DIR
} = require('../common/state')

async function clean () {
  await Promise.all([
    remove(ES_DIR),
    remove(LIB_DIR),
    // remove(DIST_DIR),
    // remove(VETUR_DIR),
    // remove(SITE_DIST_DIR)
  ])
}

exports.clean = clean
