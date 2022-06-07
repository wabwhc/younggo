//모듈
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
//라우터
const profile = require('./profile');
const board = require('./board');
const login = require('./login');
const subjects = require('./subjects');

//const pass = require('./passport');
const passport = require('passport')
//pass()
const path = require('path')
const router = require('./api/router')
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');

try{
    sequelize.sync({ force: false })  // 서버 실행시마다 테이블을 재생성할건지에 대한 여부 
    .then(() => { console.log('데이터베이스 연결 성공'); }) 
    .catch((err) => { console.error(err); }); 
}catch(err){}

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


app.use(flash())

app.use('/public', express.static(path.join(__dirname, '../views/public')))

//로그인상태 미들웨어
//어떤 url이든 로그인 여부 확인후 로그인 되면 req.username에 유저이름
app.use((req, res, next) => {
    if(req.user === undefined){
        req.user = {username:'', useremail:''};
        req.isLogin = false;
        next();
    }else{
        req.isLogin = true;
        next();
    }
})

app.use('/profile', profile)
app.use('/board', board);
app.use('/login', login);
app.use('/subjects',subjects);

app.get('/', (req, res) => {
    res.redirect('/main')
})

app.get('/main', (req, res) => {
    console.log(req.isLogin)
    res.render('main.html', {username : req.user.username, isLogin:req.isLogin})
})

app.listen(8080, () => {
    console.log('8080 conn')
})
