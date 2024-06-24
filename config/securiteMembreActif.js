const passport = require('passport');
require('./passportMembre');

const securiteMembreActif = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ serverAuthMsg: "Accès interdit" });
        }
        req.user = user;
        next();
    })(req, res, next);
};


module.exports = securiteMembreActif;