import Web3 from 'web3'
import Contract from './Collectibles.json'

export const setApprovedForAll = async(from,to,address,provider) => {
    let web3 = new Web3(provider);
    console.log('approved ',from,to,address,provider)
    let contract = new web3.eth.Contract(Contract.abi,address)
    let transaction = await contract.methods.setApprovalForAll(to,true).send({
      from : from
    })
    console.log('transaction ::', transaction)
    let receipt = await waitForReceipt(transaction.transactionHash,web3);
    const transactionHash =  receipt.transactionHash;
    return { transactionHash }
}

export const waitForReceipt = async(tx,web3) => {
  let receipt =  await web3.eth.getTransactionReceipt(tx);
  if (receipt !== null) {
    return receipt;
  } else {
    return await  waitForReceipt(tx,web3);
  }
}
