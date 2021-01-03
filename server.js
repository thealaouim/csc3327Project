const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests 
app.use(bodyParser.urlencoded({ extended: true }));


//using the database with sequelize (should be updated after developement)
const db = require("./app/models");
const Role = db.roles;

//to put in sync { force: true }
db.sequelize.sync().then(() => {
    //console.log("Drop and re-sync db.");
    //initial();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to gym booking application." });
});

//including the routes of the controllers in the app
require("./app/routes/auth.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/employee.routes")(app);
require("./app/routes/booking.routes")(app);

require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "client",
    });

    Role.create({
        id: 2,
        name: "deskEmployee",
    });

    Role.create({
        id: 3,
        name: "admin",
    });
}
