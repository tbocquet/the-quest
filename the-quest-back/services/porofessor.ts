import dotenv from "dotenv";
import { JSDOM } from "jsdom";
import got from "got";
import {
  PoroChampionStats,
  PoroLiveGameData,
  PoroPreviousSeasonRankedStats,
  PoroRankedStats,
  PoroSummoner,
  PoroTag,
  SummonerRole,
  TagNiceness,
  TeamTags,
} from "../models/porofessor-types";
import {
  extractNthWord,
  getFirstFloatFromString,
  extractNumberBeforePlayed,
  romanToNumber,
  extractVersion,
  removeHtmlTags,
  removeExtraSpaces,
  removeFirstNCharacters,
} from "../utils/regex";
import { Role } from "../models/Role";
import { Rank } from "../models/Rank";

dotenv.config();

const PORO_USER_AGENT = process.env.PORO_USER_AGENT;
const PORO_BASE_URL = "https://porofessor.gg/partial/fr/live-partial/euw/";

export type QueueTag = undefined | "soloqueue" | "flex" | "ranked-only";
export type Period = undefined | "season"; //undefined = 30 derniers jours

export async function getPorofessorLiveGameData(
  gameName: string,
  tagLine: string,
  queueTag: QueueTag,
  period: Period
): Promise<PoroLiveGameData | null> {
  const riotIdSegment = encodeURI(`${gameName}-${tagLine}`);

  const queueTagSegment = `/${queueTag}`;
  const periodSegment = `/${period}`;

  const url = `${PORO_BASE_URL}${riotIdSegment}${
    queueTag ? queueTagSegment : period ? periodSegment : ""
  }${period && queueTag ? periodSegment : ""}`;

  const htmlString = await request(url);

  const summonersData = parseSummonersInfos(htmlString);

  const teamsTags = parseTeamsTag(htmlString);

  if (!summonersData || !teamsTags) return null;

  return { players: summonersData, teamsTags };
}

async function request(url: string) {
  const headers = {
    Accept: "*/*",
    "User-Agent": PORO_USER_AGENT,
  };
  try {
    const { body, statusCode } = await got.get(url, { headers });
    return body;
  } catch (e) {
    console.log(e);
  }
  return "";
}

const parseTeamsTag = (htmlString: string): TeamTags[] | null => {
  const dom = new JSDOM(htmlString);
  const doc = dom.window.document;

  const node = doc.querySelectorAll("#teamRecaps > .cards-list > li");
  const summonersData = Array.from(node, (teamNode) =>
    getTeamTagsFromSummonerNode(teamNode)
  );
  return summonersData.slice(0, 2) as TeamTags[];
};

const getTeamTagsFromSummonerNode = (node: Element): TeamTags => {
  const targetNode = node.querySelectorAll(".box > .tag");
  const tags = Array.from(targetNode, (tagNode) => getTeamTag(tagNode));
  const res = tags.filter((tag) => tag !== null);
  return res as PoroTag[];
};

const getTeamTag = (node: Element): PoroTag | null => {
  const tagType: TagNiceness = node.classList.contains("green")
    ? "good"
    : node.classList.contains("red")
    ? "bad"
    : "neutral";

  const title = node.textContent;
  if (title === null) return null;
  const titleClean = removeExtraSpaces(title);

  const details = node.getAttribute("tooltip");

  return {
    title: titleClean,
    value: tagType,
    details: details
      ? removeFirstNCharacters(removeHtmlTags(details), titleClean.length + 1)
      : null,
  };
};

const parseSummonersInfos = (htmlString: string): PoroSummoner[] | null => {
  const dom = new JSDOM(htmlString);
  const doc = dom.window.document;

  const summonersNodes = doc.querySelectorAll(".cards-list > li");
  const summonersData = Array.from(summonersNodes, (sumNode) =>
    getSummonerDataFromSummonerNode(sumNode)
  );
  return summonersData.slice(0, 10) as PoroSummoner[];
};

const getSummonerDataFromSummonerNode = (
  node: Element
): PoroSummoner | null => {
  const name = getSummonerName(node);

  const id = getSummonerId(node);

  const role = getSummonerRole(node);

  const level = getSummonerLevel(node);

  if (!role || !name || !id || !level) return null;

  const rankedStats = getPoroRankedStats(node);
  const previousSeasonRankedStats = getPoroPreviousSeasonRankedStat(node);
  const championStats = getPoroChampionStats(node);
  const tags = getTags(node);

  return {
    name,
    id,
    level,
    role,
    rankedStats,
    previousSeasonRankedStats,
    championStats,
    tags,
  };
};

