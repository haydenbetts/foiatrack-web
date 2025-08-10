import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: { user: "", pass: "" }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};
