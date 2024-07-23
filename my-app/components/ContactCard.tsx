// ContactCard Component
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface User {
  name: string;
  email: string;
  clicked: boolean;
  setclicked: () => void;
  setcon : () => void;
}

const ContactCard: React.FC<User> = ({ email, name, clicked, setclicked  , setcon}) => {
  return (
    <div
      onClick={()=> {
        setclicked();
        setcon();

      }}
      className={`flex items-center pl-2 gap-2 h-16 mt-2 hover:bg-slate-600 hover:shadow-inner cursor-pointer ${
        clicked ? "bg-slate-600" : ""
      }`}
    >
      <Avatar>
        <AvatarFallback>{email[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-semibold text-white text-xl">{name}</h1>
        <h3 className="text-xs text-slate-500">{email}</h3>
      </div>
    </div>
  );
};

export default ContactCard;
