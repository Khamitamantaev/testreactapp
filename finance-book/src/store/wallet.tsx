import { makeAutoObservable, remove } from "mobx"

export interface IWallet {
    id: number,
    name: string,
    balance: number
}

export interface IDebit {
    id: number,
    comments: string,
    balance: number,
    walletId: number
}

export interface ICredit {
    id: number,
    comments: string,
    balance: number,
    walletId: number
}


class Wallet {

    wallets: IWallet[] = [
        {id: 0, name: 'Crypto', balance: 1},
        {id: 1, name: 'SimpleWallet', balance: 10},
        {id: 2, name: 'AnotherWallet', balance: 20}
    ]

    isDisabled: boolean = false

    debits: IDebit[] = []
    credits: ICredit[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setIsDisabled(value: boolean) {
        this.isDisabled = value
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

    getDebitByID(id: number ) {
        const debit = this.debits.find(debit => debit.id === id)
        return debit
    }

    getCreditByID(id: number ) {
        const credit = this.credits.find(credit => credit.id === id)
        return credit
    }

    updateWallet(walletUpdate: { id: number, name: string, balance: number}) {
        this.wallets[this.wallets.findIndex(wal => wal.id === walletUpdate.id)] = walletUpdate
    }

    AddDebit(debit: IDebit) {
        this.debits.push(debit)
        const objIndex = this.wallets.findIndex(obj => obj.id == debit.walletId);
        this.wallets[objIndex].balance = this.wallets[objIndex].balance + debit.balance
        // console.log('balance into object'+ typeof(this.wallets[objIndex].balance))
        // console.log("balance into debit"+ typeof(debit.balance))
    }

    AddCredit(credit: ICredit) {
        this.credits.push(credit)
        console.log(credit)
        const objIndex = this.wallets.findIndex(obj => obj.id == credit.walletId);
        this.wallets[objIndex].balance = this.wallets[objIndex].balance - credit.balance
        // console.log('balance into object'+ typeof(this.wallets[objIndex].balance))
        // console.log("balance into debit"+ typeof(debit.balance))
    }
    
    deleteDebit(id: number) {
        this.debits =  this.debits.filter(debit => debit.id !== id)
    }

    deleteCredit(id: number) {
        console.log("delete:" + id)
        this.credits =  this.credits.filter(credit => credit.id !== id)
    }

    updateDebit(debitUpdate: { id: number, comments: string, balance: number, walletId: number }) {
        this.debits[this.debits.findIndex(wal => wal.id === debitUpdate.id)] = debitUpdate
    }

    updateCredit(creditUpdate: { id: number, comments: string, balance: number, walletId: number }) {
        this.credits[this.credits.findIndex(wal => wal.id === creditUpdate.id)] = creditUpdate
    }
}

export default new Wallet()