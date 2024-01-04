import dotenv from "dotenv";
import { LiveGame, LiveGameParticipant } from "../models/LiveGame";
import { PoroSummoner } from "../models/porofessor-types";
dotenv.config();

const mongoPassword = process.env.MONGO_PASSORD;

//MongoDB (game persistency)

const { MongoClient, ServerApiVersion } = require("mongodb");
const url = `mongodb+srv://theQuestBackendApp:${mongoPassword}@the-quest.0lpck7p.mongodb.net/`;

export async function pingMongo() {
  const uri = `${url}?retryWrites=true&w=majority"`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function addRiotAPILiveGameParticipants(
  gameId: number,
  participants: LiveGameParticipant[]
) {
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    await client
      .db("the_quest")
      .collection("riot_API_live_game_participants")
      .insertOne({ gameId, participants });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
export async function getRiotAPILiveGameParticipants(
  gameId: number
): Promise<LiveGameParticipant[] | null> {
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    const res = await client
      .db("the_quest")
      .collection("riot_API_live_game_participants")
      .findOne({ gameId: gameId });
    if (res === null) return null;
    return res.participants;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await client.close();
  }
}

export async function addLiveGame(
  liveGame: LiveGame,
  queueTag?: string,
  period?: string
) {
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    await client
      .db("the_quest")
      .collection("live_game")
      .insertOne({ ...liveGame, queueTag, period });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function getLiveGame(
  gameId: number,
  queueTag?: string,
  period?: string
): Promise<LiveGame | null> {
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    const res = await client
      .db("the_quest")
      .collection("live_game")
      .findOne({ gameId: gameId, queueTag: queueTag, period: period });
    if (res === null) return null;
    return res as LiveGame;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await client.close();
  }
}

export async function deleteLiveGame(gameId: number) {
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    await client
      .db("the_quest")
      .collection("live_game")
      .deleteMany({ gameId: gameId });
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await client.close();
  }
}

export async function deleteAllRiotData() {
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    await client
      .db("the_quest")
      .collection("riot_API_live_game_participants")
      .deleteMany({});
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await client.close();
  }
}

export async function deleteAllGame() {
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    await client.db("the_quest").collection("live_game").deleteMany({});
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await client.close();
  }
}
