const db = require("../models");


//importing services
const Services = require("../services/auth.service");




exports.signin = (req, res) => {
    Services.signin(req.body).then(accessInfo => {
        switch (accessInfo) {
            case 404:
                res.status(404).send({ message: "User Not Found." });
                break;
            case 401:
                res.status(401).send({ accessToken: null, message: "Invalid Password!" });
                break;
            default:
                res.status(200).send(accessInfo);
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};






