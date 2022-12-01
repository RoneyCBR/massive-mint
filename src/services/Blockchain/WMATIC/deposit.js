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

  export const deposit = async(from,value,tokenID,provider, callback, error) => {
    console.log(from,value,tokenID)
    //return new Promise((resolve,reject) => {
      try {
          //resolve(provider.request({ method: 'eth_requestAccounts' }))
          let web3 = new Web3(provider);
          let gasPrice = await getGasPriceFromBlock(web3)
          const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_WRAPPED_MATIC);
          let wei = web3.utils.toWei(""+value);
          let bntokens = web3.utils.toBN(wei)
          const dataTransaction = { from: from, value : bntokens, gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null }
          contract.methods.deposit().send(dataTransaction,
            (err,tx)=> {
              if(err) {
                error(err)
              } else {
                if(tx) {
                  if(tokenID) {
                    addRequestPending([tokenID],tx).then((success) => {console.log(success)}).catch((error) => { console.log(error)})
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
    //})
  }

/* export const deposit = async(from,value,tokenID,provider) => {
  return new Promise((resolve,error) => {
    try {
        let web3 = new Web3(provider);
        let gasPrice = await getGasPriceFromBlock(web3)
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_WRAPPED_MATIC);
        let wei = web3.utils.toWei(""+value);
        let bntokens = web3.utils.toBN(wei)
        const dataTransaction = { from: from, value : bntokens, gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null }
        await contract.methods.deposit().send(dataTransaction,
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
        )
    } catch (err) {
      reject(err)
    }
  }) */
