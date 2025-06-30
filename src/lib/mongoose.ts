import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;

if (!MONGO_DB_URI) {
  throw new Error(
    "Please define the MONGO_DB_URI environment variable in .env.local"
  );
}

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = {
    conn: null,
    promise: null,
  };
}

export async function dbConnect() {
  const cached = globalWithMongoose.mongooseCache;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_DB_URI, {
      bufferCommands: false,
    });
    ``;
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
