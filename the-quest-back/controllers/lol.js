require("dotenv").config(); //Charger la clef API "RIOT_API_KEY" depuis le fichier .env
const KEY = process.env.RIOT_API_KEY;

//Renvoit toutes les maitrises que possède un invocateur (les champions qui n'ont pas été joués n'apparaissent pas dans la liste)
exports.getMasteriesBySummonerName = (req, res, next) => {
  const SUM_NAME = encodeURI(req.params.name);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/by-name/${SUM_NAME}`,
    function (err, data) {
      if (data.id) {
        console.log(data.id);
        riotRequest.request(
          "euw1",
          "champion-mastery",
          `/lol/champion-mastery/v4/champion-masteries/by-summoner/${data.id}`,
          function (err, data) {
            if (data) {
              res.status(200).json(data);
            } else {
              res.status(400).json({ error });
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
exports.getMasteriesBySummonerId = (req, res, next) => {
  const SUM_ID = encodeURI(req.params.id);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);

  riotRequest.request(
    "euw1",
    "champion-mastery",
    `/lol/champion-mastery/v4/champion-masteries/by-summoner/${SUM_ID}`,
    function (err, data) {
      if (err == null && data) {
        res.status(200).json(data);
      } else {
        res.status(404).json("Summoners not found");
      }
    }
  );
};

/*Renvoit les données de base d'un invocateur ainsi que ses statistiques par type de ranked*/
exports.getSummonerById = (req, res, next) => {
  const SUM_ID = encodeURI(req.params.id);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/${SUM_ID}`,
    function (err, data) {
      if (data && data.id) {
        //Get summoners rank
        riotRequest.request(
          "euw1",
          "league",
          `/lol/league/v4/entries/by-summoner/${data.id}`,
          function (err, rankData) {
            if (rankData) {
              const ranked = rankData.map((Q) => ({
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
exports.getSummonerByName = (req, res, next) => {
  const SUM_NAME = encodeURI(req.params.name);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/by-name/${SUM_NAME}`,
    function (err, data) {
      if (data && data.id) {
        //Get sumoners rank
        riotRequest.request(
          "euw1",
          "league",
          `/lol/league/v4/entries/by-summoner/${data.id}`,
          function (err, rankData) {
            if (rankData) {
              const ranked = rankData.map((Q) => ({
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
