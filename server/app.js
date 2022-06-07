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
        req.user = {username: ''};
        req.isLogin = false;
        next();
    } else {
        req.isLogin = true;
        next();
    }
})

//라우터
const profile = require('./profile');
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
app.use('/board', board);
app.use('/login', login);
app.use('/subjects',subjects);
const {isLoggedIn, isNotloggedIn} = require('./middlewares');

// 현지학기제
app.get('/japan', isLoggedIn, async (req, res) => {
    try {
        res.render('japan.html', {title: "현지학기제", useremail: req.user.useremail, isLogin: req.isLogin});
    } catch (err) {
        console.error(err)
    }
})

app.get('/japan/youtube', async (req, res, next) => {
    try {
        const youtube = await Japan_info.findAll({});
        res.json(youtube);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

app.post('/japan/insert', async (req, res, next) => {
    try {
        let {url, content, uploader} = req.body;
        console.log(req.body);
        if (!url) {
            return res.send("<script>alert('영상 주소를 입력해주세요'); window.location.replace('/japan');</script>");
        }
        if (!content) {
            return res.send("<script>alert('영상 설명을 입력해주세요'); window.location.replace('/japan');</script>");
        }
        const urlCheck = await Japan_info.findOne({
            where: {url: url},
        });
        console.log(urlCheck)
        if (urlCheck != null) {
            return res.send("<script>alert('이미 존재하는 영상입니다.'); window.location.replace('/japan');</script>");
        }
        console.log(url);
        const newUrl = url.split('=');
        url = "https://www.youtube.com/embed/" + newUrl[1];
        await Japan_info.create({
            url,
            content,
            uploader
        });
        console.log(url);
        return res.redirect('/japan');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

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
