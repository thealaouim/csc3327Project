const controller = require("../controllers/booking.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/facilities", [authJwt.verifyToken], controller.getFacilities);

    app.get("/api/facilitySessions/:id", [authJwt.verifyToken], controller.getFacilitySessions);

    app.post("/api/booking", [authJwt.verifyToken], controller.bookSession);

    app.delete("/api/booking/:id", [authJwt.verifyToken], controller.cancelSession);

}