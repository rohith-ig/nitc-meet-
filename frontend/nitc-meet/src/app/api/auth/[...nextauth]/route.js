import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect"; // Import the database connection file
import User from "@/models/User"; // Import the User model

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error",   // Custom error page
  },
  callbacks: {
    async signIn({ profile }) {
      if (profile?.email?.endsWith("@nitc.ac.in")) {
        await dbConnect(); // Connect to the database

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          // Create a new user record if not found
          await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });
        }

        return true; // Allow sign-in
      }
      return false; // Deny sign-in for non-NITC emails
    },

    async session({ session, token }) {
      await dbConnect(); // Connect to the database

      // Fetch the user's database record
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id; // Add the user's database ID to the session
        session.user.personality = dbUser.personality || null; // Include personality data
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect users to /videochat after login
      return `${baseUrl}/vidchat`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
