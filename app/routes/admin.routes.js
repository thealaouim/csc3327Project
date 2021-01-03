const { verifySignUp } = require("../middleware");
const controller = require("../controllers/admin.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/facility", [authJwt.verifyToken, authJwt.isAdmin], controller.createFacility);

    app.put("/api/facility/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateFacility);

    app.get("/api/facility", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllFacilities);

    app.post(
        "/api/deskEmployee",
        [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkInfoExisted, verifySignUp.checkDuplicateEmail],
        controller.signupDeskEmployee
    );

    app.put(
        "/api/deskEmployee/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateDeskEmployee
    );

    app.get("/api/deskEmployee", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllEmployees);

    app.post("/api/assignFacility", [authJwt.verifyToken, authJwt.isAdmin], controller.assignFacility);

    app.get("/api/client", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllClients)

    app.post(
        "/api/admin",
        [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkInfoExisted, verifySignUp.checkDuplicateEmail],
        controller.signupAdmin
    );


}