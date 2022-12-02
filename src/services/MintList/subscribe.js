import { getIfHaveTxt, validateTx } from 'services/User/getIfHaveTxt';
import Web3 from 'web3';
import Contract from './MintList.json';

export const subscribe = async(provider,from) => {
    let web3 = new Web3(provider);
    try {
        return new Promise( (resolve) => {
                getIfHaveTxt(from,'FULL').then(async(result) => {
                    let gasinfo = result.gas_info;
                    if  (!gasinfo)  throw new Error("Error to get gas params")
                    let contract = new web3.eth.Contract(Contract.abi, process.env.REACT_APP_MINT_LIST_ADDRESS)
                    contract.methods.subscribe().send(gasinfo, (error, transaction) => {
                        console.log(error)
                            if (error) {
                                if (error.message) {
                                    resolve({ status : 1034, msg : error.message, type : 0})
                                } else {
                                    throw new Error("Please contact support with the administrator")
                                }
                            }
                            if(transaction) {
                                validateTx(gasinfo['from'],transaction).then(() => {
                                    let intervalValidateTransaction = setInterval(() =>{
                                        getIfHaveTxt(gasinfo['from']).then((result) => {
                                            if (!result.pending) {
                                                console.log('result ::', result)
                                                if (result && result.receipt && result.receipt.transaction) {
                                                    clearInterval(intervalValidateTransaction)
                                                    resolve(result.receipt)
                                                } else {
                                                    clearInterval(intervalValidateTransaction)
                                                    if (error.message) {
                                                        throw new Error(error.message)
                                                    }
                                                    throw new Error("Please contact support with the administrator")
                                                }
                                            }
                                        }).catch((error) => {
                                            clearInterval(intervalValidateTransaction)
                                            if (error && error.message) {
                                                throw new Error(error.message)
                                            }
                                            throw new Error("Please contact support with the administrator")
                                        })
                                    },6000)
                                }).catch((error) => {
                                    if (error.message) {
                                        throw new Error(error.message)
                                    }
                                    throw new Error("Please contact support with the administrator")
                                })
                            }
                    })
            }).catch((error) => {
                if (error.message) {
                    throw new Error(error.message)
                }
                throw new Error("Please contact support with the administrator")
            })
        })
    } catch (error) {
        if (error.message) {
            throw new Error(error.message)
        }
        throw new Error("Please contact support with the administrator")
    }
}
