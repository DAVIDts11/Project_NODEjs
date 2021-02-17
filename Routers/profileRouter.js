const router = require('express').Router();
const { profileController } = require('../Controllers/profile.ctrl');


const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // res.render('profile', { user: req.user });
    res.send(req.user);
});


router.put("/", authCheck, profileController.updateUser);

router.put("/setPremium", authCheck, profileController.setPremium);



module.exports = router;