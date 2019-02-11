var env = process.env.NODE_ENV
console.log(env);
var config = require('../config/'+env+'Config')

module.exports=config