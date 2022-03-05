import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'

type CustomDialogTypes = {
    isOpen: boolean,
    handleOpen: any,
    handleClose: any,
    title: string,
    subtitle: string,
    children: React.ReactNode,
    buttontext: string,
    handleSubmit: any
}


export const CustomDialog = ({
    isOpen ,
    handleOpen,
    handleClose,
    title,
    subtitle,
    children,
    buttontext,
    handleSubmit
}: CustomDialogTypes ) => 

{
    return(
        <>
            <Button onClick={handleOpen}>{buttontext}</Button>
            <Dialog
                fullWidth
                maxWidth='md'
                open={isOpen}
                onClose={handleClose}
                aria-labelledby='max-width-dialog-title'
            >
                <DialogTitle id='max-width-dialog-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{subtitle}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color='primary'>Submit</Button>
                    <Button onClick={handleClose} color='primary'>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

