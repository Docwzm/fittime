'use strict'
var env = {
  NODE_ENV: '"development"',
  BUILD_URL: '""'
}
let str = process.argv.splice(-1);
if(str == 'online') {
  env.BUILD_URL = '"//sports.lifesense.com"';
}
if(str == 'qa') {
  env.BUILD_URL = '"//sports-qa.lifesense.com"';
}
if(str == 'qa2') {
  env.BUILD_URL = '"//sports-qa2.lifesense.com"';
}
module.exports = env;