const router = require('express').Router();
const {profileController}= require('../Controllers/profile.ctrl');
const Cryptr = require("cryptr");
const consts = require('../constants');

const cryptr = new Cryptr(consts.GOOGLE_AUTH.crypto);

const authCheck = (req, res, next) => {
    if(!req.user){
        console.log("redirect");
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // res.render('profile', { user: req.user });
    const en = cryptr.encrypt("david meleh israel hai ve kayam");
    console.log("en = ", en);
    const dec = cryptr.decrypt(en);
    console.log("dec = ", dec);
    res.send(req.user);
});


router.put("/",authCheck,profileController.updateUser);

module.exports = router;