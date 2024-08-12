import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';

type Credentials = {
    email: string;
    password: string;
  }

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        
        console.log(credentials);
        // const email = credentials.email as string | undefined;
        // const password = credentials.password as string | undefined;

        // const response = await sql`
        // SELECT * FROM users WHERE email=${email}`;
        // const user = response.rows[0];

        // const passwordCorrect = await compare(
        //   password || '',
        //   user.password
        // );

        // console.log({ passwordCorrect });

        // if (passwordCorrect) {
        //   return {
        //     user_id: user.user_id,
        //     email: user.email,
        //   };
        // }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };