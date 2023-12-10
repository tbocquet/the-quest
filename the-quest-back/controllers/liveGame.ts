import { Request, Response, NextFunction } from "express";
import {
  getCurrentGameInfo,
  getSummonerAccountByPuuid,
  getSummonerAccountByRiotId,
  getSummonerChampionsMasteries,
  getSummonerDataById,
  getSummonerDataByName,
  getSummonerDataByPuuid,
  getSummonerLeagues,
} from "../services/riotAPI";
import { getPorofessorLiveGameData } from "../services/porofessor";
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
  const tagLine = encodeURI(req.params.tagLine);
  getPorofessorLiveGameData(gameName, tagLine).then(
    async (poroLiveGameInfo) => {
      if (!poroLiveGameInfo)
        return res.status(500).json("Error getting porofessor live game");

      return res.status(200).json(poroLiveGameInfo);
    }
  );
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
  getSummonerAccountByRiotId(gameName, tagLine).then((accountData) => {
    if (!accountData) return res.status(404).json("Summoner account not found");
    const puuid = accountData.puuid;

    getSummonerDataByPuuid(puuid).then((sumData) => {
      if (!sumData) return res.status(404).json("Summoner not found");
      const summonerId = sumData.id;
      getCurrentGameInfo(summonerId).then((lolAPIliveGameInfo) => {
        if (!lolAPIliveGameInfo)
          return res.status(500).json("Error getting currentGame (lolApi)");

        //Si la game existe coté mongo
        const liveGameId = lolAPIliveGameInfo.gameId;
        mongoPersistence.getLiveGame(liveGameId).then((game) => {
          //Si stoquée coté mongo on renvoit la game
          if (game !== null) return res.status(200).json(game);

          //Sinon on récupère les donées de la partie et on la stoque coté mongo
          getPorofessorLiveGameData(gameName, tagLine).then(
            async (poroLiveGameInfo) => {
              if (!poroLiveGameInfo)
                console.log("Error getting currentGame (poro)");

              const lolApiParticipant = lolAPIliveGameInfo.participants;

              const gameParticipants = lolApiParticipant.map(
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

                  const summonerPoroStats = poroLiveGameInfo
                    ? findPoroStatsBySummonerName(
                        poroLiveGameInfo,
                        `${summonerAccountData.gameName}#${summonerAccountData.tagLine}`
                      )
                    : null;

                  const masteries = await getMasteries(
                    elt.summonerId,
                    elt.championId
                  );
                  const leagues = await getSummonerLeagues(elt.summonerId);
                  return {
                    gameName: summonerAccountData.gameName,
                    tagLine: summonerAccountData.tagLine,
                    puuid: puuid,
                    ...elt,
                    porofessorStats: summonerPoroStats,
                    masteries,
                    leagues,
                  };
                }
              );
              Promise.all(gameParticipants).then((participants) => {
                if (!participants || participants.length === 0)
                  return res
                    .status(500)
                    .json("Error getting game participants");
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
                  participants,
                };

                //Game persistence
                mongoPersistence.addLiveGame(liveGame);

                return res.status(200).json(liveGame);
              });
            }
          );
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
  summonerId: string,
  championId: number
): Promise<MasteriesInfos | null> {
  const lolApiMasteries = await getSummonerChampionsMasteries(summonerId);
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
