import React, {useState, useEffect } from 'react';
import './App.css';
import Contacts from './components/Contacts';
import BasicModal from './modal';



function App() {


  

  const testcontacts = [
    {
      id: 0,
      name: "Khamit",
      phone: 123412312311
    },
    {
      id: 1,
      name: "Khamit2",
      phone: 1234123123333
    },
    {
      id: 2,
      name: "Khamit2",
      phone: 123412313323
    },
  ]

  const [id, setId] = useState(testcontacts.length - 1)
  const [contacts, setContacts] = useState(testcontacts)

  useEffect(() => {
    console.log(contacts)
  });

  const onclick = (contactData: { id: number, name: string, phone: number }) => {
    setContacts([...contacts, contactData])
  }

  const onDeleteClick = (id: number) => {
    //  const newContact = contacts.find((contact) => contact.id === id)
     const newList = contacts.filter((item) => item.id !== id);
     setContacts(newList)
  }

  return (
    <div className="App">
        <BasicModal onClick={onclick} contacts={contacts}  />
        <Contacts contacts={contacts} onDeleteClick={onDeleteClick}></Contacts>
    </div>
  );
}

export default App;
