import React, { useState } from 'react';

const Contacts = (props: { contacts: any[]; }) => {
    return(
        <>
            <h1>Contacts</h1>
            <div>
            {props.contacts.map((contact, index) => (
                <div key={index}>{contact.name} with number {contact.phone}</div>
            ))}
        </div>
        </>
    )
}

export default Contacts