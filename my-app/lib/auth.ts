import Google from "next-auth/providers/google";
import prisma from "@/db";

export const NEXT_AUTH_CONFIG = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {
    async signIn({ account , profile }: { account: any; profile: any }): Promise<boolean> {
      if (account.provider === "google") {
        if(profile.email_verified)
        {
          const user = await prisma.user.findFirst({
            where : {
              email : profile.email
            }
          })
          if(user)
          return true;

          await prisma.user.create({
            data : {
              name : profile.name,
              email : profile.email
            }
           
          })
            return true;
        }
      }
      return false;
    },
    
  },
};