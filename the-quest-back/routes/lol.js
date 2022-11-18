const express = require("express");
const router = express.Router();

const lolCtrl = require("../controllers/lol");

router.get("/masteriesBySummonerId/:id", lolCtrl.getMasteriesBySummonerId);
router.get(
  "/masteriesBySummonerName/:name",
  lolCtrl.getMasteriesBySummonerName
);
router.get("/summonerById/:id", lolCtrl.getSummonerById);
router.get("/summonerByName/:name", lolCtrl.getSummonerByName);

module.exports = router;
