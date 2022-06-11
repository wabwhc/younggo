//모듈
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const pass = require('./passport');
const passport = require('passport');
const path = require('path');
const router = require('./api/router');
const nunjucks = require('nunjucks');

const cookieParser = require('cookie-parser');
const app = express();

const {
    Well, User, Article,
    Lesson, Apply_lesson,
    Apply_study, Study, sequelize, Japan_info
} = require('./models');

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

pass()
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
app.use('/post', postRouter);
app.get('/', (req, res) => {
    res.redirect('/main')
})

app.get('/main', (req, res) => {
    console.log(req.isLogin)
    res.render('main.html', {username: req.user.username, isLogin: req.isLogin})
})

app.get('/profile', async (req, res) => {
    if (req.user.username === '') {
        res.redirect('/login')
    } else {
        let result = await User.findAll({
            raw: true,
            where: {
                useremail: req.user.useremail,
                userimg: req.user.userimg,
            },
            attributes: ['useremail', 'username', 'usercomment', 'phonenum', 'usercode'
                // 'userimg'
            ]
        })
        if (req.user.userimg == 'default') {
            res.locals.userimg = '/img/default.png';
        } else {
            res.locals.userimg = req.user.userimg;
        }
        res.render('profile.html', {user: result[0], username: req.user.username, isLogin: req.isLogin});
    }
})

app.get('/application', (req, res, next) => {
    res.render('application.html', {username: req.user.username, isLogin: req.isLogin})
})

app.get('/board', async (req, res) => {
    let article = {};
    let result1 = await Article.findAll({
        raw: true,
        attributes: ['article_id', 'article_title', 'useremail', 'category']
    })
    article.qna = result1;
    let subject = ['레슨', '스터디', '계정']
    let result2 = []
    for (let i = 0; i < 3; i++) {
        result2[i] = await Well.findAll({
            raw: true,
            attributes: ['well_id', 'well_title', 'well_category'],
            where: {
                well_category: `${subject[i]}`
            }
        })
    }
    console.log(result2)
    article.wells = result2
    res.render('board.html', {article, username: req.user.username, isLogin: req.isLogin});
})

app.get('/board/:article_id/content',
    async (req, res, next) => {
        try {
            const content = await Article.findAll({
                where: {article_id: req.params.article_id},
            });
            res.json(content);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })

app.post('/board/createArticle', async (req, res, next) => {
    try {
        const {article_title, article_content, category} = req.body;
        await Article.create({
            article_title,
            article_content,
            useremail: req.user.useremail,
            category,
        });
        return res.redirect('/board');
    } catch (err) {
        console.error(err)
    }
})

app.post('/login',
    passport.authenticate('local',
        {
            successRedirect: '/main',
            failureRedirect: '/login',
            failureFlash: true
        }
    ))


app.get('/login', (req, res, next) => {
    if (req.user.username === '') {
        res.render('login.html', {message: req.flash("error")});
    } else {
        res.redirect('/main')
    }
})

const {isLoggedIn, isNotloggedIn} = require('./middlewares');
const {request} = require("express");
const bcrypt = require("bcrypt");

app.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

app.get('/subjects', async (req, res) => {

    let result1 = await Lesson.findAll({
        include: [{
            model: Apply_lesson,
            attributes: [[sequelize.fn('count', '*'), 'count']],
            group: ['Apply_lesson.lesson_id'],
            separate: true,
        }]
    });

    let result2 = await Study.findAll({
        include: [{
            model: Apply_study,
            attributes: [[sequelize.fn('count', '*'), 'count']],
            group: ['Apply_study.study_id'],
            separate: true,
        }],
    })

    result2 = result2.map(el => el.get({plain: true}))
    result1 = result1.map(el => el.get({plain: true}))

    let results = {
        studys: result2,
        lessons: result1
    }
    //현재 신청한 학생수는 apply_lessons[0].count, apply_studies[0].count에 있음 신청학생이 없으면 언디파인뜰듯
    res.render('subjects.html', {results, username: req.user.username, isLogin: req.isLogin})
})

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
