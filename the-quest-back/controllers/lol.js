const KEY = "RGAPI-38c30f2a-4938-4f45-8bfb-e4507f246a32";

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

exports.getSummoner = (req, res, next) => {
  const SUM_NAME = encodeURI(req.params.id);
  var RiotRequest = require("riot-lol-api");
  var riotRequest = new RiotRequest(KEY);
  riotRequest.request(
    "euw1",
    "summoner",
    `/lol/summoner/v4/summoners/by-name/${SUM_NAME}`,
    function (err, data) {
      if (data) {
        res.status(200).json({
          id: data.id,
          name: data.name,
          profileIconId: data.profileIconId,
          summonerLevel: data.summonerLevel,
        });
      } else {
        res.status(404).json("Summoners not found");
      }
    }
  );
};
