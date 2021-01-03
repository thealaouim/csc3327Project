
module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        sessionDate: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('ACTIVE', 'EXPIRED')
        },
        currentBookings: {
            type: Sequelize.INTEGER
        }
    });

    return Session;
}