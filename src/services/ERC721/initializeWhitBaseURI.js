import Web3 from 'web3'
import Contract from './PerseaSimpleCollection.json'

export const initializeWhiteBaseURL = async(address,from,newPrice,newLimit, baseURI,provider) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(Contract.abi,address)
    newPrice = web3.utils.toWei(""+newPrice);
    newPrice = web3.utils.toBN(newPrice)
    let transaction = await contract.methods.initializeWhiteBaseURL(newPrice,newLimit,baseURI).send({
      from : from
    })
    let receipt = await waitForReceipt(transaction.transactionHash,web3);
    const transactionHash =  receipt.transactionHash;
    return { transactionHash }
}

export const waitForReceipt = async(tx,web3) => {
  let receipt =  await web3.eth.getTransactionReceipt(tx);
  if (receipt !== null) {
    return receipt;
  } else {
    return  waitForReceipt(tx,web3);
  }
}