//----------------------
//PoroRankedStat getters
//----------------------

const getPoroRankedStats = (node: Element): PoroRankedStats | null => {
  const seasonId = getCurrentSeasonId(node);

  const gameAmount = getRankedGameAmount(node);

  if (!seasonId || !gameAmount) return null;

  const division = getDivision(node);
  const lp = getLP(node);
  const rank = getRank(node);
  const winrate = getRankedWinrate(node);

  return {
    division,
    gameAmount,
    lp,
    rank,
    seasonId,
    winrate,
  };
};

const getCurrentSeasonId = (node: Element): string | null => {
  const targetNode = node.querySelector(".oneLiner > .rankingSeason");
  if (targetNode === null) return null;
  const str = targetNode.textContent; // ex : S13.1:
  if (str === null) return null;
  return extractVersion(str);
};
const getRankedWinrate = (node: Element): number | null => {
  const nameNode = node.querySelector(".oneLiner > .highlight");
  if (nameNode === null) return null;
  const str = nameNode.textContent; //ex :  60% win
  if (str === null) return null;
  const winrate = getFirstFloatFromString(str);
  return winrate;
};
const getRankedGameAmount = (node: Element): number | null => {
  const targetNode = node.querySelector(
    ".imgflex > .txt > .content > .oneLiner"
  );

  if (targetNode === null) return null;
  const str = targetNode.textContent; //ex : " (113 Jouées) "

  if (str === null) return null;
  const amount = extractNumberBeforePlayed(str);

  return amount;
};

const getRank = (node: Element): Rank | null => {
  const rankNode = node.querySelector(
    ".rankingsBox > .imgFlex > .txt > .title"
  );
  if (rankNode === null) return null;
  const str = rankNode.textContent; // ex : Platine IV
  if (str === null) return null;
  const rank = extractNthWord(str, 0);
  if (rank === null) return null;
  const res = rank.toLocaleLowerCase();
  return res as Rank;
};

const getLP = (node: Element): number | null => {
  const targetNode = node.querySelector(
    ".rankingsBox > .imgFlex > .txt > .title > .subtitle"
  );

  if (targetNode === null) return null;
  const str = targetNode.textContent; //ex : 674 LP
  if (str === null) return null;
  return getFirstFloatFromString(str);
};

const getDivision = (node: Element): number | null => {
  const targetNode = node.querySelector(
    ".rankingsBox > .imgFlex > .txt > .title"
  );
  if (targetNode === null) return null;
  const str = targetNode.textContent; //ex : Platine IV
  if (str === null) return null;
  const division = extractNthWord(str, 1);
  if (division === null) return null;
  return romanToNumber(division);
};

//------------------------------------
//PoroPreviousSeasonRankedStat getters
//------------------------------------

const getPoroPreviousSeasonRankedStat = (
  node: Element
): PoroPreviousSeasonRankedStats | null => {
  const rank = getPreviousRank(node);
  const seasonId = getPreviousSeasonId(node);
  if (!rank || !seasonId) return null;

  const division = getPreviousDivision(node);
  return { division, rank, seasonId };
};

const getPreviousSeasonId = (node: Element): string | null => {
  const tagetNode = node.querySelector(".inlinePreviousSeasonRankingTxt");
  if (tagetNode === null) return null;
  const str = tagetNode.textContent;
  if (str === null) return null;
  return extractVersion(str);
};

const getPreviousRank = (node: Element): Rank | null => {
  const targetNode = node.querySelector(".inlinePreviousSeasonRanking img");
  if (targetNode === null) return null;
  const str = targetNode.getAttribute("alt");
  if (str === null) return null;
  const rank = extractNthWord(str, 0);
  if (rank === null) return null;
  const res = rank.toLocaleLowerCase();
  return res as Rank;
};

const getPreviousDivision = (node: Element): number | null => {
  const targetNode = node.querySelector(".inlinePreviousSeasonRanking img");
  if (targetNode === null) return null;
  const str = targetNode.getAttribute("alt");
  if (str === null) return null;
  const division = extractNthWord(str, 1);
  if (division === null) return null;
  return romanToNumber(division);
};

//------------------------
//PoroChampionStat getters
//------------------------

const getPoroChampionStats = (node: Element): PoroChampionStats | null => {
  const name = getChampionName(node);
  if (!name) return null;

  const winrate = getChampionWinrate(node);
  const gameAmount = getChampionGameAmont(node) ?? 0;
  const kills = getChampionKills(node);
  const deaths = getChampionDeaths(node);
  const assists = getChampionAssists(node);
  // console.log("here");
  // console.log(kills, deaths, assists);

  return { name, winrate, gameAmount, kills, deaths, assists };
};

