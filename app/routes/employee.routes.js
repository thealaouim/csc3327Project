const { verifySignUp } = require("../middleware");
const controller = require("../controllers/employee.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/client",
        [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee, verifySignUp.checkInfoExisted, verifySignUp.checkDuplicateEmail],
        controller.signupClient
    );



    app.put(
        "/api/client/:id",
        [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee, verifySignUp.checkInfoExisted],
        controller.updateClient
    );

    app.get(
        "/api/employeeFacility/:id", [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee], controller.getEmployeeFacilities
    );

    app.post(
        "/api/session", [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee], controller.createSession
    );

    app.delete(
        "/api/session/:id", [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee], controller.deleteSession
    );

    app.get(
        "/api/sessionClients/:id", [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee], controller.getSessionClients
    );

}