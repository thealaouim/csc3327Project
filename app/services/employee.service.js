const db = require("../models");
const User = db.users;
const Client = db.clients;
const DeskEmployee = db.deskEmployees;
const Role = db.roles;
const Session = db.sessions;
const Booking = db.bookings;
const Facility = db.facilities;

var bcrypt = require("bcryptjs");

module.exports = {
    clientSignup,
    clientUpdate,
    getEmployeeFacilities,
    createSession,
    deleteSession,
    getSessionClients
}

//Signup for a client account
async function clientSignup(userParams) {
    return User.create({
        email: userParams.email,
        password: bcrypt.hashSync(userParams.password, 8)
    }).then(user => {
        console.log('user:', user);
        return Client.create({
            userId: user.id,
            fullName: userParams.fullName,
            weekBookings: 0,
            status: 'ACTIVE'

        }).then(client => {
            return Role.findOne({
                where: {
                    name: 'client'
                }
            }).then(role => {
                console.log(role);
                return user.setRoles(role).then(() => {
                    return;
                });
            });
        });
    });
};



//update client information
async function clientUpdate(userParams) {

    const id = userParams.id;
    return await User.update({
        email: userParams.email,
        password: bcrypt.hashSync(userParams.password, 8)
    }, { where: { id: id } }).then(user => {
        return Client.update({
            fullName: userParams.fullName,
            weekBookings: userParams.weekBookings,
            status: userParams.status

        }, { where: { userId: id } }).then(() => {
            return;
        });

    });
}

async function getEmployeeFacilities(id) {
    return await DeskEmployee.findAll({ include: [{ model: Facility, as: "facilities" }, { model: User, as: "user" }] }, { where: { id: id } });
}

async function createSession(time, facilityId) {
    return await Session.create({ sessionDate: time, facilityId: facilityId, status: 'ACTIVE', currentBookings: 0 })
}

async function deleteSession(sessionId) {
    return await Session.update({ status: 'EXPIRED' }, { where: { id: sessionId } })
}

async function getSessionClients(sessionId) {
    return await Booking.findAll({ include: [{ model: Client, as: "client" }] }, { where: { sessionId: sessionId } });
}