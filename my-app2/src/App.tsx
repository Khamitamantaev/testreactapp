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

  const [contacts, setContacts] = useState(testcontacts)

  useEffect(() => {
    console.log(contacts)
  });

  const onclick = (contactData: { id: number, name: string, phone: number }) => {
    setContacts([...contacts, contactData])
  }

  const onDeleteClick = (id: number) => {
     const newList = contacts.filter((item) => item.id !== id);
     setContacts(newList)
  }
  const onUpdateClick = (id: number) => {
     const updatedContact = contacts.find((contact) => contact.id === id)
     console.log(updatedContact)
  }

  return (
    <div className="App">
        <BasicModal onClick={onclick} contacts={contacts} onUpdateClick={onUpdateClick} />
        <Contacts contacts={contacts} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick}></Contacts>
    </div>
  );
}

export default App;
