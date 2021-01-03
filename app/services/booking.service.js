const db = require("../models");
const Facility = db.facilities;
const Session = db.sessions;
const Client = db.clients;
const Booking = db.bookings;

module.exports = {
    getFacilities,
    getFacilitySessions,
    bookSession,
    cancelBooking
}

async function getFacilities() {
    return await Facility.findAll();
}

async function getFacilitySessions(facilityId) {
    return await Session.findAll({ where: { facilityId: facilityId, status: 'ACTIVE' } })
}

async function bookSession(bookingInfo) {
    return await Session.findOne({ where: { id: bookingInfo.sessionId } }).then(sessionInfo => {
        return Facility.findOne({ where: { id: sessionInfo.facilityId } }).then(facilityInfo => {
            if (facilityInfo.maxCapacity <= sessionInfo.currentBookings) {
                return -1;
            }
            return Client.findOne({ where: { userId: bookingInfo.clientId } }).then(client => {
                if (client.weekBookings >= 3) {
                    return -2;
                }
                return Booking.create(bookingInfo).then(() => {
                    return Client.update({ weekBookings: client.weekBookings + 1 }, { where: { userId: bookingInfo.clientId } })
                        .then(() => {
                            //update session available places
                            return Session.update({ currentBookings: sessionInfo.currentBookings + 1 }, {
                                where: {
                                    id: sessionInfo.id
                                }
                            });
                        })
                });

            });

        });
    })
}

async function cancelBooking(id) {
    return await Booking.findAll({ where: { id: id } }).then(booking => {
        return Booking.update({ status: "CANCELED" }, { where: { id: id } }).then(() => {
            console.log("booking: ", booking, booking.sessionId);
            return Session.increment('currentBookings', { by: -1, where: { id: booking[0].sessionId } }).then(session => {
                console.log("Session: ", session);
                return Client.increment('weekBookings', { by: -1, where: { userId: booking[0].clientId } })
            })
        })

    })

}
