import ABI from './ABI.json'
import Web3 from 'web3'
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

export const approveERC20Native = async(amount,from,provider,callback,error) => {
    try {
        let web3 = new Web3(provider);
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_ERC_20_CONTRACT);
        let wei = web3.utils.toWei(""+amount);
        console.log("wei to approbe matic ::", wei)
        await contract.methods.approve(process.env.REACT_APP_VERIFY_CONTRACT,wei).send(
         { from: from},
         (err,tx)=> {
            if(err) {
                error(err)
            }
            if(tx) {
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