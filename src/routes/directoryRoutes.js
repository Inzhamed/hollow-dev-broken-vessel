const express = require("express");
const {
  exploreDirectory,
  createDirectory,
  deleteDirectory,
  renameDirectory,
} = require("../controllers/directoryController");

const router = express.Router();

router.post("/explore", exploreDirectory);
router.post("/create", createDirectory);
router.post("/delete", deleteDirectory);
router.post("/rename", renameDirectory);

module.exports = router;
