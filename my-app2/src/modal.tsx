import React, { useState, ChangeEvent } from 'react';
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



export default function BasicModal(props: any) {
    const [open, setOpen] = React.useState(false);

    const [values, setValues] = useState({
        id: 0,
        name: '',
        phone: 0
    })

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

   

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            id: props.contacts.length,
            name: values.name,
            phone: values.phone,
            [name]: value
        } as {
            id: number,
            name: string,
            phone: number,
        })
        console.log(values)
    }


    const onClick = () => {
        props.onClick(values)
        handleCloseClick()
        setValues({
            id: 0,
            name: '',
            phone: 0
        })
    }

    return (
        <div>
            <Button onClick={handleOpenClick}>Add Contact</Button>
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
                                Добавить контакт
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
                            <Button onClick={onClick} variant="contained" color="primary">
                                Добавить
                            </Button>
                            <Button onClick={handleCloseClick} variant="contained" color="primary">
                                Отмена
                            </Button>
                        </Grid>
                    </Grid>


                </Box>
            </Modal>
        </div >
    );
}