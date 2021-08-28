const express = require("express");
const router = express.Router();

const { create_report, get_report } = require("../controllers/report");

router.post("/report", create_report);
router.get("/report", get_report);

module.exports = router;