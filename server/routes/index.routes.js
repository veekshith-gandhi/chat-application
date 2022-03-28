/** @format */

const express = require("express");
const router = express.Router();

const display = require("../controller/index.controller");
router.get("/", display);

module.exports = router;
