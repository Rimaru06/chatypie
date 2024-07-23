"use server"

import prisma from "@/db"
import { getServerSession } from "next-auth"

export async function addcontacts(name : string , email : string) {
    const  session =await getServerSession();

    if(session)
    {
        const user = await prisma.user.findFirst({
            where : {
                email : email
            }
        })

        if(user)
        {
            const contact = await prisma.contacts.findFirst({
                where : {
                    email : email
                }
            })
            if(contact)
                return  { status : 400 , message : "already exist in your contacts"}
            else
            {
                await prisma.contacts.create({
                    data : {
                        name : name,
                        email : email,
                       user_id : session.user?.email || ""
                    }
                })
                return { status : 200 , message : "added succesfully"}
            }
        }
        else
        {
            return { status: 404, message: "user not signup in to our app" };
        }
        
    }
    else
    {
         return { status: 500, message: "you are not logged in" };
    }
    
}