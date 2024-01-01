import { Request, Response, NextFunction } from "express";
import {
  getCurrentGameInfo,
  getSummonerAccountByPuuid,
  getSummonerAccountByRiotId,
  getSummonerChampionsMasteriesByPuuid,
  getSummonerDataById,
  getSummonerDataByPuuid,
  getSummonerLeagues,
} from "../services/riotAPI";
import { getPorofessorLiveGameData } from "../services/porofessor";
import type { Period, QueueTag } from "../services/porofessor";
import {
  LiveGame,
  LiveGameParticipant,
  MasteriesInfos,
} from "../models/LiveGame";
import {
  CurrentGameParticipant,
  LolAPIChampionMastery,
} from "../models/lolApi-types";
import { PoroLiveGameData, PoroSummoner } from "../models/porofessor-types";
import { getChampionAmount } from "../services/cDragon";
import {
  getChampionProgression,
  getTheQuestProgression,
} from "../utils/masteries";
import { persistantLiveGame } from "../persistantLiveGame";
import * as mongoPersistence from "../services/mongoDb";
import { getSummonerData } from "./riotAPI";

export const getPorofessorLiveGame = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameName = encodeURI(req.params.gameName);
  let tagLine = encodeURI(req.params.tagLine);
  let queueTag: string | undefined = req.params.queue;
  let periodTag: string | undefined = req.params.period;

  if (queueTag === "season") {
    if (periodTag !== undefined) {
      return res.status(400).json("Bad request");
    }
    periodTag = "season";
    queueTag = undefined;
  }

  if (![undefined, "soloqueue", "flex", "ranked-only"].includes(queueTag))
    return res.status(400).json("Bad queue type : " + queueTag);

  if (![undefined, "season"].includes(periodTag))
    return res.status(400).json("Bad period : " + periodTag);

  getPorofessorLiveGameData(
    gameName,
    tagLine,
    queueTag as QueueTag,
    periodTag as Period
  ).then(async (poroLiveGameInfo) => {
    if (!poroLiveGameInfo)
      return res.status(500).json("Error getting porofessor live game");

    return res.status(200).json(poroLiveGameInfo);
  });
};

export const getPersistantLiveGame = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json(persistantLiveGame);
};

