import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  appName: "backend-bits-portfolio",
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Get the auth database
export const getAuthDatabase = async () => {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "backend-bits-auth");
};

// Get synchronous database instance for better-auth adapter
export const getAuthDatabaseSync = () => {
  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClient?: MongoClient;
    };
    
    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(uri, options);
    }
    return globalWithMongo._mongoClient.db(process.env.MONGODB_DB || "backend-bits-auth");
  } else {
    if (!client) {
      client = new MongoClient(uri, options);
    }
    return client.db(process.env.MONGODB_DB || "backend-bits-auth");
  }
};