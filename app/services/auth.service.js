const db = require("../models");
const config = require("../config/auth.config");

const User = db.users;
const Client = db.clients;
const DeskEmployee = db.deskEmployees;
const Role = db.roles;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
    signin
}






//Signin for all types of users
async function signin(userParams) {
    return await User.findOne({
        where: {
            email: userParams.email
        }
    }).then(user => {
        if (!user) {
            return 404;
        }
        var passwordIsValid = bcrypt.compareSync(
            userParams.password,
            user.password
        );

        if (!passwordIsValid) {
            return 401;
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 //24 hours
        });

        var authority = "client";
        return user.getRoles().then(role => {
            authority = "ROLE_" + role[0].name.toUpperCase();

            var accessInfo = {
                id: user.id,
                email: user.email,
                role: authority,
                accessToken: token
            };

            return accessInfo;
        });

    })

}



