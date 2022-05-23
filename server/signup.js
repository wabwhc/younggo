const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')

dotenv.config();
//const conn = require('./mysqlconn');
const {User} = require('./models');
router.get('/', (req, res) => {
    if (req.user === undefined) {
        res.render('signup.html', {title: '회원가입'})
    } else {
        res.redirect('/main')
    }
})
let flag = false;

router.get('/emailCheck', async(req, res) => {
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
        login: flag,
        useremail
    })
    //let sql = 'select * from users where useremail = ?';
    //conn.query(sql, [useremail], (err, result, fields) => {
    //    if (result.length !== 0) {
    //        flag = false;
    //    } else {
    //        flag = true;
    //    }
    //    res.json({
    //        login: flag,
    //        useremail
    //    })
    //})
})

router.post('/', async(req, res) => {
    let useremail = req.body.useremail;
    let username = req.body.username;
    let password = req.body.password;
    let usercode = req.body.usercode;
    let phonenum = req.body.phonenum;
    let usercomment = req.body.usercomment;
    if (usercode !== process.env.usercode && usercode !== '') {
        res.send('유저코드이상');
    } else {
        let result = await User.findAll({
            where: {
                useremail: useremail
            }
        })
        if (result.length !== 0) {
            res.send('이미 존재하는 계정')
        } else {
            //let sql2 = 'insert into users (useremail, password, username, usercode, phonenum, usercomment) values (?, ?, ?, ?, ?, ?)';
            //conn.query(sql2, [useremail, password, username, usercode, phonenum, usercomment], (err, result, field) => {
            //    res.redirect('/login')
            //})
            User.create({
                useremail: useremail,
                password : password,
                username: username,
                usercode:usercode,
                phonenum: phonenum,
                usercomment: usercomment
                }
            ).then(
                () => {
                    res.redirect('/login')
                }
            )
        }

        //let sql = 'select * from users where useremail = ?';
        //conn.query(sql, [useremail], (err, result, fields) => {
        //    if (result.length !== 0) {
        //        res.send('이미 존재하는 계정')
        //    } else {
        //        let sql2 = 'insert into users (useremail, password, username, usercode, phonenum, usercomment) values (?, ?, ?, ?, ?, ?)';
        //        conn.query(sql2, [useremail, password, username, usercode, phonenum, usercomment], (err, result, field) => {
        //            res.redirect('/login')
        //        })
        //    }
//
        //})
    }
});


module.exports = router;
