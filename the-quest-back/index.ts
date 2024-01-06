import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import lolRoutes from "./routes/lolOld";
import liveGameRoutes from "./routes/liveGame";
import riotApi from "./routes/riotAPI";
import cors from "cors";
import {
  deleteAllGame,
  deleteAllRiotData,
  pingMongo,
} from "./services/mongoDb";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

//Configure cors
app.use(cors());

//Initialise mongoDb
pingMongo().catch(console.dir);

//Cleaning mongo games
const interval = setInterval(() => {
  deleteAllRiotData();
  deleteAllGame();
}, 1000 * 60 * 60 * 24);

//Routes
app.get("/", (req: Request, res: Response) => {
  res.send(
    "The Quest : Express + TypeScript Server (last update : 05:01:2024 17:00)"
  );
});

app.use("/api/lol", lolRoutes);
app.use("/", liveGameRoutes);
app.use("/riot", riotApi);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
