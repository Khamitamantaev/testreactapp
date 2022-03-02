import {makeAutoObservable, makeObservable } from 'mobx'


export interface Wallet {
    id: number,
    name: string,
    balance: number
}

const removeWallet = (wallets: Wallet[], id: number): Wallet[] => wallets.filter((todo) => todo.id === id)
const addWallet = (wallets: Wallet[], name: string, balance: number): Wallet[] => [
    ...wallets,
    {
        id: wallets.length,
        name: name,
        balance: balance
    }
]

class Store {
    
    wallets: Wallet[] = []
    wallet: Wallet = {
        id: 0,
        name: '',
        balance: 0
    }

    constructor(){
        makeAutoObservable(this)
    }

    addWallet(id: number){
       console.log(id)
    }
}
const store = new Store()
export default store
