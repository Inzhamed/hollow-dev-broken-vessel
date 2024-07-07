const express = require("express");
const { executeRemoteCommand } = require("../controllers/sshController");
const router = express.Router();

router.post("/", executeRemoteCommand);

module.exports = router;
