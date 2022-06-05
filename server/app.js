//모듈
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const pass = require('./passport');
const passport = require('passport')
const path = require('path')
const router = require('./api/router')
const nunjucks = require('nunjucks');

const {Well, User, Article, 
    Lesson, Apply_lesson, 
    Apply_study, Study, sequelize} = require('./models');

sequelize.sync({ force: false })  // 서버 실행시마다 테이블을 재생성할건지에 대한 여부 
.then(() => { console.log('데이터베이스 연결 성공'); }) 
.catch((err) => { console.error(err); }); 

//회원가입부분 라우터로 처리 길어질듯 해서
const signupR = require('./signup');
//const e = require('connect-flash');
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
app.use((req, res, next) => {
    if(req.user === undefined){
        req.user = {username:''};
        req.isLogin = false;
        next();
    }else{
        req.isLogin = true;
        next();
    }
})

app.get('/', (req, res) => {
    res.redirect('/main')
})

app.get('/main', (req, res) => {
    console.log(req.isLogin)
    res.render('main.html', {username : req.user.username, isLogin:req.isLogin})
})
app.get('/test',(req, res) => {console.log(1);res.send('hello')})
app.get('/profile', async(req, res) => {
    if(req.user.username === ''){
        res.redirect('/login')
    }else{
        let result = await User.findAll({
            raw: true,
            where:{
                useremail: req.user.useremail
            },
            attributes: ['useremail', 'username', 'usercomment', 'phonenum', 'usercode']
        })
        res.render('profile.html', {user : result[0], isLogin :req.isLogin});
    }
})

app.get('/board', async(req, res) => {
    let article = {};
    let result1;
    let subject = ['레슨', '스터디', '계정']
    let result2 = []
    if(req.user.useremail === undefined){
        req.user.useremail = 'apply1@naver.com'
    }
    let isZoo = true;
    result1 = await Article.count(); // 글 개수
    article.qna = result1;
    let istrue = await User.findOne({
        attributes: ['usercode'],
        where: {
            useremail : req.user.useremail
        }
    })

    if(istrue === null){
        console.log(132)
        isZoo = false;
    }
    console.log(isZoo)
    for(let i = 0; i < 3; i++){
        try{
           
            result2[i] = await Well.findAll({
                raw:true,
                attributes:['well_id', 'well_title', 'well_category', 'well_reply'], // well_reply 추가
                where: {
                    well_category : `${subject[i]}`
                }
            })
            
        }catch(err){}
    }
    article.wells = result2
    res.render('board.html', {article, username : req.user.username, isLogin :req.isLogin, isZoo});
});

/* app.get('/board', async(req, res) => {
    let article = {};
    let result1 = await Article.findAll({
        raw:true,
        attributes:['article_id','article_title', 'useremail', 'category'] // 카테고리 삭제 질문 답 추가 요망
    })
    article.qna = result1;
    let subject = ['레슨', '스터디', '계정']
    let result2 = []
    for(let i = 0; i < 3; i++){
        result2[i] = await Well.findAll({
            raw:true,
            attributes:['well_id', 'well_title', 'well_category', 'well_reply'], // reply 추가
            where: {
                well_category : `${subject[i]}`
            }
        })
    }
    console.log(result2)
    article.wells = result2
    res.render('board.html', {article, username : req.user.username, isLogin :req.isLogin});
}); */

/* 추가 */
/* app.get('/board/:article_id/content',
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
});

app.post('/board/createArticle', async (req, res, next) => {
    try {
        const {article_title, article_content, category } = req.body;
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
}); */
/* end */

app.post('/login', passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/login', (req, res) => {
    if(req.user.username === ''){
        res.render('login.html',{ message : req.flash("error")});
    }else{
        res.redirect('/main')
    }
})

const {isLoggedIn, isNotloggedIn} = require('./middlewares');

app.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/main');
});

app.get('/subjects', async(req, res) => {

    let result1 = await Lesson.findAll({
        include:[{
            model: Apply_lesson,
            attributes:[[sequelize.fn('count','*'),'count']],
            group: ['Apply_lesson.lesson_id'],
            separate: true,
        }]
    });

    let result2 = await Study.findAll({
        include:[{
            model: Apply_study,
            attributes:[[sequelize.fn('count','*'),'count']],
            group: ['Apply_study.study_id'],
            separate: true,
        }],

    })
    
    result2 = result2.map(el => el.get({plain:true}))
    result1 = result1.map(el => el.get({plain:true}))

    let results = {
        studys: result2,
        lessons: result1
    }
    //현재 신청한 학생수는 apply_lessons[0].count, apply_studies[0].count에 있음 신청학생이 없으면 언디파인뜰듯
    res.render('subjects.html', {results, username : req.user.username, isLogin :req.isLogin})
})

app.listen(8080, () => {
    console.log('8080 conn')
})
