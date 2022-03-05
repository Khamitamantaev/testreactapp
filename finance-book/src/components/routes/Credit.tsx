import React, { ChangeEvent, useState } from 'react'
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import wallet from '../../store/wallet';
import { observer } from 'mobx-react-lite';
import { CustomDialog } from '../modals/Dialog';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';

const Credit = observer(() => {

    const params = useParams();

    let walletID: string = params.walletId!

    const [wal, setWal] = useState(wallet.getWalletByID(parseInt(walletID)))
    const [currentCredit, setCurrentCredit] = useState({
        id: 0
    })
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)

    const [values, setValues] = useState({
        id: 0,
        comments: '',
        balance: 0,
        walletId: wal?.id
    } as { id: number, comments: string, balance: number, walletId: number })


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let maxValue;
        if (wallet.credits.length === 0) {
            maxValue = 0
            setValues({
                id: maxValue + 1,
                comments: values.comments,
                balance: Number(values.balance),
                walletId: wal?.id,
                [name]: value
            } as {
                id: number,
                comments: string,
                balance: number,
                walletId: number
            })
        }
        else {
            maxValue = Math.max(...wallet.credits.map(credit => credit.id))
            setValues({
                id: maxValue + 1,
                comments: values.comments,
                balance: Number(values.balance),
                walletId: wal?.id,
                [name]: value
            } as {
                id: number,
                comments: string,
                balance: number,
                walletId: number
            })
        }
    }
    const onClickDeleteCredit = (id: number) => {
        wallet.deleteCredit(id)
        setIsOpenDeleteModal(false)
    }

    const onClickAddCredit = () => {
        wallet.AddCredit(values)
        setIsOpenAddModal(false)
    }

    const onClickUpdateCredit = (id: number) => {
        wallet.updateCredit({
            id: id,
            comments: values.comments,
            balance: values.balance,
            walletId: values.walletId
        })
        setIsOpenUpdateModal(false)
    }

    const handleDialogOpenAdd = () => {
        setIsOpenAddModal(true)
    }

    const handleDialogOpenDelete = (id: number) => {
        setCurrentCredit({
            id: id
        })
        console.log("current: " + JSON.stringify(currentCredit))
        setIsOpenDeleteModal(true)
    }

    const handleDialogOpenUpdate = (id: number) => {
        setCurrentCredit({
            id: id
        })
        setIsOpenUpdateModal(true)
    }

    const handleDialogClose = () => {
        setIsOpenAddModal(false)
        setIsOpenDeleteModal(false)
        setIsOpenUpdateModal(false)
    }


    return (
        <>
            <div className="min-h-full">
                <nav className="bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img src={logo} className="h-8 w-8" alt="logo" />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/">WalletList</Link>
                                        <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/wallet">Wallet</Link>
                                        <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/debit">Debit</Link>
                                        <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/credit">Credit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile menu, show/hide based on menu state. */}
                </nav>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Credit</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <CustomDialog handleSubmit={onClickAddCredit} isOpen={isOpenAddModal} handleClose={handleDialogClose} title='Add Credit' subtitle={'Добавить расход'} handleOpen={handleDialogOpenAdd} buttontext={'Добавить расход'}>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                label="balance"
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
                        </CustomDialog>
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" >
                                {walletID ? wallet.credits.filter(credit => credit.walletId === wal?.id).map(credit =>
                                    <div key={credit.id}>
                                        {credit.balance} comments: {credit.comments} id: {credit.id}
                                        <CustomDialog handleSubmit={() => onClickDeleteCredit(currentCredit.id)} isOpen={isOpenDeleteModal} handleClose={handleDialogClose} title='Delete Credit' subtitle={'Удалить расход?'} handleOpen={() => handleDialogOpenDelete(credit.id)} buttontext={'Удалить расход'}>
                                        </CustomDialog>
                                        <CustomDialog handleSubmit={() => onClickUpdateCredit(currentCredit.id)} isOpen={isOpenUpdateModal} handleClose={handleDialogClose} title='Delete Credit' subtitle={'Обновить расход?'} handleOpen={() => handleDialogOpenUpdate(credit.id)} buttontext={'Обновить расход'}>
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
                                        </CustomDialog>
                                        {/* <UpdateCreditModal id={credit.id}></UpdateCreditModal> */}
                                    </div>) : null}
                            </div>
                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>
        </>
    )
})

export default Credit