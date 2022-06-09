const pass = require('../passport');
const express = require('express');
const passport = require('passport')
const router  = express.Router();
const {Article, Reply} = require('../models');
const sequelize = require('sequelize');

//게시판
router.post('/board', async (req, res) => {
    const {article_title, article_content} = req.body;
    console.log(req.body);
    try {
        const newArticle = await Article.create({
                article_title,
                article_content,
                useremail: req.user.useremail,
                category: '카테고리',
            },
            {
                where: {useremail: req.user.useremail}
            });

        const newReply = await Reply.create({
            article_id: newArticle.article_id
        });
        return res.redirect('/board');
    } catch (err) {
        console.error(err)
        return res.redirect('/board');
    }
})

// axios.get(`api/board/click?qna_page=${qna_page}`)

router.get('/board/click', async (req, res, next) => {
    const qna_page = req.query.qna_page;
    try{
        let apiResult = await Article.findAll({
            raw:true,
            attributes:['article_id','article_title', 'useremail', 'category', 'article_content',
                [sequelize.fn('date_format', sequelize.col('article_at'), '%Y-%m-%d %H:%i:%s'), 'article_at']],
            order: [['article_id', 'DESC']],
            limit: 10,
            offset: (qna_page-1) * 10
        })
        res.json({
            apiResult
        })
    }catch(err){
        console.error(err);
    }
})

module.exports = router;
