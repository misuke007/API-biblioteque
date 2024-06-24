const {Utilisateur} = require ('../models')
const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

let option = {

    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret' 
}

passport.use("cb" , new JwtStrategy (option , async(paylode , done ) => {

    try{

        const user = await Utilisateur.findOne({where:{email : paylode.email}})

        return user.badge == "membre" && user.statut == "en attente" ?   done(null , user) :  done(null , false)

    }catch(error){console.log(error)}
}))