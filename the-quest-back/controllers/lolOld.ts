import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

const RiotRequest = require("riot-lol-api");
dotenv.config();
const KEY = process.env.RIOT_API_KEY;

//Renvoit toutes les maitrises que possède un invocateur (les champions qui n'ont pas été joués n'apparaissent pas dans la liste)
export const getMasteriesBySummonerName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SUM_NAME = encodeURI(req.params.name);

  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/by-name/${SUM_NAME}`,
    function (err: any, data: any) {
      if (data.id) {
        console.log(data.id);
        riotRequest.request(
          "euw1",
          "champion-mastery",
          `/lol/champion-mastery/v4/champion-masteries/by-summoner/${data.id}`,
          function (err: any, data: any) {
            if (data) {
              res.status(200).json(data);
            } else {
              res.status(400).json({ err });
            }
          }
        );
      } else {
        res.status(404).json("Summoners not found");
      }
    }
  );
};

//Renvoit toutes les maitrises que possède un invocateur (les champions qui n'ont pas été joués n'apparaissent pas dans la liste)
export const getMasteriesBySummonerId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SUM_ID = encodeURI(req.params.id);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);

  riotRequest.request(
    "euw1",
    "champion-mastery",
    `/lol/champion-mastery/v4/champion-masteries/by-summoner/${SUM_ID}`,
    function (err: any, data: any) {
      if (err == null && data) {
        res.status(200).json(data);
      } else {
        res.status(404).json("Summoners not found");
      }
    }
  );
};

/*Renvoit les données de base d'un invocateur ainsi que ses statistiques par type de ranked*/
export const getSummonerById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SUM_ID = encodeURI(req.params.id);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/${SUM_ID}`,
    function (err: any, data: any) {
      if (data && data.id) {
        //Get summoners rank
        riotRequest.request(
          "euw1",
          "league",
          `/lol/league/v4/entries/by-summoner/${data.id}`,
          function (err: any, rankData: any) {
            if (rankData) {
              const ranked = rankData.map((Q: any) => ({
                queueType: Q.queueType,
                tier: Q.tier,
                rank: Q.rank,
                wins: Q.wins,
                losses: Q.losses,
              }));
              res.status(200).json({
                id: data.id,
                name: data.name,
                profileIconId: data.profileIconId,
                summonerLevel: data.summonerLevel,
                ranks: ranked,
              });
            } else {
              res.status(500).json("Summoners not found");
            }
          }
        );
      } else {
        res.status(404).json("Summoners not found");
      }
    }
  );
};

/*Renvoit les données de base d'un invocateur ainsi que ses statistiques par type de ranked*/
export const getSummonerByName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SUM_NAME = encodeURI(req.params.name);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/by-name/${SUM_NAME}`,
    function (err: any, data: any) {
      if (data && data.id) {
        //Get sumoners rank
        riotRequest.request(
          "euw1",
          "league",
          `/lol/league/v4/entries/by-summoner/${data.id}`,
          function (err: any, rankData: any) {
            if (rankData) {
              const ranked = rankData.map((Q: any) => ({
                queueType: Q.queueType,
                tier: Q.tier,
                rank: Q.rank,
                wins: Q.wins,
                losses: Q.losses,
              }));
              res.status(200).json({
                id: data.id,
                name: data.name,
                profileIconId: data.profileIconId,
                summonerLevel: data.summonerLevel,
                ranks: ranked,
              });
            } else {
              res.status(500).json("Summoners not found");
            }
          }
        );
      } else {
        res.status(404).json("Summoners not found");
      }
    }
  );
};
