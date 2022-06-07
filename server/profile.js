const express = require('express')
const router  = express.Router();
const {User} = require('./models');
router.get('/', async(req, res) => {
    if(req.user.username === ''){
        res.redirect('/login')
    }else{
        try{
            let result = await User.findAll({
                raw: true,
                where:{
                    useremail: req.user.useremail
                },
                attributes: ['useremail', 'username', 'usercomment', 'phonenum', 'usercode']
            })
            res.render('profile.html', {user : result[0], isLogin :req.isLogin});
        }catch(err){

        }
        
    }
})

module.exports = router;