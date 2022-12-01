import ABI from './exchangeCardABI.json'
import Web3 from 'web3'
import { getGasPriceFromBlock } from 'services/Blockchain/getGasPriceFromBlock';


export const exchangeCard = async(provider,from,amount,tokensIds,tokenId,timeLive,callback,error) => {
    try {
        let web3 = new Web3(provider);
        let gasPrice = await getGasPriceFromBlock(web3)
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_EXCHANGE_CARD);
        let wei = web3.utils.toWei(""+amount);
        var bntokens = web3.utils.toBN(wei)
        await contract.methods.exchangeOne(tokensIds,tokenId,timeLive).send(
         { from: from, value: bntokens,gasPrice : gasPrice,maxFeePerGas: null,maxPriorityFeePerGas: null},
         (err,tx)=> {
            if(err) {
                console.log('Sing on network error ::', err)
                error(err)
            } else {
                if(tx) {
                  console.log('transactionHash ::', tx)
                  callback({ transactionHash : tx})
                }
            }
         }
        )
    } catch (err) {
        error(err)
    }
}
