const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const conn = require('./mysqlconn')


const User = {

}
module.exports = () => {

    passport.serializeUser((user, done) => {
        done(null, user.useremail);
    });

    passport.deserializeUser((id, done) => {
        done(null, id);
    });

    passport.use(new LocalStrategy({
        usernameField: 'useremail',
        passwordField: "password",
        session: true,
        },
        (useremail, password, done) => {
            User.useremail = useremail;
            User.password = password;
            let sql1 = 'select * from users where useremail = ?'
            conn.query(sql1, [useremail],(err, rows, field) => {
                let a = rows.length
                if(a === 1){
                    if(rows[0].password === password){
                        return done(null, User);
                    }else{
                        return done(null, false, { message : '비번이 다름' })
                    }
                }else{
                    return done(null, false, { message : '아이디가 다름' })
                }
            })
        }
    ))
}
