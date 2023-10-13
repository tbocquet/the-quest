import express from "express";
import { Router } from "express";
import * as controler from "../controllers/liveGame";

const router: Router = express.Router();

router.get("/liveGameByName/:name", controler.getLiveGameInfoByName);
router.get("/porofessor/:name", controler.getPorofessorLiveGame);
router.get("/persistantLiveGame", controler.getPersistantLiveGame);

export default router;
