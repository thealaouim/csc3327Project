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

    app.post("/api/facilities", [authJwt.verifyToken, authJwt.isAdmin], controller.createFacility);

    app.put("/api/facilities/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateFacility);

    app.post(
        "/api/deskEmployees",
        [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkInfoExisted, verifySignUp.checkDuplicateEmail],
        controller.signupDeskEmployee
    );

    app.put(
        "/api/deskEmployees/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateDeskEmployee
    );

    app.get("/api/deskEmployees", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllEmployees);

    app.post("/api/facilityAssignments", [authJwt.verifyToken, authJwt.isAdmin], controller.assignFacility);

    app.get("/api/clients", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllClients)

    app.post(
        "/api/admins",
        [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkInfoExisted, verifySignUp.checkDuplicateEmail],
        controller.signupAdmin
    );


}