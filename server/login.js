const express = require('express')
const router  = express.Router();
const pass = require('./passport');
const passport = require('passport')
pass();
router.use(passport.initialize()); // passport 구동
router.use(passport.session()); // 세션 연결
router.post('/', passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/', (req, res) => {
    if(!req.isLogin){
        res.render('login.html',{ message : req.flash("error")});
    }else{
        res.redirect('/main')
    }
})

const {isLoggedIn, isNotloggedIn} = require('./middlewares');

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/main');
});


module.exports = router;