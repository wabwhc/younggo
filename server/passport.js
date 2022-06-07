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
                        done(null, false, {message: '비밀번호를 확인해주세요'})
                    }
                } else {
                    done(null, false, {message: '가입되지않은 이메일입니다'})
                }
            } catch (err) {
                console.error(err);
                done(err);
            }
        }));
}
