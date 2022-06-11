const express = require('express')
const router = express.Router();
const {User} = require('./models');

router.get('/', async (req, res, next) => {
    if (req.user.username === '') {
        res.redirect('/login')
    } else {
        try {
            let result = await User.findAll({
                raw: true,
                where: {
                    useremail: req.user.useremail
                },
                attributes: ['useremail', 'username', 'usercomment', 'phonenum', 'usercode', 'userimg']
            })
            if (req.user.userimg == 'default.png') {
                result[0].userimg = '/img/default.png';
            } else {
                result[0].userimg = req.user.userimg;
            }
            res.render('profileUpdate.html', {user: result[0], username: req.user.username, isLogin: req.isLogin});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
})

module.exports = router;
