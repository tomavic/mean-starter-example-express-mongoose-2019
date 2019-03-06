// api-routes.js
// Initialize express router
const router = require('express').Router();
const requestController = require('../controllers/requests.controller');



// Request routes
router.route('/')
    .get(requestController.index)
    .post(requestController.new);
router.route('/:request_id')
    .get(requestController.view)
    .patch(requestController.update)
    .put(requestController.update)
    .delete(requestController.delete);


// Export API routes
module.exports = router;