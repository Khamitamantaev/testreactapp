import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import wallet from '../../store/wallet';
import AddDebitModal from '../../components/modals/add-debit-modal'
import AddCreditModal from '../../components/modals/add-credit-modal'
import { observer } from 'mobx-react-lite'

const WalletPage = observer(() => {

    const params = useParams();

    let walletID: string = params.walletId!

    const [wal, setWal] = useState(wallet.getWalletByID(parseInt(walletID)))

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
                        <h1 className="text-3xl font-bold text-gray-900">Wallet: {wal?.name}</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-blue-100">
                                <AddDebitModal walletId={wal?.id}></AddDebitModal>
                                {wallet.debits.filter(debit => debit.walletId === wal?.id).map(debit =>
                                    <div key={debit.id}>
                                        {debit.balance} comments: {debit.comments}
                                    </div>)}
                            </div>
                            <div className="bg-red-100">
                                <AddCreditModal walletId={wal?.id} ></AddCreditModal>
                                {wallet.credits.filter(credit => credit.walletId === wal?.id).map(credit =>
                                    <div key={credit.id}>
                                        {credit.balance} comments: {credit.comments}
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

export default WalletPage