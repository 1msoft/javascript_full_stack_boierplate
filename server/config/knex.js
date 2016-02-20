'use strict';
/**
 * Knex initialization
 */

const config = require('./config');

const knex = require('knex')({
    client: 'mysql',
    connection: config.mysql,
    debug: true,
});

module.exports = knex;