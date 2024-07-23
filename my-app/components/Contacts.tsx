
import React, { Dispatch, SetStateAction, useState } from "react";
import ContactCard from "./ContactCard";

interface Contact {
  name: string;
  email: string;
}

interface ContactsProps {
  contacts: Contact[] | null;
  setcontact: Dispatch<SetStateAction<Contact>>;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, setcontact }) => {
  const [clickedContact, setClickedContact] = useState<string | null>(null);

  return (
    <div className="flex flex-col bg-slate-800 h-full overflow-y-scroll no-scrollbar">
      {contacts?.map((contact) => (
        <ContactCard
          key={contact.email}
          email={contact.email}
          name={contact.name}
          clicked={clickedContact === contact.email}
          setclicked={() => setClickedContact(contact.email)}
          setcon={() => setcontact(contact)}
        />
      ))}
    </div>
  );
};

export default Contacts;
