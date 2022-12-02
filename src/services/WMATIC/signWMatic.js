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
            waitForReceipt(web3,tx, cb, error);
          }, 3000);
        }
      }
    })
  }

  export const signWMatic = async(value,from,tokenID,provider, callback, error) => {
    console.log('signWMatic ::', value,tokenID,provider)
    try {
            let web3 = new Web3(provider);
            let gasPrice = await getGasPriceFromBlock(web3)
            const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_WRAPPED_MATIC);
            let wei =  web3.utils.toWei(""+value);
            console.log("wei ::",wei)
            let bntokens = web3.utils.toBN(wei)
            const dataTransaction = { from: from,gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null }
            contract.methods.approve(process.env.REACT_APP_EXCHANGE_CRYPTO, bntokens).send(dataTransaction,
            (err,tx)=> {
                if(err) {
                    error(err)
                } else {
                    if(tx) {
                        if(tokenID) {
                          addRequestPending([tokenID],tx).then((success) => {console.log(success)}).catch((error) => { console.log(error)})
                        }
                        localStorage.setItem('approve_amount', ""+bntokens)
                        waitForReceipt(web3,tx,(r)=>{
                          let interval = setInterval(() => {
                            clearInterval(interval)
                          }, 5000)
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
