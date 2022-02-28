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

  return (
    <div className="App">
      <BasicModal/>
        <Contacts contacts={contacts}></Contacts>
        
    </div>
  );
}

export default App;
