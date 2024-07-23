import { getServerSession, Session } from "next-auth";
import prisma from "@/db";
import Dashboard from "@/components/Dashboard";

async function getcontactDetails(session: Session | null) {
  if (session) {
    const contacts = await prisma?.contacts.findMany({
      where: {
        user_id: session.user?.email || "",
      },
      select: {
        name: true,
        email: true,
      },
    });
    return contacts;
  } else {
    return null;
  }
}
export default async function Home() {
      const session = await getServerSession();
      const contacts = await getcontactDetails(session);
  return (
    <>
      <Dashboard contacts={contacts} />
    </>
  );
}
