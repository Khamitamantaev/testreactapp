import React, { useState, useEffect, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import wallet from '../../store/wallet';
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

export default function UpdateDebitModal(props: any) {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({
        id: 0,
        comments: '',
        balance: 0,
        walletId: 0
    })

    let DEBIT_ID: string = props.id

    const CURRENT_VALUE = wallet.getDebitByID(parseInt(DEBIT_ID))!
    
    useEffect(() => setValues(CURRENT_VALUE), [open])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value)
        setValues({
                id: CURRENT_VALUE.id,
                comments: values.comments,
                balance: values.balance,
                walletId: CURRENT_VALUE.walletId,
                [name]: value
            } as unknown as {
            id: number,
            comments: string,
            balance: number,
            walletId: number
        })
    }

    const handleCloseClick = () => {
        setOpen(false);
    }

    const handleOpenClick = () => {
        setOpen(true);
        setValues({
            id: 0,
            comments: '',
            balance: 0,
            walletId: 0
        })
    }

    const updateDebit = () => {
        wallet.updateDebit(values)
         setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleOpenClick}>Update Debit</Button>
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
                                Обновить доход
                            </Typography>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                label="balance"
                                variant="outlined"
                                name="balance"
                                value={values.balance}
                                onChange={handleInputChange}
                                disabled
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
                            <Button onClick={updateDebit} variant="contained" color="primary">
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