const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/Authentication");
const {
  addApplication,
  fetchApplication,
  findOneApplication,
  handleApplicationDelete,
  handleApplicationEdit,
} = require("../controller/applicationController");

router.post("/add", authenticateUser, addApplication);
router.get("/", authenticateUser, fetchApplication);
router.get("/findOne",authenticateUser,findOneApplication)
router.post("/edit",authenticateUser,handleApplicationEdit)
router.get("/delete",authenticateUser,handleApplicationDelete)

module.exports = router;
