const pass = require('../passport');
const express = require('express');
const passport = require('passport')
const router  = express.Router();
const {Article} = require('../models');

//게시판
router.post('/board', async (req, res) => {
    const {article_title, article_content} = req.body;
    console.log(req.body);
        try {
            await Article.create({
                article_title,
                article_content,
                useremail: req.user.useremail,
                category: '카테고리',
            },
            {
            where: {useremail: req.user.useremail}
        });
            return res.redirect('/board');
        } catch (err) {
            console.error(err)
            return res.redirect('/board');
    }
})

module.exports = router;