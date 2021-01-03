const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(role => {
            if (role[0].name === "admin") {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

const isDeskEmployee = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(role => {
            if (role[0].name === "deskEmployee") {
                next();
                return;
            }
            res.status(403).send({
                message: "Require DeskEmployee Role!"
            });
            return;
        });
    });
};

const isAdminOrDeskEmployee = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(role => {
            if (role[0].name === "admin" || role[0].name === "deskEmployee") {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Admin or DeskEmployee Role!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isDeskEmployee: isDeskEmployee,
    isAdminOrDeskEmployee: isAdminOrDeskEmployee
};

module.exports = authJwt;