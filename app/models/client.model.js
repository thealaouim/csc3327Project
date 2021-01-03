
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        fullName: {
            type: Sequelize.STRING
        },
        weekBookings: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM('ACTIVE', 'SUSPENDED')
        }
    });

    return Client;
}