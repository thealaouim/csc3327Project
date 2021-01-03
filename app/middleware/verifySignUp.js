const db = require("../models");

const User = db.users;

const checkDuplicateEmail = (req, res, next) => {
    //Username
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }

        next();
    });

}

const checkInfoExisted = (req, res, next) => {
    if (!(req.body.fullName && req.body.password && req.body.email)) {
        res.status(400).send({
            message: "Failed! Must fill all fields"
        });
        return;

    }
    next();
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkInfoExisted: checkInfoExisted
};
module.exports = verifySignUp;