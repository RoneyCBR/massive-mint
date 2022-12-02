import ABI from './exchangeCardABI.json'
import Web3 from 'web3'
import { addRequestPending } from 'services/Blockchain/addRequestPending';
import { getGasPriceFromBlock } from 'services/Blockchain/getGasPriceFromBlock';

export const executeExchangeCard = async(provider,from,amount,sender,tokenId,position,callback,error) => {
    try {
        let web3 = new Web3(provider);
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_EXCHANGE_CARD);
        let wei = web3.utils.toWei(""+amount);
        console.log('wei ::', wei)
        var bntokens = web3.utils.toBN(wei)
        let gasPrice = await getGasPriceFromBlock(web3)
        await contract.methods.executeExchange(sender,tokenId,position).send(
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
