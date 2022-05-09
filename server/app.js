//모듈
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const pass = require('./passport');
const passport = require('passport')
const path = require('path')
const router = require('./api/router')
const conn = require('./mysqlconn');
const nunjucks  = require('nunjucks');
//회원가입부분 라우터로 처리 길어질듯 해서
const signupR = require('./signup');
const e = require('connect-flash');
//미들웨어
app.use(express.urlencoded({extended:false}))
app.use(session({ 
    secret: '비밀코드', resave: true, saveUninitialized: false 
})); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
app.use('/api', router)
app.use('/signup', signupR);

app.set('view engine', 'njk');
nunjucks.configure('views', {
    express: app,
    autoescape: true,
    watch: true,
})

pass()
app.use(flash())

app.use('/public', express.static(path.join(__dirname, '../public')))


app.get('/', (req, res) => {
    res.render('main.html');
})
app.get('/main', (req, res) => {
    let  isLogin
    if(req.user === undefined){
        isLogin = false;
    }else{
        isLogin = true;
    }
    res.render('main.html', {useremail : req.user, isLogin : isLogin})
})

app.get('/profile', (req, res) => {
    if(req.user === undefined){
        res.redirect('/login')
    }else{
        let sql = 'select * from users where useremail = ?'
        conn.query(sql, [req.user],(err, result, filed) => {
            console.log(result)
            res.render('profile.html', {user : result[0]});
        })
    }
})

app.get('/board', (req, res) => {
    let sql = 'select article_id, article_title, useremail, category from articles'
    conn.query(sql, (err, result, filed) => {
        res.render('board.html', {article : result});
    })
})

app.post('/login', passport.authenticate('local', {
    successRedirect:'/main',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/login', (req, res) => {
    if(req.user === undefined){
        res.render('login.html',{ message : req.flash("error")});
    }else{
        res.redirect('/main')
    }
})

app.get('/subjects', (req, res) => {
    let sql1 = 'select * from lessons'
    let sql2 = 'select * from studys'
    let results = {}
    conn.query(sql1, (err, result1, field1) => {
        results.lessons = result1;
        conn.query(sql2, (err, result2, field2) => {
            results.studys = result2;
        })
        res.render('subjects.html', {results})
    })
})

app.listen(8080, () => {
    console.log('8080 conn')
})