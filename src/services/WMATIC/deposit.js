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

  export const deposit = (from,value,tokenID,provider) => {
    console.log('deposit ::', from,value,tokenID,provider)
    return new Promise((resolve,reject) => {
      try {
          let web3 = new Web3(provider);
          let gasPrice = resolve(getGasPriceFromBlock(web3))
          const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_WRAPPED_MATIC);
          let wei = web3.utils.toWei(""+value);
          consle.log("wei ::",wei)
          let bntokens = web3.utils.toBN(wei)
          const dataTransaction = { from: from, value : bntokens, gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null }
          resolve(contract.methods.deposit().send(dataTransaction,
            (err,tx)=> {
                if(err) {
                  reject(err)
                } else {
                    if(tx) {
                        if(tokenID) {
                          addRequestPending([tokenID],tx).then((success) => {console.log(success)}).catch((error) => { console.log(error)})
                        }
                        localStorage.setItem('sign_exchange', ""+true)
                        waitForReceipt(web3,tx,(r)=>{
                          resolve(r)
                        },(err) => {
                          reject(err)
                        })
                    }
                }
            }
          ))
      } catch (err) {
        reject(err)
      }
    })
  }