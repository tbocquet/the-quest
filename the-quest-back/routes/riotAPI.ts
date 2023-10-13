import express from "express";
import { Router } from "express";
import {
  getLeagues,
  getLeaguesBySummonerName,
  getMasteries,
  getMasteriesBySummonerName,
  getSpectate,
  getSpectateByName,
  getSummonerData,
  getSummonerDatabyName,
} from "../controllers/riotAPI";

const router: Router = express.Router();

router.get("/summoner/:id", getSummonerData);
router.get("/summonerByName/:name", getSummonerDatabyName);

router.get("/masteries/:id", getMasteries);
router.get("/masteriesByName/:name", getMasteriesBySummonerName);

router.get("/leagues/:id", getLeagues);
router.get("/leaguesByName/:name", getLeaguesBySummonerName);

router.get("/spectate/:id", getSpectate);
router.get("/spectateByName/:name", getSpectateByName);

export default router;
