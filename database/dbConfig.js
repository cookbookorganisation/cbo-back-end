const knex = require('knex')

const knexConfig = require('../knexfile.js')

// need to check with heroku envs before uncommenting 
const enviornment = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[enviornment])