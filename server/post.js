const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {User} = require('./models')

const {isLoggedIn} = require('./middlewares');

const router = express.Router();

// uploads폴더 유무 확인
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// multer설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

// POST /post/img
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({
        url: `/img/${req.file.filename}`
    });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    try {
        if (req.body.url == '' && (req.user.userimg == 'default' || req.user.userimg == 'default.png')) {
            req.body.url = 'default.png';
        } else if (req.body.url == '' && req.user.userimg != 'default') {
            req.body.url = req.user.userimg;
        }
        const post = await User.update({
                userimg: req.body.url,
                phonenum: req.body.newPhonenum,
                usercomment: req.body.newUsercomment,
            },
            {
                where: {useremail: req.user.useremail}
            });

        req.user.userimg = req.body.url;
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;

