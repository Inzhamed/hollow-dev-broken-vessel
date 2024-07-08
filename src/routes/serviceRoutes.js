// src/routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const {
  createService,
  configureFile,
  executeBashScript,
} = require("../controllers/serviceController");

router.post("/create", createService);
router.post("/configure", configureFile);
router.post("/execute", executeBashScript);

module.exports = router;