import { makeAutoObservable, remove } from "mobx"

export interface IWallet {
    id: number,
    name: string,
    balance: number
}


class Wallet {
    wallets: IWallet[] = [
        {id: 0, name: 'Crypto', balance: 1},
        {id: 1, name: 'SimpleWallet', balance: 10},
        {id: 2, name: 'AnotherWallet', balance: 20}
    ]

    constructor() {
        makeAutoObservable(this)
    }

    AddWallet(wallet: {id: number, name:string, balance: number}) {
        this.wallets.push(wallet)
    }

    consoleWallet(id: number) {
        console.log(`Clicked with id ${id}`)
    }

    deleteWallet(id: number) {
      this.wallets =  this.wallets.filter(wallet => wallet.id !== id)
    }

    getWalletByID(id: number ) {
        const wallet = this.wallets.find(wallet => wallet.id === id)
        return wallet
    }

    
}

export default new Wallet()