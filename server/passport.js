const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {User} = require('./models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        done(null, id);
    });

    passport.use(new LocalStrategy({
            usernameField: 'useremail',
            passwordField: "password",
            session: true,
        },
        async (useremail, password, done) => {
            try {
                let UserObj = await User.findOne({
                    where: {useremail}
                });
                if (UserObj) {
                    const result = await bcrypt.compare(password, UserObj.password);
                    if (result) {
                        done(null, UserObj);
                    } else {
                        done(null, false, {message: '비번이 다름'})
                    }
                } else {
                    done(null, false, {message: '아이디가 다름'})
                }
            } catch (err) {
                console.error(err);
                done(err);
            }

        }
    ))
}
