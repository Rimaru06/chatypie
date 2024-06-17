"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [userId , setuserId] = useState("");
  const [wsID, setwsID] = useState("");

  useEffect(() => {
    const newsocket = new WebSocket("ws://localhost:8080");
    newsocket.onopen = () => {
      console.log("Connection established");
      setSocket(newsocket);
    };
    newsocket.onmessage = (msg) => {
   try {
     const message = JSON.parse(msg.data);
     if (message.type === "assign_id") {
       setwsID(message.id);
     } else if (message.type === "message") {
       console.log(message);
     }
   } catch (error) {
     console.error("Error parsing JSON:", msg.data, error);
   }
    };
  }, []);
  return (
    <div>
      <div>
      <input className="border border-black m-2" type="text" onChange={(e) => setInputValue(e.target.value)} placeholder="enter the message" />
      </div>
      <div>
      <input className="border border-black m-2" type="text" onChange={(e) => setuserId(e.target.value)} placeholder="enter the user id" />
      </div>

      <button className=" border border-red-500 m-2" onClick={()=> {
        const message = JSON.stringify({
          type: "send_message",
          content: inputValue,
          targetId: userId,
        });
        socket?.send(message)
      }} >Send</button>

      <div>
        {wsID}
      </div>
    </div>
  );
}
