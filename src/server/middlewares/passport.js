const LocalStrategy = require('passport-local').Strategy;
const co = require('co');
const passport = require('koa-passport');

const authService = require('../services/authService');

let serialize = function (user, done) {
  done(null, user.id);
};

let deserialize = function (id, done) {
  co(function* () {
    try {
        return yield authService.findUser({ id });
    } catch (e) {
        return null;
    }
  }).then(function (user) {
    if (user) delete user.password;
    done(null, user || null);
  });
};

let authenticate = function (username, password, done) {
    username = username.toLowerCase().trim();
    password = password.trim();
    co(function *() {
        return yield authService.passwordMatches(username, password);
    }).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        done(null, false, { message: err.message });
    });
}

module.exports = function () {

    passport.serializeUser(serialize);
    
    passport.deserializeUser(deserialize);
    
    passport.use(new LocalStrategy(authenticate));

};