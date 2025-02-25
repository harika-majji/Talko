const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/middleware");

const router=express.Router();
router.use(express.json());
// add middleware protect to authorize the jwt token before processing the req
router.route('/').post(registerUser).get(protect, allUsers);

router.post('/login', authUser);

module.exports = router
