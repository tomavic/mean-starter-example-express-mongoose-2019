// api-routes.js
// Initialize express router
const router = require('express').Router();
const userController = require('../controllers/users.controller');


// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Request routes
router.route('/user')
    .get(userController.list)
    .post(userController.signup);
router.route('/user/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);


// Export API routes
module.exports = router;