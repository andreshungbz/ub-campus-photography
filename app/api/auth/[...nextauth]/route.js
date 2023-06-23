import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectMongoDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await User.findOne({
        email: session.user.email,
      });
      session.user.id = user._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectMongoDB();
        // check if user already exists
        const user = await User.findOne({
          email: profile.email,
        });
        // if not create new user
        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
          });
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
