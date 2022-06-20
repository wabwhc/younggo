const express = require('express')
const router  = express.Router();

const {Well, User, Article} = require('./models');
router.get('/', async(req, res) => {
    let article = {};
    let result1;
    let subject = ['레슨', '스터디', '계정']
    let result2 = []

    let isZoo = true
    result1 = await Article.count();
    article.qna = result1;

    let istrue = await User.findOne({
        attributes: ['usercode'],
        where: {
            useremail : req.user.useremail
        }
    })
    if(istrue === null || istrue.usercode === '0') {
        isZoo = false;
    }

    for(let i = 0; i < 3; i++){
        try{

            result2[i] = await Well.findAll({
                raw:true,
                attributes:['well_id', 'well_title', 'well_category', 'well_reply'],
                where: {
                    well_category : `${subject[i]}`
                }
            })

        }catch(err){}
    }
    article.wells = result2
    res.render('board.html', {article, username : req.user.username, isLogin :req.isLogin, isZoo});
});
module.exports = router;
