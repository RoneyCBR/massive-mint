import ABI from './ABI.json'
import Web3 from 'web3'
import { getGasPriceFromBlock } from 'services/Blockchain/getGasPriceFromBlock';


export const request = async(provider,from,wMatic,amount,offers,tokenID,timeLive,position,callback,error) => {
    console.log('isamount::', offers, amount)
    try {
        let web3 = new Web3(provider);
        let gasPrice = await getGasPriceFromBlock(web3)
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_EXCHANGE_CRYPTO);
        let wei = web3.utils.toWei(""+amount);
        let value = web3.utils.toBN(wei)
        wei = web3.utils.toWei(""+wMatic);
        let maticOffer = web3.utils.toBN(wei)
        console.log('maticOffer::',maticOffer);
        const dataTransaction = {from: from, value: value,gasPrice : gasPrice,maxFeePerGas: null,maxPriorityFeePerGas: null}
        console.log('maticOffer::', dataTransaction.value);
        contract.methods.exchangeOne(offers,maticOffer,tokenID,timeLive,position).send(dataTransaction,
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
        console.log('error request::', err);
        error(err)
    }
}
