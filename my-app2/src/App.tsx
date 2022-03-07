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


  const onclick = (contactData: { id: number, name: string, phone: number }) => {
    setContacts([...contacts, contactData])
    const data = { name: contactData.name, phone: contactData.phone };
    fetch('http://localhost:3001/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    setIsUpdated(true)
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
        {
          ...contact,
          name: contactupdate.name,
          phone: contactupdate.phone
        } :
        contact)
    )
  }

  const [data, setData] = React.useState<{id: number, name: string, phone: string}[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/contacts")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <BasicModal onClick={onclick} contacts={contacts} onUpdateClick={onUpdateClick} />
      <Contacts contacts={contacts} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick}></Contacts>
      <div>Data from server</div>
      <div>{!data ? "Loading..." : data.map(contact => (<div key={contact.id}>Name: {contact.name} with id: {contact.id}</div>))}</div>
    </div>
  );
}

export default App;
