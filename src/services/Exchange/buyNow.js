import Web3 from 'web3'
import Contract from './Exchange.json'
//import {fee} from './fee.js'

export const buyNow = async(tokenId,address,crypto,amount,from,provider) => {
    let id = tokenId;
    let web3 = new Web3(provider,null, {transactionConfirmationBlocks: 1});
    let contract = new web3.eth.Contract(Contract.abi,process.env.REACT_APP_EXCHANGE)
    console.log('bid contracts bid',contract)
    let feeAmount = "1"
    console.log('bid feeAmount',feeAmount)
    let wei = web3.utils.toWei(""+amount);
    amount = web3.utils.toBN(wei)
    console.log('bid feeAmount',amount)

    let gasPrice = await web3.eth.getGasPrice();
    gasPrice = "" + (parseFloat(gasPrice) * 1.2)
    console.log("debug gasPrice: " + gasPrice,address,tokenId,crypto,amount);
    let transaction = await contract.methods.buyNow(address,tokenId,crypto,true).send({
      maxFeePerGas: null,
      gasPrice :  gasPrice,
      maxPriorityFeePerGas: 2000000000 ,
      from : from, value : wei
    }).
    console.log('transaction ::', transaction)

   // let receipt = await waitForReceipt(transaction.transactionHash,web3);
    let receipt = transaction
    const transactionHash =  receipt.transactionHash;
    return { id, address, transactionHash }
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