import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import keys from '../config/keys.js';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userSchema = new Schema({
    googleId: String
});

const User = model("users", userSchema);

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            console.log('profile', profile);
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        } catch (error) {
            console.error(error);
        }
        new User({ googleId: profile.id }).save();
    })
);
