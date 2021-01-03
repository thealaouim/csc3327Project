const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.clients = require("./client.model.js")(sequelize, Sequelize);
db.deskEmployees = require("./deskEmployee.model.js")(sequelize, Sequelize);
db.facilities = require("./facility.model.js")(sequelize, Sequelize);
db.sessions = require("./session.model.js")(sequelize, Sequelize);
db.bookings = require("./booking.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);

//relationship between clients and bookings (1 to many)
db.clients.hasMany(db.bookings, { as: "bookings" });
db.bookings.belongsTo(db.clients, {
    foreignKey: "clientId",
    as: "client",
});

//relationship between bookings and facility availability (many to 1)
db.sessions.hasMany(db.bookings, { as: "bookings" });
db.bookings.belongsTo(db.sessions, {
    foreignKey: "facilityAvailabilityId",
    as: "facilityAvailability",
});

//relationship between facility and sessions(1 to many)
db.facilities.hasMany(db.sessions, { as: "sessions" });
db.sessions.belongsTo(db.facilities, {
    foreignKey: "facilityId",
    as: "facility",
});

//relationship between facility and desk employee (many to many)
db.deskEmployees.belongsToMany(db.facilities, {
    through: "facilityAssignments",
    as: "facilities",
    foreignKey: "deskEmployeeId",
});
db.facilities.belongsToMany(db.deskEmployees, {
    through: "facilityAssignments",
    as: "deskEmployees",
    foreignKey: "facilityId",
});

//relationship between user and client
db.clients.belongsTo(db.users, {
    foreignKey: "userId"
});

//relationship between user and deskEmployee
db.deskEmployees.belongsTo(db.users, {
    foreignKey: "userId"
});

//relationship between users and roles
db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["client", "deskEmployee", "admin"];


module.exports = db;
