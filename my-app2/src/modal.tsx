import React, { useState,ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

interface IContact {
    name: string,
    phone: number
  }
  

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = useState({
        name: '',
        phone: 0
    })
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        } as any)
        console.log(values)
      }
    
    
    const onClick = () => {
        props.onClick(values)
        handleClose()
        setValues({
            name: '',
            phone: 0
        })
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add Contact</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}  columns={{  }}>
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
                            <Button onClick={handleClose} variant="contained" color="primary">
                                Отмена
                            </Button>
                        </Grid>
                    </Grid>


                </Box>
            </Modal>
        </div >
    );
}