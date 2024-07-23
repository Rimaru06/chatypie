"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { addcontacts } from '@/app/actions/addcontact'
import { useRouter } from 'next/navigation'

const AddContact = () => {
    const router  = useRouter();
    const [name , setname] = useState('');
    const [email , setemail] = useState('');
    async function handleSumbit(e : any)
    {
        e.preventDefault();
        const response = await addcontacts(name , email);
        if(response.status === 200)
        {
            router.push('/')
        }
        else
        {
            alert(response.message);
        }

    }
  return (
    <div className=" rounded-lg w-80 shadow-xl  border-2 border-slate-300 flex justify-center items-center">
        <form className="flex flex-col gap-3 w-[95%]" onSubmit={handleSumbit} >
            <div className='m-2 flex justify-center items-center'>
                <h1 className='text-2xl font-semibold underline'>Add Your Contacts</h1>
            </div>
          <div className='m-2'>
            <Input onChange={(e) => setname(e.target.value)} className='bg-slate-200' placeholder="Name" />
          </div>
          <div className='m-2'>
            <Input onChange={(e) => setemail(e.target.value)} className='bg-slate-200' placeholder="Email" />
          </div>
          <div className="flex justify-center items-center m-2">
            <Button type="submit">ADD</Button>
          </div>
        </form>
    </div>
  );
}

export default AddContact