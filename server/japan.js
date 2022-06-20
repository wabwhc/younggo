const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotloggedIn} = require('./middlewares');
const {Japan_info} = require('./models');

router.get('/', isLoggedIn, async (req, res) => {
    try {
        res.render('japan.html', {
            title: "현지학기제",
            useremail: req.user.useremail,
            username: req.user.username,
            isLogin: req.isLogin
        });
    } catch (err) {
        console.error(err)
    }
})

router.get('/youtube', async (req, res, next) => {
    try {
        const youtube = await Japan_info.findAll({});
        res.json(youtube);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.post('/insert', async (req, res, next) => {
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


module.exports = router;
