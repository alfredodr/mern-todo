import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@gmail.com",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const res = await signInWithCredentials({ email, password });

        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.type === "oauth") {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.jwt = jwt.sign(token.user._id, process.env.JWT_SECRET); //adding the token with user id to th session
      return session;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.user = session?.updatedUser;
      } else {
        const user = await getUserByEmail({ email: token?.email });
        token.user = user;
      }
      return token;
    },
  },
  // site: process.env.NEXT_PUBLIC_BACKEND_URL,
};
export default NextAuth(authOptions);

const signInWithOAuth = async ({ account, profile }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/oauth`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account, profile }),
    }
  );
  const data = await res.json();

  // If no error and we have user data, return it
  if (res.ok && data) {
    return data;
  }

  // Return null if user data could not be retrieved
  return null;
};

const getUserByEmail = async ({ email }) => {
  let newJwt = jwt.sign(email, process.env.JWT_SECRET);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${newJwt}`,
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/email`,
    options
  );
  const data = await res.json();

  // If no error and we have user data, return it
  if (res.ok && data) {
    return data;
  }

  // Return null if user data could not be retrieved
  return null;
};

const signInWithCredentials = async ({ email, password }) => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};
