import { MongoClient, ServerApiVersion } from "mongodb";

import { env } from "~/env";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let innerClientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(env.DATABASE_URL, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  innerClientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(env.DATABASE_URL, options);
  innerClientPromise = client.connect();
}

export const db = client ?? new MongoClient(env.DATABASE_URL, options);
export const clientPromise = db.connect();
