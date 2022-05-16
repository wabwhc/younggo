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
const nunjucks = require('nunjucks');
//회원가입부분 라우터로 처리 길어질듯 해서
const signupR = require('./signup');
const e = require('connect-flash');
//미들웨어
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: '비밀코드', resave: true, saveUninitialized: false
})); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
app.use('/api', router)
app.use('/signup', signupR);

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    autoescape: true,
    watch: true,
})

pass()
app.use(flash())

app.use('/public', express.static(path.join(__dirname, '../views/public')))

//로그인상태 미들웨어
//어떤 url이든 로그인 여부 확인후 로그인 되면 req.username에 유저이름
// 아니면 로그인안됨뜸 로그인여부 isLogin에서 username으로 변경
app.use((req, res, next) => {
    if (req.user === undefined) {
        req.username = '로그인안됨';
        req.isLogin = false;
        next();
    } else {
        let sql = 'select username from users where useremail = ?';
        conn.query(sql, [req.user], (err, rows, field) => {
            let username = rows[0].username;
            req.username = username;
            req.isLogin = true;
            next();
        })
    }
})

app.get('/', (req, res) => {
    res.render('main.html', {username: req.username, isLogin: req.isLogin});
})
app.get('/main', (req, res) => {
    let isLogin
    if (req.user === undefined) {
        isLogin = false;
    } else {
        isLogin = true;
    }

    res.render('main.html', {title: '메인페이지', username: req.body.username, isLogin: isLogin})
})

app.get('/profile', (req, res) => {
    console.log(req.session.passport.user);
    if (req.user === undefined) {
        res.redirect('/login')
    } else {
        let sql = 'select * from users where useremail = ?';
        conn.query(sql, [req.user], (err, result, filed) => {
            console.log(result)
            res.render('profile.html', {title: '프로필', user: result[0], username: req.username, isLogin: req.isLogin});
        })
    }
})

app.get('/board', (req, res) => {
    let sql = 'select article_id, article_title, useremail, category from articles'
    conn.query(sql, (err, result, filed) => {
        res.render('board.html', {title: '게시판', article: result, username: req.username, isLogin: req.isLogin});
    })
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/login', (req, res) => {
    if (req.user === undefined) {
        res.render('login.html', {title: '로그인', message: req.flash("error")});
    } else {
        res.redirect('/main')
    }
})

const {isLoggedIn, isNotloggedIn} = require('./middlewares');

app.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/main');
});

app.get('/subjects', (req, res) => {

    let sql1 = 'select * from lessons a join (select count(useremail) count, lesson_id from apply_lesson group by lesson_id) b on a.lesson_id = b.lesson_id';
    let sql2 = 'select * from studys a join (select count(useremail) count, study_id from apply_study group by study_id) b on a.study_id = b.study_id';

    let results = {}
    conn.query(sql1, (err, result1, field1) => {
        results.lessons = result1;
        conn.query(sql2, (err, result2, field2) => {
            results.studys = result2;
            res.render('subjects.html', {results, username: req.username, isLogin: req.isLogin})
        })
    })
})

app.listen(8080, () => {
    console.log('8080 conn')
})
