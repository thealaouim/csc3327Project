
module.exports = (sequelize, Sequelize) => {
    const DeskEmployee = sequelize.define("deskEmployee", {
        fullName: {
            type: Sequelize.STRING
        }

    });

    return DeskEmployee;
}