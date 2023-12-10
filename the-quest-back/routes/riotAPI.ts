import express from "express";
import { Router } from "express";
import {
  getLeagues,
  getLeaguesBySummonerName,
  getMasteries,
  getMasteriesByPuuid,
  getMasteriesBySummonerName,
  getRiotAccount,
  getRiotAccountByRiotID,
  getSpectate,
  getSpectateByName,
  getSummonerData,
  getSummonerDataByRiotId,
  getSummonerDatabyName,
  getSummonerDatabyPuuid,
} from "../controllers/riotAPI";

const router: Router = express.Router();

router.get("/summoner/:id", getSummonerData);
router.get("/summonerByName/:name", getSummonerDatabyName);
router.get("/summonerByPuuid/:puuid", getSummonerDatabyPuuid);
router.get("/summonerByRiotId/:gameName/:tagLine", getSummonerDataByRiotId);

router.get("/riotAccountByRiotID/:gameName/:tagLine", getRiotAccountByRiotID);
router.get("/riotAccount/:puuid", getRiotAccount);

router.get("/masteries/:id", getMasteries);
router.get("/masteriesByName/:name", getMasteriesBySummonerName);
router.get("/masteriesByPuuid/:puuid", getMasteriesByPuuid);

router.get("/leagues/:id", getLeagues);
router.get("/leaguesByName/:name", getLeaguesBySummonerName);

router.get("/spectate/:id", getSpectate);
router.get("/spectateByName/:name", getSpectateByName);

export default router;
