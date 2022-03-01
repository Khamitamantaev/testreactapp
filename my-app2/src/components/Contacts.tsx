import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UpdateModal from './modals/update-modal';

const Contacts = (props: { contacts: { id: number, name: string; phone: number; }[], onDeleteClick: any, onUpdateClick:any }) => {

    

    const handleRemoveContact = (id: number) => {
        props.onDeleteClick(id)
    }

    const handleUpdateContact = (contact: { id: number, name: string, phone: number}) => {
      props.onUpdateClick(contact)
    }

    return(
        <>
            <h1>Contacts</h1>
            <div>
           
            {props.contacts.slice().reverse().map((contact) => (
                <div key={contact.id}>
                    <div >Name: {contact.name} with Number: {contact.phone}</div>
                    <Button onClick={() => handleRemoveContact(contact.id)}>Delete Contact</Button>
                    <UpdateModal handleUpdateContact={handleUpdateContact}  contact={contact} ></UpdateModal>
                </div>
            ))}
        </div>
        </>
    )
}

export default Contacts