export const getLiveGameInfoByRiotId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameName = decodeURI(req.params.gameName);
  const tagLine = decodeURI(req.params.tagLine);
  let queueTag: string | undefined = req.params.queue;
  let periodTag: string | undefined = req.params.period;

  if (queueTag === "season") {
    if (periodTag !== undefined) {
      return res.status(400).json("Bad request");
    }
    periodTag = "season";
    queueTag = undefined;
  }

  if (![undefined, "soloqueue", "flex", "ranked-only"].includes(queueTag))
    return res.status(400).json("Bad queue type : " + queueTag);

  if (![undefined, "season"].includes(periodTag))
    return res.status(400).json("Bad period : " + periodTag);

  getSummonerAccountByRiotId(gameName, tagLine).then((accountData) => {
    if (!accountData) return res.status(404).json("Summoner account not found");
    const puuid = accountData.puuid;

    getSummonerDataByPuuid(puuid).then((sumData) => {
      if (!sumData) return res.status(404).json("Summoner not found");
      const summonerId = sumData.id;

      getCurrentGameInfo(summonerId).then(async (lolAPIliveGameInfo) => {
        if (!lolAPIliveGameInfo)
          return res.status(500).json("Error getting currentGame (lolApi)");

        // Si la game existe coté mongo
        const liveGameId = lolAPIliveGameInfo.gameId;
        mongoPersistence
          .getLiveGame(liveGameId, queueTag, periodTag)
          .then(async (game) => {
            //Si stoquée coté mongo on renvoit la game
            if (game !== null) return res.status(200).json(game);

            //Sinon on récupère les donées de la partie et on la stoque coté mongo
            const lolApiParticipant = lolAPIliveGameInfo.participants;

            //On regarde si les données de l'API riot sont déjà en BDD
            let riotAPIGameParticipants =
              await mongoPersistence.getRiotAPILiveGameParticipants(
                lolAPIliveGameInfo.gameId
              );
            if (!riotAPIGameParticipants) {
              const riotAPIParticipantsPromises = lolApiParticipant.map(
                async (
                  elt: CurrentGameParticipant
                ): Promise<LiveGameParticipant> => {
                  //Récupération riot account data
                  const sumData = await getSummonerDataById(elt.summonerId);
                  if (!sumData?.puuid)
                    throw Error("Error getting summoner account data");
                  const summonerAccountData = await getSummonerAccountByPuuid(
                    sumData.puuid
                  );
                  if (!summonerAccountData)
                    throw Error("Error getting summoner account data");

                  const masteries = await getMasteries(
                    sumData.puuid,
                    elt.championId
                  );

                  const leagues = await getSummonerLeagues(elt.summonerId);
                  return {
                    gameName: summonerAccountData.gameName,
                    tagLine: summonerAccountData.tagLine,
                    puuid: puuid,
                    ...elt,
                    porofessorStats: null,
                    masteries,
                    leagues,
                  };
                }
              );
              riotAPIGameParticipants = await Promise.all(
                riotAPIParticipantsPromises
              );
              // Store riot API data in MongoDb
              if (riotAPIGameParticipants)
                mongoPersistence.addRiotAPILiveGameParticipants(
                  lolAPIliveGameInfo.gameId,
                  riotAPIGameParticipants
                );
            }

            if (
              !riotAPIGameParticipants ||
              riotAPIGameParticipants.length === 0
            )
              return res
                .status(500)
                .json("Error getting game participants (Riot API)");

            //On regarde si les données de porofessor sont déjà en BDD
            let porofessorParticipantsData =
              await mongoPersistence.getPorofessorLiveGameParticipantsData(
                lolAPIliveGameInfo.gameId,
                queueTag,
                periodTag
              );
            if (!porofessorParticipantsData) {
              const poroLiveGameInfo = await getPorofessorLiveGameData(
                gameName,
                tagLine,
                "ranked-only",
                "season"
              );
              if (poroLiveGameInfo) {
                porofessorParticipantsData = riotAPIGameParticipants.reduce(
                  (acc: PoroSummoner[], elt: LiveGameParticipant) => {
                    const stats = findPoroStatsBySummonerName(
                      poroLiveGameInfo,
                      `${elt.gameName}#${elt.tagLine}`
                    );
                    return stats ? [...acc, stats] : acc;
                  },
                  []
                );
                // Store porofessor live game participants data
                if (porofessorParticipantsData)
                  mongoPersistence.addPorofessorILiveGameParticipantsData(
                    lolAPIliveGameInfo.gameId,
                    porofessorParticipantsData,
                    queueTag,
                    periodTag
                  );
              }
            }
            if (!porofessorParticipantsData)
              console.log("Error getting porofessor data");

            // Regrouper les données de porofessor et riotAPI
            const participants = riotAPIGameParticipants.map(
              (elt: LiveGameParticipant) => ({
                ...elt,
                porofessorStats: porofessorParticipantsData
                  ? porofessorParticipantsData.find(
                      (s) => s.name === `${elt.gameName}#${elt.tagLine}`
                    ) ?? null
                  : null,
              })
            );

            const liveGame: LiveGame = {
              gameId: lolAPIliveGameInfo.gameId,
              gameType: lolAPIliveGameInfo.gameType,
              gameStartTime: lolAPIliveGameInfo.gameStartTime,
              mapId: lolAPIliveGameInfo.mapId,
              gameLength: lolAPIliveGameInfo.gameLength,
              platformId: lolAPIliveGameInfo.platformId,
              gameMode: lolAPIliveGameInfo.gameMode,
              bannedChampions: lolAPIliveGameInfo.bannedChampions,
              gameQueueConfigId: lolAPIliveGameInfo.gameQueueConfigId,
              participants: participants,
            };

            //Game persistence
            mongoPersistence.addLiveGame(liveGame, queueTag, periodTag);

            return res.status(200).json(liveGame);
          });
      });
    });
  });
};

function findPoroStatsBySummonerName(
  poroLiveGameInfo: PoroLiveGameData,
  name: string
): PoroSummoner | null {
  const players = poroLiveGameInfo.players;
  const res = players.find(
    (player: PoroSummoner) =>
      player.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  );
  if (!res) return null;
  return res;
}

async function getMasteries(
  puuid: string,
  championId: number
): Promise<MasteriesInfos | null> {
  const lolApiMasteries = await getSummonerChampionsMasteriesByPuuid(puuid);
  if (!lolApiMasteries) return null;
  const totalChamp = await getChampionAmount();

  const playedChampionMasteryInfo = lolApiMasteries.find(
    (elt) => elt.championId === championId
  );
  const championPoint = playedChampionMasteryInfo
    ? playedChampionMasteryInfo.championPoints
    : 0;
  const championLevel = playedChampionMasteryInfo
    ? playedChampionMasteryInfo.championLevel
    : 0;
  const championToken = playedChampionMasteryInfo
    ? playedChampionMasteryInfo.tokensEarned
    : 0;
  const chestGranded = playedChampionMasteryInfo
    ? playedChampionMasteryInfo.chestGranted
    : false;
  const progression = lolApiMasteries
    ? getTheQuestProgression(lolApiMasteries, totalChamp)
    : 0;
  const championProgression = playedChampionMasteryInfo
    ? getChampionProgression(playedChampionMasteryInfo)
    : 0;
  const totalPoint = lolApiMasteries.reduce(
    (previousValue, champ: LolAPIChampionMastery) =>
      previousValue + champ.championPoints,
    0
  );

  return {
    progression,
    championProgression,
    totalPoint,
    championPoint,
    championLevel,
    championToken,
    chestGranded,
  };
}
