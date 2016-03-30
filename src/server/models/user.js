import knex from '../db/knex';

class User {
    static get() {
        return knex('users');
    }
    static count() {
        return knex('users').count('id as count');
    }
    static add(users) {
        return knex('users').insert(users);
    }
    static remove(id) {
        return knex('users').where('id', id).del();
    }
}

export default User;