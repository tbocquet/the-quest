import { Request, Response, NextFunction } from "express";
import {
  getCurrentGameInfo,
  getSummonerAccountByPuuid,
  getSummonerAccountByRiotId,
  getSummonerChampionsMasteries,
  getSummonerChampionsMasteriesByPuuid,
  getSummonerDataById,
  getSummonerDataByName,
  getSummonerDataByPuuid,
  getSummonerLeagues,
} from "../services/riotAPI";

export const getSummonerData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const summonerId = encodeURI(req.params.id);
  getSummonerDataById(summonerId).then((data) => {
    if (!data) return res.status(500).json("Error getting summoner data");
    return res.status(200).json(data);
  });
};

export const getSummonerDatabyName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const summonerName = decodeURI(req.params.name);
  getSummonerDataByName(summonerName).then((data) => {
    if (!data)
      return res.status(500).json("Error getting summoner data by name");
    return res.status(200).json(data);
  });
};

export const getSummonerDatabyPuuid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const puuid = decodeURI(req.params.puuid);
  getSummonerDataByPuuid(puuid).then((data) => {
    if (!data)
      return res.status(500).json("Error getting summoner data by puuid");
    return res.status(200).json(data);
  });
};

export const getSummonerDataByRiotId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameName = decodeURI(req.params.gameName);
  const tagLine = decodeURI(req.params.tagLine);
  getSummonerAccountByRiotId(gameName, tagLine).then((data) => {
    if (!data)
      return res.status(500).json("Error getting account data by RiotId");
    getSummonerDataByPuuid(data.puuid).then((data) => {
      if (!data)
        return res.status(500).json("Error getting summoner data by puuid");
      return res.status(200).json(data);
    });
  });
};

export const getRiotAccountByRiotID = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameName = decodeURI(req.params.gameName);
  const tagLine = decodeURI(req.params.tagLine);
  getSummonerAccountByRiotId(gameName, tagLine).then((data) => {
    if (!data)
      return res.status(500).json("Error getting account data by RiotId");
    return res.status(200).json(data);
  });
};

export const getRiotAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const puuid = decodeURI(req.params.puuid);
  getSummonerAccountByPuuid(puuid).then((data) => {
    if (!data)
      return res.status(500).json("Error getting account data by puuid");
    return res.status(200).json(data);
  });
};

export const getMasteries = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const summonerId = encodeURI(req.params.id);
  getSummonerChampionsMasteries(summonerId).then((data) => {
    if (!data) return res.status(500).json("Error getting summoner masteries");
    return res.status(200).json(data);
  });
};

export const getMasteriesBySummonerName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const summonerName = decodeURI(req.params.name);
  getSummonerDataByName(summonerName).then((data) => {
    if (!data) return res.status(500).json("Error getting summoner data");

    getSummonerChampionsMasteries(data.id).then((masteries) => {
      if (!masteries)
        return res.status(500).json("Error getting summoner masteries");
      return res.status(200).json(masteries);
    });
  });
};

export const getMasteriesByPuuid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const puuid = encodeURI(req.params.puuid);
  getSummonerChampionsMasteriesByPuuid(puuid).then((data) => {
    if (!data) return res.status(500).json("Error getting summoner masteries");
    return res.status(200).json(data);
  });
};

export const getLeagues = (req: Request, res: Response, next: NextFunction) => {
  const summonerId = encodeURI(req.params.id);
  getSummonerLeagues(summonerId).then((data) => {
    if (!data) return res.status(500).json("Error getting summoner Leagues");
    return res.status(200).json(data);
  });
};

export const getLeaguesBySummonerName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const summonerName = decodeURI(req.params.name);
  getSummonerDataByName(summonerName).then((data) => {
    if (!data) return res.status(500).json("Error getting summoner data");

    getSummonerLeagues(data.id).then((leagues) => {
      if (!leagues)
        return res.status(500).json("Error getting summoner Leagues");
      return res.status(200).json(leagues);
    });
  });
};

export const getSpectate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = encodeURI(req.params.id);

  getCurrentGameInfo(id).then((gameInfo) => {
    if (!gameInfo) return res.status(500).json("Error getting current game");
    return res.status(200).json(gameInfo);
  });
};

export const getSpectateByName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const summonerName = decodeURI(req.params.name);
  getSummonerDataByName(summonerName).then((data) => {
    if (!data) return res.status(500).json("Error getting summoner data");

    getCurrentGameInfo(data.id).then((gameInfo) => {
      if (!gameInfo) return res.status(500).json("Error getting current game");
      return res.status(200).json(gameInfo);
    });
  });
};
