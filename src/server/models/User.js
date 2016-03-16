import knex from '../db/knex';

class User {
    static get() {
        return knex('users');
    }
}

export default User;