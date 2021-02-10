const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const consts = require('../constants');
const User = require('../Models/user');



passport.serializeUser((user, done) => {
    console.log("user serialize =  ", user);
    done(null, user.id);
    
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        console.log("id deserialize =  ", id);
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: consts.GOOGLE_AUTH.google.clientID,
        clientSecret: consts.GOOGLE_AUTH.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        console.log("      name    : ",profile);
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser );
                done(null, currentUser);
            } else {
                // if not, create user in our db
              const newUser =  new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture
                })
                newUser.save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);