var promisify = require('./lib/promisify');
module.exports = {
    'promisify' : promisify.promisify,
    'promisifyAll' : promisify.promisifyAll,
}
