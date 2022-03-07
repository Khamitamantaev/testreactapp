module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      }
    });
    return Contact;
  };