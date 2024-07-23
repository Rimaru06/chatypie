import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import NextAuth from "next-auth";
//@ts-ignore
export const handler = NextAuth(NEXT_AUTH_CONFIG);

export { handler as GET, handler as POST };
