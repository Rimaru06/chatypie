"use server"

import prisma from "@/db"
import { getServerSession } from "next-auth"

export async function assignId(id : string) {
    const session = await getServerSession();

    try {
          await prisma.user.update({
            where: {
              email: session?.user?.email || "",
            },
            data: {
              assign_id: id,
            },
          });
          return { status: 200, message: "id assigned" };  
    } catch (error) {
        return { status: 500, message: "error in assigning the websocket id" }; 
        
    }

}