"use client"
import React from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { signIn , signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'




const Appbar = () => {
    const session = useSession();
    const router  = useRouter();

  
  return (
    <div className="flex bg-black justify-between items-center p-5">
      <div className="text-white font-bold cursor-pointer">
        <Link href={"/"}>VIDEO+CHAT</Link>
      </div>
      <div className="flex gap-8">
        <div>
          <Button onClick={() => router.push('/addContact')}  >
            ADD CONTACT
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              session ? signOut() : signIn();
            }}
          >
            {session ? "LOGOUT" : "LOGIN"}
          </Button>
        </div>
        <div>
          <Avatar>
            <AvatarImage src={session.data?.user?.image || ""} />
            <AvatarFallback>
              {session.data?.user?.name ? session.data.user.name[0] : "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default Appbar