const getChampionName = (node: Element): string | null => {
  const targetNode = node.querySelector(
    ".championBox > .imgFlex > .imgColumn-champion img"
  );
  if (targetNode === null) return null;
  const str = targetNode.getAttribute("alt");
  if (str === null) return null;
  return str.toLocaleLowerCase();
};

const getChampionWinrate = (node: Element): number | null => {
  const targetNode = node.querySelector(".txt > .title");

  if (targetNode === null) return null;
  const str = targetNode.textContent;
  if (str === null) return null;
  return getFirstFloatFromString(str);
};

const getChampionGameAmont = (node: Element): number | null => {
  const targetNode = node.querySelector(".txt > .title > .subtitle");

  if (targetNode === null) return null;
  const str = targetNode.textContent;
  if (str === null) return null;
  return getFirstFloatFromString(str);
};

const getChampionKills = (node: Element): number | null => {
  const targetNode = node.querySelector(".txt > .content .kills");

  if (targetNode === null) return null;
  const str = targetNode.textContent;
  if (str === null) return null;
  return getFirstFloatFromString(str);
};
const getChampionDeaths = (node: Element): number | null => {
  const targetNode = node.querySelector(".txt > .content .deaths");

  if (targetNode === null) return null;
  const str = targetNode.textContent;
  if (str === null) return null;
  return getFirstFloatFromString(str);
};
const getChampionAssists = (node: Element): number | null => {
  const targetNode = node.querySelector(".txt > .content .assists");

  if (targetNode === null) return null;
  const str = targetNode.textContent;
  if (str === null) return null;
  return getFirstFloatFromString(str);
};

//------------------------
//PoroSummoner
//------------------------

const getSummonerName = (node: Element): string | null => {
  const nameNode = node.querySelector("li > div ");
  if (nameNode === null) return null;
  const name = nameNode.getAttribute("data-summonername");
  return name;
};

const getSummonerId = (node: Element): string | null => {
  const nameNode = node.querySelector("li > div ");
  if (nameNode === null) return null;
  const id = nameNode?.getAttribute("data-summonerid");
  return id;
};

const getSummonerLevel = (node: Element): number | null => {
  const tagetNode = node.querySelector(".imgFlex > .imgColumn-champion .level");
  if (tagetNode === null) return null;
  const str = tagetNode.textContent;
  if (str === null) return null;
  return getFirstFloatFromString(str);
};

const getTags = (node: Element): PoroTag[] => {
  const targetNode = node.querySelectorAll(".tags-box > tag");
  const tags = Array.from(targetNode, (tagNode) => getTag(tagNode));
  const res = tags.filter((tag) => tag !== null);
  return res as PoroTag[];
};

const getTag = (node: Element): PoroTag | null => {
  const tagType = node.getAttribute("data-tag-niceness");

  let value;
  switch (tagType) {
    case "-1":
      value = "bad";
      break;
    case "1":
      value = "good";
      break;
    default:
      value = "neutral";
      break;
  }

  const tagTextNode = node.querySelector(".tag");
  if (tagTextNode === null) return null;
  const title = tagTextNode.textContent;
  if (title === null) return null;
  const details = tagTextNode.getAttribute("tooltip");
  const titleClean = removeExtraSpaces(title);

  return {
    title: titleClean,
    value: value as TagNiceness,
    details: details
      ? removeFirstNCharacters(removeHtmlTags(details), titleClean.length + 1)
      : null,
  };
};

//------------------------
//Summoner role
//------------------------
const getSummonerRole = (node: Element): SummonerRole | null => {
  const role = getRole(node);
  if (role === null) return null;
  const mainRole = getMainRole(node);
  return { role, mainRole } as SummonerRole;
};

const getRole = (node: Element): Role | null => {
  const targetNode = node.querySelector(".rolesBox > .imgFlex > .txt > .title");
  if (targetNode === null) return null;
  const str = targetNode.textContent;
  if (str === null) return null;
  const role = extractNthWord(str, 0);
  if (role === null) return null;
  const res = role.toLocaleLowerCase();
  return res as Role;
};

const getMainRole = (node: Element): Role[] | null => {
  const targetNode = node.querySelector(".txt > .content > .highlight");
  if (targetNode === null) return null;
  const str = targetNode.textContent;
  if (str === null) return null;
  const roles = removeExtraSpaces(str).toLocaleLowerCase().split(",");
  return roles as Role[];
};
