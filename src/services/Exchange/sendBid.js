import Web3 from 'web3'
import Contract from './Exchange.json'
//import {fee} from './fee.js'

export const sendBid = (tokenId,address,crypto,amount,from,provider) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(Contract.abi,process.env.REACT_APP_EXCHANGE,{transactionConfirmationBlocks: 1})
    console.log('bid contracts bid',contract)
    let feeAmount = "1"
    console.log('bid feeAmount',feeAmount)
    let wei = web3.utils.toWei(""+amount);
    amount = web3.utils.toBN(wei)
    console.log('bid feeAmount',amount)
    return  contract.methods.bid(address,tokenId,crypto,amount).send({
      maxFeePerGas: null,
      maxPriorityFeePerGas: 2000000000 ,
      from : from, value : feeAmount
    })
}

export const waitForReceipt = async(tx,web3) => {
  let receipt =  await web3.eth.getTransactionReceipt(tx);
  console.log('receipt ::', receipt)
  if (receipt !== null) {
    return receipt;
  } else {
    return await  waitForReceipt(tx,web3);
  }
}