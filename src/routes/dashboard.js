const express = require("express")
const router = express.Router()

const dashboardController = require("../controllers/dashboardController")

router.get("/user/:userId", dashboardController.dataDashboard)
router.get("/chart-radar/user/:userId", dashboardController.dataChartRadar)

module.exports = router