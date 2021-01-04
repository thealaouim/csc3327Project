const db = require("../models");
const User = db.users;
const DeskEmployee = db.deskEmployees;
const Role = db.roles;
const Facility = db.facilities;
const Client = db.clients;

module.exports = {
    deskEmployeeSignup,
    adminSignup,
    deskEmployeeUpdate,
    addFacility,
    updateFacility,
    assignFacility,
    getFacilities,
    getEmployees,
    getClients
}

var bcrypt = require("bcryptjs");

//Signup for deskEmployee
async function deskEmployeeSignup(userParams) {
    return User.create({
        email: userParams.email,
        password: bcrypt.hashSync(userParams.password, 8)
    }).then(user => {
        console.log('user:', user);
        return DeskEmployee.create({
            userId: user.id,
            fullName: userParams.fullName,

        }).then(client => {
            return Role.findOne({
                where: {
                    name: 'deskEmployee'
                }
            }).then(role => {
                console.log(role);
                return user.setRoles(role).then(() => {
                    return;
                });
            });
        });


    })
}

//Signup for admin
async function adminSignup(userParams) {
    return User.create({
        email: userParams.email,
        password: bcrypt.hashSync(userParams.password, 8)
    }).then(user => {
        return Role.findOne({
            where: {
                name: 'admin'
            }
        }).then(role => {
            console.log(role);
            return user.setRoles(role).then(() => {
                return;
            });
        });

    })
}

async function deskEmployeeUpdate(userParams) {
    const id = userParams.id;
    return await User.update({
        email: userParams.email,
        password: bcrypt.hashSync(userParams.password, 8)
    }, { where: { id: id } }).then(user => {
        return DeskEmployee.update({
            fullName: userParams.fullName

        }, { where: { userId: id } }).then(() => {
            return;
        });


    })
}


async function addFacility(facilityParams) {
    return await Facility.create(facilityParams).then(facility => {
        return facility;
    })
}

async function updateFacility(facilityParams, id) {
    return await Facility.update({ name: facilityParams.name, maxCapacity: facilityParams.maxCapacity }, { where: { id: id } }).then(facility => {
        return facility;
    })
}

async function assignFacility(facilityId, employeeId) {
    return await DeskEmployee.findOne({ where: { userId: employeeId } }).then((employee) => {
        if (!employee) { return 4041; }
        return Facility.findByPk(facilityId).then((facility) => {
            if (!facility) { return 4042 }
            return employee.setFacilities(facility);
        })
    })
}

async function getEmployees() {
    return await DeskEmployee.findAll({ include: [{ model: Facility, as: "facilities" }, { model: User, as: "user" }] });
}

async function getClients() {
    return await Client.findAll({ include: [User] });
}