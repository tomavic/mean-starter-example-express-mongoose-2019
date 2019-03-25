// api-routes.js
// Initialize express router
const router = require("express").Router();
const userController = require('../controllers/users.controller');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/auth", userController.login);
router.post("/register", userController.register);

router.get("/me", auth, userController.me);
router.put("/update/:user_id", auth, userController.update);

/**********************
 *      Admin 
 *********************/
router.get("/all", [auth, admin], userController.list);
router.delete('/delete/:user_id', [auth, admin], userController.delete);

// Export API routes
module.exports = router;
