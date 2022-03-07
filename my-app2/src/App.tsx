import React, { useState, useEffect } from 'react';
import './App.css';
import Contacts from './components/Contacts';
import BasicModal from './components/modals/modal';



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
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    setIsUpdated(false)
  }, [contacts]);


  const onclick = (contactData: { id: number, name: string, phone: number }) => {
    setContacts([...contacts, contactData])
  }

  const onDeleteClick = (id: number) => {
    const newList = contacts.filter((item) => item.id !== id);
    setContacts(newList)
  }

  const onUpdateClick = (contactupdate: { id: number, name: string, phone: number }) => {
    console.log(contactupdate)
    setIsUpdated(true)
    setContacts(
      prev => prev.map(contact => contact.id === contactupdate.id ? 
      { ...contact, 
        name: contactupdate.name, 
        phone: contactupdate.phone 
      } : 
        contact)
    )
  }

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <BasicModal onClick={onclick} contacts={contacts} onUpdateClick={onUpdateClick} />
      <Contacts contacts={contacts} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick}></Contacts>
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
