const router = require('express').Router();
const { profileController } = require('../Controllers/profile.ctrl');

const authCheck = (req, res, next) => {
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHERE IS REQ ", req);
    if (!req.user) {
        console.log("Not Working:");
        console.log("redirect");
        res.redirect('/auth/login');
    } else {
        console.log("SUCCESSSSSS ");
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // res.render('profile', { user: req.user });
    res.send(req.user);
});


router.put("/",authCheck, profileController.updateUser);

module.exports = router;