// api-routes.js
// Initialize express router
const router = require('express').Router();
const requestController = require('../controllers/requests.controller');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


// Request routes
router.get('/', auth, requestController.index);
router.post('/', auth, requestController.new);
router.get('/:request_id', auth, requestController.view);
router.put('/:request_id', auth, requestController.update);
router.put('/cancel/:request_id', auth, requestController.cancel);
router.delete('/:request_id', auth, requestController.delete);

/**********************
 *      Admin 
 *********************/
router.put('/change/:request_id', [auth, admin], requestController.change);


// Export API routes
module.exports = router;