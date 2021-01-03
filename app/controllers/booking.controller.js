const db = require("../models");
const Sequelize = require("sequelize");
const Facility = db.facilities;
const Session = db.sessions;
const Booking = db.bookings;
const Client = db.clients;

const Services = require("../services/booking.service");

//get all facilities
exports.getFacilities = (req, res) => {

    Services.getFacilities().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving facilities."
        });
    });
}

//get sessions by facility
exports.getFacilitySessions = (req, res) => {
    const facilityId = req.params.id;

    Services.getFacilitySessions(facilityId).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving sessions."
        });
    });

}

//book session
exports.bookSession = (req, res) => {
    const bookingInfo = { clientId: req.body.clientId, sessionId: req.body.sessionId, status: 'ACTIVE' };
    Services.bookSession(bookingInfo).then(data => {
        switch (data) {
            case -1:
                res.send({ message: "This session is fully booked" });
            case -2:
                res.send({ message: "You have reached your maximum week bookings" });
            default:
                res.status(200).send({ message: "Booking has been created successfully" });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while processing the booking"
        });
    });

};

//cancel session
exports.cancelSession = (req, res) => {
    const id = req.params.id;
    Services.cancelBooking(id).then(() => {
        res.status(200).send({ message: "booking has been canceled" });
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occured while canceling booking" })
    })

}
