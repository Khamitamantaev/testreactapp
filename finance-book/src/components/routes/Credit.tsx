import React, { ChangeEvent, useState } from 'react'
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import wallet, { ICredit } from '../../store/wallet';
import { observer } from 'mobx-react-lite';
import { CustomDialog } from '../modals/Dialog';
import { TextField, Typography } from '@mui/material';

const Credit = observer(() => {
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
        console.log(name, value)
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


    const onClickDeleteCredit = (id: number) => {
        wallet.deleteCredit(id)
        setIsOpenDeleteModal(false)
    }

    const onClickAddCredit = () => {
        wallet.AddCredit(values)
        setValues({
            id: 0,
            comments: '',
            balance: 0,
            walletId: wal?.id!,
        })
        setIsOpenAddModal(false)
    }

    const onClickUpdateCredit = (id: number) => {
        console.log(values)
        wallet.updateCredit({
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

    const handleDialogOpenDelete = (credit: ICredit) => {
        setValues({
            ...credit
        })
        console.log("current: " + JSON.stringify(values))
        setIsOpenDeleteModal(true)
    }

    const handleDialogOpenUpdate = (credit: ICredit) => {
        setValues({
            ...credit
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
                                {walletID ? wallet.credits.filter(credit => credit.walletId === wal?.id).map(credit =>
                                    <div key={credit.id}>
                                        {credit.balance} comments: {credit.comments} id: {credit.id}
                                        <CustomDialog handleSubmit={() => onClickDeleteCredit(values.id)} isOpen={isOpenDeleteModal} handleClose={handleDialogClose} title='Delete Credit' subtitle={'Удалить расход?'} handleOpen={() => handleDialogOpenDelete(credit)} buttontext={'Удалить расход'}>
                                        </CustomDialog>
                                        <CustomDialog handleSubmit={() => onClickUpdateCredit(values.id)} isOpen={isOpenUpdateModal} handleClose={handleDialogClose} title='Delete Credit' subtitle={'Обновить расход?'} handleOpen={() => handleDialogOpenUpdate(credit)} buttontext={'Обновить расход'}>
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
                                            {(commentsDirty && commentsError) && <div style={{ color: 'red' }}>{commentsError}</div>}
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