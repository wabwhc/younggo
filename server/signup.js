const express = require('express');
const router = express.Router();
const conn = require('./mysqlconn');

router.get('/', (req, res) => {
    if (req.user === undefined) {
        res.render('signup.html', {title: '회원가입'})
    } else {
        res.redirect('/main')
    }
})
let flag = false;

router.get('/emailCheck', (req, res) => {
    let useremail = req.query.useremail;
    console.log(useremail);
    let sql = 'select * from users where useremail = ?';
    conn.query(sql, [useremail], (err, result, fields) => {
        if (result.length !== 0) {
            flag = false;
        } else {
            flag = true;
        }
        res.json({
            login: flag,
            useremail
        })
    })
})

router.post('/', (req, res) => {
    let useremail = req.body.useremail;
    let username = req.body.username;
    let password = req.body.password;
    let usercode = req.body.usercode;
    let phonenum = req.body.phonenum;
    let usercomment = req.body.usercomment;
    if (usercode !== process.env.usercode && usercode !== '') {
        res.send('유저코드이상')
    } else {
        if (flag != true) {
            res.send('계정 중복 확인을 해주세요.')
        } else {
            let sql2 = 'insert into users (useremail, password, username, usercode, phonenum, usercomment) values (?, ?, ?, ?, ?, ?)';
            conn.query(sql2, [useremail, password, username, usercode, phonenum, usercomment], (err, result, field) => {
                res.redirect('/login')
            })
        }
    }
});


module.exports = router;
