var authController = require('../passport_controllers/authcontroller.js');

module.exports = function(app) {

    app.get('/signUpView', authController.signUp);

}

module.exports = function(app) {

    app.get('/loginView', authController.login);

}


