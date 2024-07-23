"use server";

import prisma from "@/db";
import { getServerSession } from "next-auth";

export async function deassignId() {
  const session = await getServerSession();

  try {
    await prisma.user.update({
      where: {
        email: session?.user?.email || "",
      },
      data: {
        assign_id: null,
      },
    });
    return { status: 200, message: "id deleted" };
  } catch (error) {
    return { status: 500, message: "error in delteting the id" };
  }
}
