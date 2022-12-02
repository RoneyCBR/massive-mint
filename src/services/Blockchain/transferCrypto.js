import Web3 from 'web3'
import { addRequestPending } from 'services/Blockchain/addRequestPending';
import { getGasPriceFromBlock } from 'services/Blockchain/getGasPriceFromBlock';

export const transferCrypto = async(from,to,value,tokenID,provider,callback,error) => {
    try {
        let web3 = new Web3(provider);
        let gasPrice = await getGasPriceFromBlock(web3)
        let wei = web3.utils.toWei(""+value);
        value = web3.utils.toBN(wei)
        const dataTransaction = { from: from, to : to,value : value, gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null }
        await web3.eth.sendTransaction(dataTransaction,
          ( err,tx)=> {
                if(err) {
                    error(err.message)
                } else {
                    if(tx) {
                        if(tokenID) {
                            addRequestPending([tokenID],tx).then((success) => {console.log(success)}).catch((error) => { console.log(error)})
                        }
                        localStorage.setItem('sign_exchange', ""+true)
                        callback(tx)
                        //waitForReceipt(web3,tx,(r)=>{
                        //    callback(r)
                        //},(err) => {
                        //    error(err)
                        //})
                    }
                }
            }
        )
    } catch (err) {
      console.log("error transferCrypto",err)
      error(err.message)
    }
}