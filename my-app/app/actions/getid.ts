"use server"
import prisma from "@/db";
import { getServerSession } from "next-auth";

export default async function getid(email : string)
{
    const session = await getServerSession();

    const userid = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select : {
        assign_id : true
      }

    });

    return userid?.assign_id;

}
