import React, { ChangeEvent, useState } from 'react'
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import wallet, { IDebit } from '../../store/wallet';
import { observer } from 'mobx-react-lite';
import { CustomDialog } from '../modals/Dialog';
import { TextField, Typography } from '@mui/material';

const Debit = observer(() => {

    const params = useParams();

    let walletID: string = params.walletId!

    const [wal, setWal] = useState(wallet.getWalletByID(parseInt(walletID)))
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [commentsDirty, setCommentsDirty] = useState(false)
    const [balanceDirty, setBalanceDirty] = useState(false)
    const [commentsError, setCommentsError] = useState('')
    const [balanceError, setBalanceError] = useState('')

    const [values, setValues] = useState({
        id: 0,
        comments: '',
        balance: 0,
        walletId: wal?.id
    } as { id: number, comments: string, balance: number, walletId: number })


    const handleInputCreateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        const re = /^[0-9\b]+$/;
        const reText = /^[a-zA-Z0-9]*$/;
        switch (name) {
            case 'balance':
                if (!re.test(String(value))) {
                    setBalanceError('Некорректный баланс')
                    wallet.setIsDisabled(true)
                } else {
                    setBalanceError('')
                    wallet.setIsDisabled(false)
                }
                break;
            case 'comments':
                if (!reText.test(String(value))) {
                    setCommentsError('Некорректный комментарий')
                    wallet.setIsDisabled(true)
                } else {
                    setCommentsError('')
                    wallet.setIsDisabled(false)
                }
                break;
        }
        console.log(name, value)
        let maxValue;
        if (wallet.debits.length === 0) {
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
            maxValue = Math.max(...wallet.debits.map(debit => debit.id))
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

    const handleInputUpdateChange = (event: ChangeEvent<HTMLInputElement>) => {



        const { name, value } = event.target;

        const re = /^[0-9\b]+$/;
        const reText = /^[a-zA-Z0-9]*$/;
        switch (name) {
            case 'balance':
                if (!re.test(String(value))) {
                    setBalanceError('Некорректный баланс')
                    wallet.setIsDisabled(true)
                } else {
                    setBalanceError('')
                    wallet.setIsDisabled(false)
                }
                break;
            case 'comments':
                if (!reText.test(String(value))) {
                    setCommentsError('Некорректный комментарий')
                    wallet.setIsDisabled(true)
                } else {
                    setCommentsError('')
                    wallet.setIsDisabled(false)
                }
                break;
        }
        setValues({
            id: values.id,
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


    const onClickDeleteDebit = (id: number) => {
        wallet.deleteDebit(id)
        setIsOpenDeleteModal(false)
    }

    const onClickAdddebit = () => {
        wallet.AddDebit(values)
        setIsOpenAddModal(false)
    }

    const onClickUpdatedebit = (id: number) => {
        console.log(values)
        wallet.updateDebit({
            id: id,
            balance: values.balance,
            comments: values.comments,
            walletId: wal?.id!
        })
        setIsOpenUpdateModal(false)
    }

    const handleDialogOpenAdd = () => {
        setIsOpenAddModal(true)
    }

    const handleDialogOpenDelete = (debit: IDebit) => {
        setValues({
            ...debit
        })
        console.log("current: " + JSON.stringify(values))
        setIsOpenDeleteModal(true)
    }

    const handleDialogOpenUpdate = (debit: IDebit) => {
        setValues({
            ...debit
        })
        setIsOpenUpdateModal(true)
    }

    const handleDialogClose = () => {
        setIsOpenAddModal(false)
        setIsOpenDeleteModal(false)
        setIsOpenUpdateModal(false)
    }

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case "balance":
                setBalanceDirty(true)
                break;
            case 'comments':
                setCommentsDirty(true)
                break;
        }
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
                                        <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/debit">debit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile menu, show/hide based on menu state. */}
                </nav>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">debit</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <CustomDialog handleSubmit={onClickAdddebit} isOpen={isOpenAddModal} handleClose={handleDialogClose} title='Add Debit' subtitle={'Добавить расход'} handleOpen={handleDialogOpenAdd} buttontext={'Добавить доход'}>
                            {(balanceDirty && balanceError) && <div style={{ color: 'red' }}>{balanceError}</div>}
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                label="balance"
                                variant="outlined"
                                name="balance"
                                value={values.balance}
                                onChange={handleInputCreateChange}
                                onBlur={(e) => blurHandler(e)}
                            />
                            {(commentsDirty && commentsError) && <div style={{ color: 'red' }}>{commentsError}</div>}
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                label="comments"
                                variant="outlined"
                                name="comments"
                                value={values.comments}
                                onChange={handleInputCreateChange}
                                onBlur={(e) => blurHandler(e)}
                            />
                        </CustomDialog>
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" >
                                {walletID ? wallet.debits.filter(debit => debit.walletId === wal?.id).map(debit =>
                                    <div key={debit.id}>
                                        {debit.balance} comments: {debit.comments} id: {debit.id}
                                        <CustomDialog handleSubmit={() => onClickDeleteDebit(values.id)} isOpen={isOpenDeleteModal} handleClose={handleDialogClose} title='Delete Debit' subtitle={'Удалить доход?'} handleOpen={() => handleDialogOpenDelete(debit)} buttontext={'Удалить доход'}>
                                        </CustomDialog>
                                        <CustomDialog handleSubmit={() => onClickUpdatedebit(values.id)} isOpen={isOpenUpdateModal} handleClose={handleDialogClose} title='Delete Debit' subtitle={'Обновить доход?'} handleOpen={() => handleDialogOpenUpdate(debit)} buttontext={'Обновить доход'}>
                                        {(balanceDirty && balanceError) && <div style={{ color: 'red' }}>{balanceError}</div>}
                                            <TextField
                                                style={{ width: "200px", margin: "5px" }}
                                                type="text"
                                                label="balance"
                                                variant="outlined"
                                                name="balance"
                                                value={values.balance}
                                                onChange={handleInputUpdateChange}
                                                onBlur={(e) => blurHandler(e)}
                                            />
                                               {(balanceDirty && balanceError) && <div style={{ color: 'red' }}>{balanceError}</div>}
                                            <TextField
                                                style={{ width: "200px", margin: "5px" }}
                                                type="text"
                                                label="comments"
                                                variant="outlined"
                                                name="comments"
                                                value={values.comments}
                                                onChange={handleInputUpdateChange}
                                                onBlur={(e) => blurHandler(e)}
                                            />
                                        </CustomDialog>
                                        {/* <UpdatedebitModal id={debit.id}></UpdatedebitModal> */}
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

export default Debit