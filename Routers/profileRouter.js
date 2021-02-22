const router = require('express').Router();
const { profileController } = require('../Controllers/profile.ctrl');

const authCheck = (req, res, next) => {
    if (!req.user) {
        console.log("... no user ...");
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.send(req.user);
});

router.put("/", authCheck, profileController.updateUser);
router.put("/setPremium", authCheck, profileController.setPremium);

module.exports = router;