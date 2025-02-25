const express = require("express");
const { protect } = require("../middleware/middleware");
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatControllers");

const router = express.Router();
//get and create chats
router.route('/').post(protect, accessChat).get(protect, fetchChats);

// //get and create groups
router.route('/group').post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;