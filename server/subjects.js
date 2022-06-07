const express = require('express')
const router  = express.Router();
const {
    Lesson, Apply_lesson, 
    Apply_study, Study, sequelize} = require('./models');

router.get('/', async(req, res) => {
    let result1;
    let result2;
    try{
        result1 = await Lesson.findAll({
            include:[{
                model: Apply_lesson,
                attributes:[[sequelize.fn('count','*'),'count']],
                group: ['Apply_lesson.lesson_id'],
                separate: true,
            }]
        });
    
        result2 = await Study.findAll({
            include:[{
                model: Apply_study,
                attributes:[[sequelize.fn('count','*'),'count']],
                group: ['Apply_study.study_id'],
                separate: true,
            }],
    
        })
        result2 = result2.map(el => el.get({plain:true}))
        result1 = result1.map(el => el.get({plain:true}))
    
        let results = {
            studys: result2,
            lessons: result1
        }
        //현재 신청한 학생수는 apply_lessons[0].count, apply_studies[0].count에 있음 신청학생이 없으면 언디파인뜰듯
        res.render('subjects.html', {results, username : req.user.username, isLogin :req.isLogin})
    }catch(err){}

})


module.exports = router;