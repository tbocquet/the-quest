import express from "express";
import { Router } from "express";
import * as lolCtrl from "../controllers/lolOld";

const router: Router = express.Router();

router.get("/masteriesBySummonerId/:id", lolCtrl.getMasteriesBySummonerId);
router.get(
  "/masteriesBySummonerName/:name",
  lolCtrl.getMasteriesBySummonerName
);
router.get("/summonerById/:id", lolCtrl.getSummonerById);
router.get("/summonerByName/:name", lolCtrl.getSummonerByName);

export default router;
