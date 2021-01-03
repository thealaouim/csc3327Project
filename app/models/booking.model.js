
module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        status: {
            type: Sequelize.ENUM('ACTIVE', 'CANCELED')
        }
    });

    return Booking;
}