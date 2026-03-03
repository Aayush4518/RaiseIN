import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// We'll use mongoose for both ODM operations and to provide the
// underlying `MongoClient` to NextAuth’s MongoDBAdapter.  This keeps the
// connection pool in one place and avoids timing issues caused by two
// separate clients trying to connect simultaneously.

// ensure we only ever call mongoose.connect once
let mongoosePromise;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose.connect(uri);
    global._mongoClientPromise = global._mongoosePromise.then(
      () => mongoose.connection.getClient()
    );
  }
  mongoosePromise = global._mongoosePromise;
  clientPromise = global._mongoClientPromise;
} else {
  mongoosePromise = mongoose.connect(uri);
  clientPromise = mongoosePromise.then(() => mongoose.connection.getClient());
}

// export both promises so callers can await the connection or get the client
export { mongoosePromise };
export default clientPromise;
