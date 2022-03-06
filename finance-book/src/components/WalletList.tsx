import React, { ChangeEvent, useState } from 'react'
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite'
import wallet, { IWallet } from '../store/wallet';
import Button from '@mui/material/Button';
import { CustomDialog } from './modals/Dialog';
import TextField from '@mui/material/TextField';
const WalletList = observer(() => {

    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [values, setValues] = useState({
        id: 0,
        name: '',
        balance: 0
    })

    const handleCloseClick = () => {
        setIsOpenAddModal(false);
        setIsOpenDeleteModal(false)
        setIsOpenUpdateModal(false)
        setValues({
            id: 0,
            name: '',
            balance: 0
        })
    }

    const handleOpenAddClick = () => {
        setIsOpenAddModal(true);
        setValues({
            id: 0,
            name: '',
            balance: 0
        })
    }

    const handleInputUpdateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value)
        setValues({
            id: values.id,
            name: values.name,
            balance: Number(values.balance),
            [name]: value
        } as {
            id: number,
            name: string,
            balance: number,
        })
    }



    const handleInputCreateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value)
        let maxValue;
        if (wallet.wallets.length === 0) {
            maxValue = 0
            setValues({
                id: maxValue + 1,
                name: values.name,
                balance: Number(values.balance),
                [name]: value
            } as {
                id: number,
                name: string,
                balance: number,
            })
        }
        else {
            maxValue = Math.max(...wallet.wallets.map(wallet => wallet.id))
            setValues({
                id: maxValue + 1,
                name: values.name,
                balance: Number(values.balance),
                [name]: value
            } as {
                id: number,
                name: string,
                balance: number,
            })
        }
    }


    const onClick = () => {
        wallet.AddWallet(values)
        console.log(values)
        handleCloseClick()
        setValues({
            id: 0,
            name: '',
            balance: 0
        })
    }

    const onClickUpdateWallet = (id: number) => {
        console.log(values)
        wallet.updateWallet({
            id: id,
            name: values.name,
            balance: values.balance,
        })
        setIsOpenUpdateModal(false)
    }

    const handleDialogOpenDelete = (wallet: IWallet) => {
        setValues({
            ...wallet
        })
        console.log("current: " + JSON.stringify(values))
        setIsOpenDeleteModal(true)
    }

    const handleDialogOpenUpdate = (wallet: IWallet) => {
        setValues({
            ...wallet
        })
        setIsOpenUpdateModal(true)
    }


    const onClickDeleteWallet = (id: number) => {
        console.log(id)
        wallet.deleteWallet(id)
        setIsOpenDeleteModal(false)
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
                                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
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
                        <h1 className="text-3xl font-bold text-gray-900">Wallet List</h1>
                    </div>
                </header>
                <main>
                    <div className='mx-auto py-4 sm:px-6 lg:px-10'>
                        <CustomDialog handleSubmit={onClick} isOpen={isOpenAddModal} handleClose={handleCloseClick} title='Add Wallet' subtitle={'Добавить кошелек'} handleOpen={handleOpenAddClick} buttontext={'Добавить кошелек'}>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                label="name"
                                variant="outlined"
                                name="name"
                                value={values.name}
                                onChange={handleInputCreateChange}
                            />
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                label="balance"
                                variant="outlined"
                                name="balance"
                                value={values.balance}
                                onChange={handleInputCreateChange}
                            />
                        </CustomDialog>
                        {/* <BasicModal /> */}
                    </div>
                    <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-120" >
                                {wallet.wallets.slice().reverse().map(wal =>
                                    <div className=' ml-2 border border-' key={wal.id} >
                                        <Button >
                                            <Link
                                                style={{ display: "block", margin: "1rem 0" }}
                                                to={`/wallet/${wal.id}`}
                                                key={wal.id}
                                            >
                                                <div className='border'>
                                                    {wal.name} with balance: {wal.balance}
                                                </div>
                                            </Link>
                                        </Button>
                                        <CustomDialog handleSubmit={() => onClickDeleteWallet(values.id)} isOpen={isOpenDeleteModal} handleClose={handleCloseClick} title='Delete Wallet' subtitle={'Удалить кошелек?'} handleOpen={() => handleDialogOpenDelete(wal)} buttontext={'Удалить кошелек'} >
                                        </CustomDialog>
                                        <CustomDialog handleSubmit={() => onClickUpdateWallet(values.id)} isOpen={isOpenUpdateModal} handleClose={handleCloseClick} title='Delete Wallet' subtitle={'Обновить кошелек?'} handleOpen={() => handleDialogOpenUpdate(wal)} buttontext={'Обновить кошелек'}>
                                        <TextField
                                                style={{ width: "200px", margin: "5px" }}
                                                type="text"
                                                label="name"
                                                variant="outlined"
                                                name="name"
                                                value={values.name}
                                                onChange={handleInputUpdateChange}
                                            />
                                            <TextField
                                                style={{ width: "200px", margin: "5px" }}
                                                type="text"
                                                label="balance"
                                                variant="outlined"
                                                name="balance"
                                                value={values.balance}
                                                onChange={handleInputUpdateChange}
                                                disabled
                                            />
                                            
                                        </CustomDialog>

                                    </div>)}
                            </div>
                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>
        </>
    )
})

export default WalletList
