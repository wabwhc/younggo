const pass = require('../passport');
const express = require('express');
const passport = require('passport')
const router  = express.Router();
const {Article, Reply, User} = require('../models');
const sequelize = require('sequelize');


//게시판
router.post('/board', async (req, res) => {
    const {article_title, article_content, article_category} = req.body;
    try {
        const newArticle = await Article.create({
                article_title,
                article_content,
                useremail: req.user.useremail,
                category: article_category,
            },
            {
                where: {useremail: req.user.useremail}
            });
        await Reply.create({
            reply_content: '답변을 기다리는 중입니다.',
            article_id: newArticle.article_id,
            useremail: 'default'
        });
        return res.redirect('/board');
    } catch (err) {
        console.error(err)
        return res.redirect('/board');
    }
})

//게시물 답변
router.post('/board/ans', async (req, res) => {
    const {reply_content} = req.body;
    const {article_id} = req.body;
    try {
        const result = await Reply.update({
                reply_content,
                reply_at: sequelize.literal('CURRENT_TIMESTAMP'),
                useremail: req.user.useremail
            },
            {
                where: {article_id: article_id}
            });
        return res.redirect('/board');
    } catch (err) {
        console.error(err)
        return res.redirect('/board');
    }
});


// axios.get(`api/board/click?qna_page=${qna_page}`)
// let 원하시는변수 = await axios.get(`api/board/click?qna_page=${qna_page}`)
// 원하시는변수2 = 원하시는변수.data.apiResult;
router.get('/board/click', async (req, res, next) => {
    const qna_page = req.query.qna_page;
    try{
        let apiResult = await Article.findAll({
            raw:true,
            attributes:['article_id','article_title', 'useremail', 'category', 'article_content',
                [sequelize.fn('date_format', sequelize.col('article_at'), '%Y-%m-%d'), 'article_at']],
            order: [['article_id', 'DESC']],
            limit: 10,
            offset: (qna_page-1) * 10
        })
        let apiResult2 = await Reply.findAll({
            raw:true,
            attributes:['reply_id','useremail', 'article_id', 'reply_content', 'reply_at',
                [sequelize.fn('date_format', sequelize.col('reply_at'), '%Y-%m-%d'), 'reply_at']],
            order: [['article_id', 'DESC']],
            limit: 10,
            offset: (qna_page-1) * 10
        })
        let array = new Array();
        let nameArray = new Array();
        for(let i = 0; i < apiResult2.length; i++){
            if (apiResult2[i].useremail == null)
                array[i] = "Default";
            else
                array[i] = apiResult2[i].useremail;
        }
        for(let i = 0; i < array.length; i++){
            let apiResult3 = await User.findOne({
                raw:true,
                attributes:['username'],
                where: {useremail: array[i]},
            })
            nameArray[i] = apiResult3;
        }
        res.json({
            apiResult, apiResult2, nameArray
        })
    }catch(err){
        console.error(err);
    }
})

module.exports = router;
