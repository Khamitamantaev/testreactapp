import React, { useState } from 'react';
import './App.css';
import AddContact from './components/addContact';
import Contacts from './components/Contacts';



function App() {

  const testcontacts = [
    {
      name : "Khamit",
      phone: 89006430971
    },
    {
      name : "Azamat",
      phone: 8902430971
    }
  ]

  const [contacts, setContacts] = useState(testcontacts)

  return (
    <div className="App">
        <AddContact/>
        <Contacts contacts={contacts}/>
    </div>
  );
}

export default App;
