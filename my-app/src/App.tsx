import React, { useState } from 'react';
import './App.css';
import AddContact from './components/addContact';
import BaseModalWrapper from './components/BaseModalWrapper';
import Contacts from './components/Contacts';



function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toogleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }

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
        <button onClick={toogleModal}>Show Modal</button>
        <Contacts contacts={contacts}/>
        <BaseModalWrapper isModalVisible={isModalVisible} onBackDropClick={toogleModal}/>
    </div>
  );
}

export default App;
