// Route Handler for next-auth Google Authentication

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectMongoDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      // Google id and client secret obtained from Google Cloud project ub-campus-photography
      // https://console.cloud.google.com/
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // define session callback for assigning user's id as the database's ObjectId
    async session({ session }) {
      const user = await User.findOne({
        email: session.user.email,
      });
      session.user.id = user._id.toString();
      return session;
    },
    // define signIn callback for creating a database entry for user
    async signIn({ profile }) {
      try {
        // establish connection to database
        await connectMongoDB();
        // check if user already exists
        const user = await User.findOne({
          email: profile.email,
        });
        // create a new database entry if user does not exist
        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
          });
          // feedback log
          console.log(`User account created: ${profile.email}`);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
