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
            waitForReceipt(web3,tx, cb);
          }, 1000);
        }
      }
    })
  }

export const safeApproveNFT = async(from,to,provider,callback,error, tokensIds = null) => {
    try {
        let web3 = new Web3(provider);
        let gasPrice = await getGasPriceFromBlock(web3)
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_COLLECTION_ADDRESS_TX);
        console.log('Gas price ::', gasPrice)
        await contract.methods.setApprovalForAll(to,true).send(
         { from: from, gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null },
         (err,tx)=> {
            if(err) {
                error(err)
            } else {
              if(tx) {
                  if(tokensIds) {
                    addRequestPending(tokensIds,tx).then((success) => {console.log(success)}).catch((error) => { console.log(error)})
                  }
                  localStorage.setItem('sign_exchange', ""+true)
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