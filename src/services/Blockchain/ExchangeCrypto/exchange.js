import ABI from './ABI.json'
import Web3 from 'web3'
import { getGasPriceFromBlock } from 'services/Blockchain/getGasPriceFromBlock';
import { addRequestPending } from '../addRequestPending';

export const exchange =  async(provider,from,amount,sender,tokenId,position,callback,error) => {
    try {
        let web3 = new Web3(provider);
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_EXCHANGE_CRYPTO);
        let wei = web3.utils.toWei(""+amount);
        let bntokens = web3.utils.toBN(wei)
        let gasPrice = await getGasPriceFromBlock(web3)
        contract.methods.executeExchange(sender,tokenId,position).send(
         { from: from, value: bntokens,gasPrice : gasPrice, maxFeePerGas: null,maxPriorityFeePerGas: null},
         (err,tx)=> {
            if(err) {
                error(err)
            } else {
              if(tx) {
                  addRequestPending(tokenId,tx).then((success) => {console.log(success)}).then((error) => { console.log(error)})
                  callback({ transactionHash : tx})
              }
            }
         }
        )
    } catch (err) {
        error(err)
    }
}