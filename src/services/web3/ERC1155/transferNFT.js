import ABI from './ABI.json'
import Web3 from 'web3'
import { getGasPriceFromBlock } from 'services/Blockchain/getGasPriceFromBlock';
import { addRequestPending } from 'services/Blockchain/addRequestPending';
const waitForReceipt = (web3,tx, cb,error) => {
    web3.eth.getTransactionReceipt(tx, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        if (cb) {
          cb(receipt);
        }
      } else {
        window.setTimeout(function () {
          waitForReceipt(web3,tx, cb);
        }, 1000);
      }
    })
  }

export const safeTransferNFT = async(from,projectKey,to,provider,tokenId,callback,error) => {
    try {
        console.log(from,to,provider,tokenId,callback,error)
        let web3 = new Web3(provider);
        let gasPrice = await getGasPriceFromBlock(web3)
        const contract = new web3.eth.Contract(ABI,projectKey);
        await contract.methods.safeTransferFrom(from,to,tokenId,1,"0x0").send(
          { from: from ,gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null },
         (err,tx)=> {
            if(err) {
                error(err)
            }
            if(tx) {
                addRequestPending([tokenId],tx).then((success) => {console.log(success)}).catch((error) => { console.log(error)})
                waitForReceipt(web3,tx,(r)=>{
                    callback(r)
                },(err) => {
                    error(err)
                })
            }
         }
        )
    } catch (err) {
        error(err)
    }
}