const dashboardModel = require("../models/dashboardModel");

function dataDashboard(req, res) {
  const { userId } = req.params;

  if (userId === undefined) return res.status(400).json();

  dashboardModel.dataDashboard(userId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

function dataChartRadar(req, res) {
  const { userId } = req.params;

  if (userId === undefined) return res.status(400).json();

  dashboardModel.dataChartRadar(userId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

module.exports = {
  dataDashboard,
  dataChartRadar,
};
