const KEY = "RGAPI-c3c53c04-0cee-4bcc-bcdd-6f8f8e76ce4d";

exports.getChampions = (req, res, next) => {
  const jsonData = require("../Assets/champion.json");
  const resData = jsonData.map((champ) => {
    const url = `${req.protocol}://${req.get("host")}/images/champion/${
      champ.url
    }`;
    return { ...champ, url: url };
  });
  res.status(200).json(resData);
};

exports.getMasteries = (req, res, next) => {
  const SUM_NAME = encodeURI(req.params.id);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/by-name/${SUM_NAME}`,
    function (err, data) {
      if (data.id) {
        riotRequest.request(
          "euw1",
          "champion-mastery",
          `/lol/champion-mastery/v4/champion-masteries/by-summoner/${data.id}`,
          function (err, data) {
            if (data) {
              const jsonData = require("../Assets/champion.json");
              const withLvl0 = jsonData.map((champ) => {
                const info = data.find(
                  (elt) => elt.championId === parseInt(champ.key)
                );
                if (info !== undefined) {
                  return info;
                } else {
                  return {
                    championId: parseInt(champ.key),
                    championLevel: 0,
                    championPoints: 0,
                    lastPlayTime: 0,
                    championPointsSinceLastLevel: 0,
                    championPointsUntilNextLevel: 0,
                    chestGranted: false,
                    tokensEarned: 0,
                  };
                }
              });
              res.status(200).json(withLvl0);
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

exports.getSummoner = (req, res, next) => {
  const SUM_NAME = encodeURI(req.params.id);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/by-name/${SUM_NAME}`,
    function (err, data) {
      if (data && data.id) {
        console.log(data);
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
