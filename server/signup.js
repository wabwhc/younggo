const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {User} = require('./models');

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
    const {useremail, username, password, password2, usercode, phonenum, usercomment} = req.body;
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
