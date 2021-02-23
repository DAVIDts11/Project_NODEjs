const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const consts = require('../constants');
const User = require('../Models/user');
const Cryptr = require("cryptr");

exports.cryptr = new Cryptr(consts.GOOGLE_AUTH.crypto);

passport.serializeUser((user, done) => {
    console.log("serialize",user.username);
    done(null, user.id);

});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        console.log("deserialize",user.username);
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: consts.GOOGLE_AUTH.google.clientID,
        clientSecret: consts.GOOGLE_AUTH.google.clientSecret,
        callbackURL: '/auth/google/redirect/'
        // proxy:true
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have this user
                done(null, currentUser);
                console.log("findOne",currentUser.username);
            } else {
                // if not, create user in our db
                const newUser = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture
                })
                newUser.save().then((newUser) => {
                    console.log("save",newUser.username);
                    done(null, newUser);
                });
            }
        });
    })
);