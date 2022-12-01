import Web3 from 'web3'
import ABI from './ABI.json'

export const deposit = (from,amount,address,provider) => {
    let web3 = new Web3(provider);
    console.log('deposit provider ::',web3)
    let contract = new web3.eth.Contract(ABI,address, {transactionConfirmationBlocks: 1})
    let wei = web3.utils.toWei(""+amount);
    amount = web3.utils.toBN(wei)
    return contract.methods.deposit().send({
      maxFeePerGas: null,
      maxPriorityFeePerGas: 2000000000 ,
      from : from, value : amount
    })
}

export const waitForReceipt = async(tx,web3) => {
  let receipt =  await web3.eth.getTransactionReceipt(tx);
  if (receipt !== null) {
    return receipt;
  } else {
    return await  waitForReceipt(tx,web3);
  }
}
