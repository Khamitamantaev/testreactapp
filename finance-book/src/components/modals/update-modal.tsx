import React, { useState, useEffect, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UpdateModal(props: any) {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({
        id: 0,
        name: '',
        phone: 0
    })

    useEffect(() => {
        setValues(props.contact)
        // console.log(props.contact)
    }, [open]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            id: values.id,
            name: values.name,
            phone: values.phone,
            [name]: value
        } as {
            id: number,
            name: string,
            phone: number,
        })
        // console.log(value)
    }

    const handleCloseClick = () => {
        setOpen(false);
        setValues({
            id: 0,
            name: '',
            phone: 0
        })
    }

    const handleOpenClick = () => {
        setOpen(true);
        setValues({
            id: 0,
            name: '',
            phone: 0
        })
    }

    const updateContact = () => {
         props.handleUpdateContact(values)
         setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleOpenClick}>Update Contact</Button>
            <Modal
                open={open}
                onClose={handleCloseClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2} columns={{}}>
                        <Grid item xs={6}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Обновить контакт
                            </Typography>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                label="name"
                                variant="outlined"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                            />
                            <br />
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                label="phone"
                                variant="outlined"
                                name="phone"
                                value={values.phone}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={updateContact} variant="contained" color="primary">
                                Обновить
                            </Button>
                            <Button onClick={handleCloseClick} variant="contained" color="primary">
                                Отмена
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}