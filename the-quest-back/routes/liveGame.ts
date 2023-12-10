import express from "express";
import { Router } from "express";
import * as controler from "../controllers/liveGame";

const router: Router = express.Router();

router.get(
  "/liveGameByRiotId/:gameName/:tagLine",
  controler.getLiveGameInfoByRiotId
);
router.get("/porofessor/:gameName/:tagLine", controler.getPorofessorLiveGame);
router.get("/persistantLiveGame", controler.getPersistantLiveGame);

export default router;
