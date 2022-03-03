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

export default function UpdateModal(props: any) {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({
        id: 0,
        name: '',
        balance: 0
    })

    let walletID: string = props.id

    const CURRENT_VALUE = wallet.getWalletByID(parseInt(walletID))!
    useEffect(() => setValues(CURRENT_VALUE), [open])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
                id: values.id,
                name: values.name,
                balance: values.balance,
                [name]: value
            } as unknown as {
            id: number,
            name: string,
            balance: number,
        })
    }

    const handleCloseClick = () => {
        setOpen(false);
    }

    const handleOpenClick = () => {
        setOpen(true);
        setValues({
            id: 0,
            name: '',
            balance: 0
        })
    }

    const updateContact = () => {
        wallet.updateWallet(values)
         setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleOpenClick}>Update Wallet</Button>
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
                                Обновить кошелек
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
                                label="balance"
                                variant="outlined"
                                name="balance"
                                value={values.balance}
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