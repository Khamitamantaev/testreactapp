import React from 'react'
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import {observer} from 'mobx-react-lite'
import wallet from '../store/wallet';

const WalletList = observer(() => {
    return (
        <>
            <div className="min-h-full">
                <nav className="bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                <img src={logo}  className="h-8 w-8" alt="logo" />
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
                        <button>Добавить кошелек</button>
                    </div>
                    <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" >
                                {wallet.wallets.map(wal => 
                                <div className='mt-4 ml-4' key={wal.id} >
                                    {wal.name + "      "} 
                                    {wal.balance}
                                    <button onClick={() => wallet.consoleWallet(wal.id)}>Редактировать</button>
                                    <button onClick={() => wallet.deleteWallet(wal.id)}>Удалить</button>
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