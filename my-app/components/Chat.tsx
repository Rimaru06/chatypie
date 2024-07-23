import { PhoneCall, Send, VideoIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import getid from "@/app/actions/getid";

export default function Chats({
  name,
  email,
  socket,
  message,
}: {
  name: string;
  email: string;
  socket: WebSocket | null;
  message: string[];
}) {
  const [wsID, setID] = useState("");
  const [value, setvalue] = useState("");
  const [sendmessage , setsendmessages] = useState<string[]>([])

  useEffect(() => {
    async function fetchID() {
      const id = await getid(email);
      setID(id as string);
    }
    fetchID();
  }, [email]);

  return (
    <>
      <div className="flex flex-col h-full justify-between w-full ">
        <div className="bg-slate-800 flex justify-between shadow-md items-center h-[10%]">
          <div className="pl-4 h-16 flex justify-center items-center">
            <h1 className="text-2xl text-white">{name}</h1>
          </div>
          <div className="flex items-center gap-5 border-2 rounded-md border-black mr-4 h-[80%]">
            <div className="cursor-pointer p-2">
              <VideoIcon className="text-white" />
            </div>
            <div className="bg-black h-4 w-[0.10rem]"></div>
            <div className="cursor-pointer p-2">
              <PhoneCall className="text-white" />
            </div>
          </div>
        </div>

        <div className="h-[82%] bg-slate-500 flex  justify-between overflow-y-scroll no-scrollbar">
          <div>
            {message.map((msg) => {
              return <div>{msg}</div>;
            })}
          </div>
          <div>
            
            {sendmessage.map((msg) => {
              return <div>{msg}</div>;
            })}
          </div>
        </div>

        <div className="w-full flex gap-2 h-[8%] shadow-2xl bg-slate-800 items-center ">
          <div className="w-[96%] h-full ">
            <Input
              onChange={(e) => setvalue(e.target.value)}
              className="w-full h-full bg-transparent border-none text-white "
              placeholder="Type a message"
            />
          </div>
          <Button
            onClick={() => {
              const message = JSON.stringify({
                type: "send_message",
                content: value,
                targetId: wsID,
              });
              setsendmessages((prevmsg) => [...prevmsg, value]);
              socket?.send(message);
            }}
            className="w-[4%] flex justify-center items-center cursor-pointer "
          >
            <Send className="hover:animate-bounce" />
          </Button>
        </div>
      </div>
    </>
  );
}
