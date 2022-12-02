import ABI from './ABI.json'
import Web3 from 'web3'
import { addRequestPending } from 'services/Blockchain/addRequestPending';
import { getGasPriceFromBlock } from 'services/Blockchain/getGasPriceFromBlock';

    const waitForReceipt = (web3,tx, cb,error) => {
        web3.eth.getTransactionReceipt(tx, function (err, receipt) {
            if (err) {
                error(err);
            } else {
                if (receipt !== null) {
                    if (cb) {
                        cb(receipt);
                    }
                } else {
                    window.setTimeout(function () {
                        waitForReceipt(web3,tx, cb,error);
                    }, 1000);
                }
            }
        })
    }

    export const executeExchange = async(from,value,amount,tokenID,provider, callback, error) => {
        try {
            let web3 = new Web3(provider);
            let gasPrice = await getGasPriceFromBlock(web3)
            const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_EXCHANGE_DIRECT);
            let wei = web3.utils.toWei(""+value);
            let weiBN = web3.utils.toBN(wei)
            wei = web3.utils.toWei(""+amount);
            let amountBN = web3.utils.toBN(wei)
            const dataTransaction = { from: from, value : weiBN, gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null }
            contract.methods.executeExchange(tokenID,amountBN).send(dataTransaction,
                (err,tx)=> {
                    if(err) {
                        error(err)
                    } else {
                        if(tx) {
                            if(tokenID) {
                                addRequestPending([tokenID],tx).then((success) => {console.log(success)}).catch((error) => { console.log(error)})
                            }
                            waitForReceipt(web3,tx,(r)=>{
                                callback(r)
                            },(err) => {
                                error(err)
                            })
                        }
                    }
                }
            )
        } catch (err) {
            error(err)
        }
    }