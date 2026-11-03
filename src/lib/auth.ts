import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
   },
   socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,       
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,    
     // clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as String,      // TypeScript
    },
  },
});
