//모듈
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const path = require('path');
const router = require('./api/router');
const nunjucks = require('nunjucks');

const cookieParser = require('cookie-parser');
const app = express();

const {sequelize, Japan_info} = require('./models');

sequelize.sync({force: false})  // 서버 실행시마다 테이블을 재생성할건지에 대한 여부
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

//회원가입부분 라우터로 처리 길어질듯 해서
const signupR = require('./signup');
const postRouter = require('./post');
//미들웨어
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: '비밀코드',
    resave: false,
    saveUninitialized: false
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


app.use(flash())

app.use('/public', express.static(path.join(__dirname, '../views/public')))
app.use('/img', express.static(path.join(__dirname, '../uploads')));
//로그인상태 미들웨어
//어떤 url이든 로그인 여부 확인후 로그인 되면 req.username에 유저이름
app.use((req, res, next) => {
    if (req.user === undefined) {
        req.user = {username: '', useremail: ''};
        req.isLogin = false;
        next();
    } else {
        req.isLogin = true;
        next();
    }
})

//라우터
const profile = require('./profile');
const profileUpdate = require('./profileUpdate');
const board = require('./board');
const login = require('./login');
const subjects = require('./subjects');


app.use('/post', postRouter);
app.get('/', (req, res) => {
    res.redirect('/main')
})

app.get('/main', (req, res) => {
    console.log(req.isLogin)
    res.render('main.html', {username: req.user.username, isLogin: req.isLogin})
})

app.use('/profile', profile)
app.use('/profileUpdate', profileUpdate)
app.use('/board', board);
app.use('/login', login);
app.use('/subjects', subjects);


const japan = require('./japan');
app.use('/japan', japan);

app.get('/support', (req, res, next) => {
    res.send("<script>alert('후원계좌: 토스뱅크 1000-2781-2395 김찬울');location.href = document.referrer;</script>");
})

app.get('/application', (req, res, next) => {
    res.render('application.html', {username: req.user.username, isLogin: req.isLogin})
})


app.get('/slide', async (req, res, next) => {
    try {
        const slide = await Japan_info.findAll();
        res.json(slide);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

app.listen(8080, () => {
    console.log('http://localhost:8080')
})
