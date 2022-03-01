import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Contacts = (props: { contacts: any[]; }) => {
    return(
        <>
            <h1>Contacts</h1>
            <div>
            
            {props.contacts.slice().reverse().map((contact, index) => (
                <div key={index} >
                    <div >Name: {contact.name} with Number: {contact.phone}</div>
                    <Button>Delete Contact</Button>
                    <Button>Update Contact</Button>
                </div>
            ))}
        </div>
        </>
    )
}

export default Contacts