// import mongoose from 'mongoose' ; 

// const connect = async (): Promise<void> => {
//   if(mongoose.connections[0].readyState) return ;

//   try {
//     const client = await mongoose.connect(process.env.MONGODB_URI!, {
//       dbName: "zenApply"
//     });
//     //const database = mongoose.connection.useDb("zenApply");
//     console.log("Mongoose connected!") ; 
//     //return client ; 
//   }catch(error) {
//     console.log(error) ; 
//   }
// }

// export default connect ; 

// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads in development.
//  * This prevents connections from growing exponentially during API Route usage.
//  */
// declare global {
//   var mongoose: {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
//   };
// }

// global.mongoose = global.mongoose || { conn: null, promise: null };

// async function dbConnect(): Promise<void> {
//   if (global.mongoose.conn) {
//     return;
//   }

//   if (!global.mongoose.promise) {
//     const options = {
//       dbName: 'zenApply',
//     };

//     global.mongoose.promise = mongoose.connect(MONGODB_URI!, options).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   global.mongoose.conn = await global.mongoose.promise;
//   console.log('Mongoose connected!');
// }

// export default dbConnect;


import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;


export async function dbConnect(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db('zenApply');
  return cachedDb;
}

// export async function dbConnect(): Promise<Db> {
//   if (cachedDb) {
//     return cachedDb;
//   }

//   if (!cachedClient) {
//     cachedClient = new MongoClient(uri);
//   }

//   if (!cachedClient.isConnected()) {
//     await cachedClient.connect();
//   }

//   cachedDb = cachedClient.db();
//   return cachedDb;
// }