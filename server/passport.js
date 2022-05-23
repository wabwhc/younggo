const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./models');

const UserObject = {

}
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
        async(useremail, password, done) => {
            UserObject.useremail = useremail;
            let result = await User.findAll({
                where:{
                    useremail: useremail
                }
            });
            if(result.length === 1){
                if(result[0].password === password){
                    UserObject.username = result[0].username
                    return done(null, UserObject);
                }else{
                    return done(null, false, { message : '비번이 다름' })
                }
            }else{
                return done(null, false, { message : '아이디가 다름' })
            }
        }
    ))
}
