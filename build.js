/* eslint-disable */

const fs = require('fs-extra')

fs.emptyDirSync('./dist')
fs.ensureDirSync('./dist/levels')
fs.copySync('./public', './dist/public')
