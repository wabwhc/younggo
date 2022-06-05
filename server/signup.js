const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require ('dotenv');
const crypto = require('crypto');

const {User} = require('./models');

dotenv.config();

//노드메일러
router.get('/evf', async (req, res) => {
    const useremail = req.query.useremail;
    const sendEvfcode = crypto.randomBytes(3).toString('hex');
    console.log(useremail);

    console.log(sendEvfcode);

    const smtpServerURL = "smtp.gmail.com"
    const authUser = process.env.NODEMAILER_USER
    const authPass = process.env.NODEMAILER_PASS
    const fromEmail = 'younggo1701077@gmail.com'
    let toEmail = useremail;

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    function sendEmail(toEmail, title, txt) {
        let transporter = nodemailer.createTransport({
            host: smtpServerURL,    //SMTP 서버 주소
            secure: true,           //보안 서버 사용 false로 적용시 port 옵션 추가 필요
            auth: {
                user: authUser,     //메일서버 계정
                pass: authPass      //메일서버 비번
            }
        });

        let mailOptions = {
            from: fromEmail,        //보내는 사람 주소
            to: toEmail ,           //받는 사람 주소
            subject: title,         //제목
            text: txt               //본문
        };

        //전송 시작!
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                //에러
                console.log(error);
            }
            //전송 완료
            console.log("Finish sending email : ");
            transporter.close()
        })
    }
    res.json({sendEvfcode: sendEvfcode});
    sendEmail(toEmail, "YOUNGGO에서 보낸 인증메일입니다.", `인증 번호: ${sendEvfcode}`)
})



router.get('/', (req, res) => {
    if (req.user === undefined) {
        res.render('signup.html', {title: '회원가입'})
    } else {
        res.redirect('/main')
    }
})

let flag = false;
router.get('/emailCheck', async (req, res) => {
    let useremail = req.query.useremail;
    console.log(useremail);
    let result = await User.findAll({
        where: {
            useremail: useremail
        }
    })
    if (result.length !== 0) {
        flag = false;
    } else {
        flag = true;
    }
    res.json({
        login: flag, useremail
    })
})

router.post('/', async (req, res, next) => {
    const {useremail, username, password, password2, phonenum, usercomment} = req.body;
    let usercode = req.body.usercode;
    if (flag == false) {
        return res.send('이메일 중복');
    }
    if (password != password2) {
        return res.send('비밀번호 미일치');
    }
    try {
        if (flag == false) {
            return res.redirect('/join?error=exist');
        }
        if(usercode != process.env.USER_CODE){  // 만약 정해진 usercode가 아니면 ''으로 변경
            usercode = '';
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            useremail,
            username,
            password: hash,
            usercode,
            phonenum,
            usercomment,
        });
        return res.redirect('/login');
    } catch (err) {
        console.error(err)
        return next(err);
    }

});


module.exports = router;
