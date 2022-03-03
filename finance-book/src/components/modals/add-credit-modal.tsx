import React, { useState, ChangeEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import wallet from '../../store/wallet';
import { number } from 'yargs';

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



export default function AddModal(props: any) {
    const [open, setOpen] = React.useState(false);

    const [values, setValues] = useState({
        id: 0,
        comments: '',
        balance: 0,
        walletId: props.walletId
    } as {id: number, comments: string, balance: number, walletId: number})

    const handleCloseClick = () => {
        setOpen(false);
        // setValues({
        //     id: 0,
        //     name: '',
        //     balance: 0
        // })
    }

    const handleOpenClick = () => {
        setOpen(true);  
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            id: wallet.credits.length,
            comments: values.comments,
            balance:  Number(values.balance),
            walletId: props.walletId,
            [name]: value
        } as {
            id: number,
            comments: string,
            balance: number,
            walletId: number
        })
    }


    const onClick = () => {
        console.log(typeof(values.balance))
        wallet.AddCredit(values)
        handleCloseClick()
        setValues({
            id: 0,
            comments: '',
            balance: 0,
            walletId: 0
        })
    }

    return (
        <div>
            <Button onClick={handleOpenClick}>Добавить расход</Button>
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
                                Добавить расход
                            </Typography>
                            <br />
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                label="credit"
                                variant="outlined"
                                name="balance"
                                value={values.balance}
                                onChange={handleInputChange}
                            />
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                label="comments"
                                variant="outlined"
                                name="comments"
                                value={values.comments}
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