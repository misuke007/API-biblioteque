const passport = require('passport');
require('./passportMembre');

const AutorisationMembre = (req, res, next) => {

    passport.authenticate("membre", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(200).json({ serverAuthMsg: "Accès interdit à part les membres actifs!!!" });
        }
        req.user = user;
        next();
    })(req, res, next);
};


module.exports = AutorisationMembre;