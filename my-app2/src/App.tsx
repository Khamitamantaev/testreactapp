import React, {useState} from 'react';
import './App.css';
import Contacts from './components/Contacts';
import BasicModal from './modal';



function App() {

  const testcontacts = [
    {
      name: "Khamit",
      phone: 123412312311
    },
    {
      name: "Khamit2",
      phone: 1234123123333
    },
    {
      name: "Khamit2",
      phone: 123412313323
    },
  ]

  
  const [contacts, setContacts] = useState(testcontacts)

  const onclick = (contactData: { name: string, phone: number }) => {
    setContacts([...contacts, contactData])
}

  return (
    <div className="App">
        <BasicModal onClick={onclick}  />
        <Contacts contacts={contacts}></Contacts>
    </div>
  );
}

export default App;
