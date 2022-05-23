const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const nunjucks = require('nunjucks');

dotenv.config();

const smtpServerURL = "smtp.gmail.com";
const authUser = process.env.NODEMAILER_USER;
const authPass = process.env.NODEMAILER_PASS;

const fromEmail = process.env.NODEMAILER_USER;

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

router.get(
    '/',
    (req, res, next) => {
        //     const data = req.data;
        //     const usermail = data.useremail;
        const code = crypto.randomBytes(3).toString('hex');
        //
        //     const sendEmail = (toEmail, title, txt) => { //패러미터 설명은 맨아래 코드 참고
        //         let transporter = nodemailer.createTransport({
        //             host: smtpServerURL,    //SMTP 서버 주소
        //             secure: true,           //보안 서버 사용 false로 적용시 port 옵션 추가 필요
        //             auth: {
        //                 user: authUser,     //메일서버 계정
        //                 pass: authPass      //메일서버 비번
        //             }
        //         });
        //
        //         let mailOptions = {
        //             from: fromEmail,        //보내는 사람 주소
        //             to: toEmail,           //받는 사람 주소
        //             subject: "이메일 인증",         //제목
        //             text: txt               //본문
        //         };
        //
        //         //전송 시작!
        //         transporter.sendMail(mailOptions, function (error, info) {
        //             if (error) {
        //                 //에러
        //                 console.log(error);
        //             }
        //             //전송 완료
        //             console.log("Finish sending email : ");
        //             transporter.close()
        //         })
        //     }
        res.render('email.html', {code});
    }
);

router.post(
    '/',
    async (req, res, next) => {
        console.log(req.body)
    });

module.exports = router;
