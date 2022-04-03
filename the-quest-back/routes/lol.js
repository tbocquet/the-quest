const express = require("express");
const router = express.Router();

const lolCtrl = require("../controllers/lol");

router.get("/champions", lolCtrl.getChampions);
router.get("/masteries/:id", lolCtrl.getMasteries);
router.get("/summoner/:id", lolCtrl.getSummoner);

module.exports = router;
