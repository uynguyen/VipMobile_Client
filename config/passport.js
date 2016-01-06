/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 1/6/16
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */

var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done){

        //console.log("USER IN SE" + user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done){

       // console.log("DESER" + user);
    	///User.findById(id, function(err, user){
    		done(null, user);
    	//});
    });



    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
               //console.log("REQ" + req.user);
               //console.log(profile);
                var user ={
                    id : profile.id,
                    token: accessToken,
                    name: profile.displayName
                };
                //req.user = profile;
                //console.log(req.user);
               return done(null,user);

            });
        }

    ));


};
