const path = require('path')
module.exports = {
  mode: 'production',
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack')
  }
}
