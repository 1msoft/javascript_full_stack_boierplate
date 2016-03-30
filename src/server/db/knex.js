/**
 * Knex initialization
 */
import knex from 'knex';
import globalConfig from '../../../global.config';

export default knex({
    client: 'mysql',
    connection: globalConfig.mysql,
    debug: true,
});