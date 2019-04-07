const passport = require("passport");
const passportJWT = require("passport-jwt");
const users = require("../db/users.js");
const cfg = require("./config.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategy = new Strategy(params, function(payload, done) {
      User.findUserId(payload.id)
      .then(user => done(null, {id: user.id}))
      .catch(error => done(new Error("User not found"), null));
    });
passport.use(strategy);
const auth = {
  initialize: function() {
    return passport.initialize();
  },
  authenticate: function() {
    return passport.authenticate("jwt", cfg.jwtSession);
  }
}
module.exports = auth

// module.exports = function() {
//     var strategy = new Strategy(params, function(payload, done) {
//       User.findUserId(payload.id)
//       .then(user => done(null, {id: user.id}))
//       .catch(error => done(new Error("User not found"), null));
//     });
//     passport.use(strategy);
//     return {
//         initialize: function() {
//             return passport.initialize();
//         },
//         authenticate: function() {
//             return passport.authenticate("jwt", cfg.jwtSession);
//         }
//     };
// };
