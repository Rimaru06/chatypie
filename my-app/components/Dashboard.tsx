"use client";
import { useEffect, useState } from "react";
import Contacts from "./Contacts";
import Chats from "./Chat";
import { assignId } from "@/app/actions/assignId";
import { deassignId } from "@/app/actions/deassignId";

export default function Dashboard({
  contacts,
}: {
  contacts:
    | {
        name: string;
        email: string;
      }[]
    | null;
}) {
  const [contact, setcontact] = useState({
    name: "",
    email: "",
  });
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message , setmessage] = useState<string []>([])
useEffect(() => {
  const newSocket = new WebSocket("ws://localhost:8080");
  newSocket.onopen = () => {
    console.log("Connection established");
    setSocket(newSocket);
  };
  newSocket.onmessage = async (msg) => {
    try {
      const message = JSON.parse(msg.data);
      if (message.type === "assign_id") {
        console.log(message.id);
        const response = await assignId(message.id);
        console.log(response.message);
      } else if (message.type = 'message')
      {
        setmessage(prevmessage => [...prevmessage , message.content]);
      }
    } catch (error) {
      console.error("Error parsing JSON:", msg.data, error);
    }
  };
  newSocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
  newSocket.onclose = async () => {
    await deassignId();
  };
  return () => {
    newSocket.close();
  };
}, []);
  return (
    <>
      <div className="flex h-[89vh]">
        <div className="w-[20%] h-full border-r-2 border-black ">
          <Contacts contacts={contacts} setcontact={setcontact} />
        </div>
        <div
          className={`w-[80%] ${
            contact.email === "" ? "flex justify-center items-center" : ""
          } h-full`}
        >
          {contact.email !== "" ? (
            <Chats name={contact.name} email={contact.email} socket={socket}  message={message}/>
          ) : (
            "not chats yet"
          )}
        </div>
      </div>
    </>
  );
}
