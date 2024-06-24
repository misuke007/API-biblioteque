const passport = require('passport');
require('./passportCb');

const securiteCb = (req, res, next) => {
    passport.authenticate("cb", { session: false }, (err, user) => {
        if (err || !user) {
            
            return res.status(401).json({serverAuthMsg: "Accès interdit" });
        }
        req.user = user;
        next();
    })(req, res, next);
};

// Exportez la fonction de middleware utilisée par passport.authenticate
module.exports = securiteCb;