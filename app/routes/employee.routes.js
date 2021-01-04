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
        "/api/clients",
        [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee, verifySignUp.checkInfoExisted, verifySignUp.checkDuplicateEmail],
        controller.signupClient
    );



    app.put(
        "/api/clients/:id",
        [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee, verifySignUp.checkInfoExisted],
        controller.updateClient
    );

    app.get(
        "/api/employees/:id/facilities", [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee], controller.getEmployeeFacilities
    );

    app.post(
        "/api/sessions", [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee], controller.createSession
    );

    app.delete(
        "/api/sessions/:id", [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee], controller.deleteSession
    );

    app.get(
        "/api/sessions/:id/clients", [authJwt.verifyToken, authJwt.isAdminOrDeskEmployee], controller.getSessionClients
    );

}