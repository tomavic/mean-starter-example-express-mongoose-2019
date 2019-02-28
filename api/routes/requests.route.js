// api-routes.js
// Initialize express router
const router = require('express').Router();
const requestController = require('../controllers/requests.controller');


// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Request routes
router.route('/requests')
    .get(requestController.index)
    .post(requestController.new);
router.route('/requests/:request_id')
    .get(requestController.view)
    .patch(requestController.update)
    .put(requestController.update)
    .delete(requestController.delete);


// Export API routes
module.exports = router;