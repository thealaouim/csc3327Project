
module.exports = (sequelize, Sequelize) => {
    const Facility = sequelize.define("facility", {
        name: {
            type: Sequelize.STRING
        },
        maxCapacity: {
            type: Sequelize.STRING
        }
    });

    return Facility;
}