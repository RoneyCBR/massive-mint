import Web3 from 'web3'
import Contract from './Exchange.json'
//import {fee} from './fee.js'

export const configurationSale = async(tokenId,address,price,is721,from,provider) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(Contract.abi,process.env.REACT_APP_EXCHANGE)
    //let feeAmount = await fee(process.env.REACT_APP_EXCHANGE)
    let wei = web3.utils.toWei(""+price);
    price = web3.utils.toBN(wei)
    let transaction = await contract.methods.activeSettingOfNFT(address,tokenId,price,0,0,false,is721).send({
      from : from, value : 0
    })
    console.log('transaction ::', transaction)
    let receipt = await waitForReceipt(transaction.transactionHash,web3);
    const transactionHash =  receipt.transactionHash;
    return { tokenId, address, transactionHash }
}

export const waitForReceipt = async(tx,web3) => {
  let receipt =  await web3.eth.getTransactionReceipt(tx);
  if (receipt !== null) {
    return receipt;
  } else {
    return await  waitForReceipt(tx,web3);
  }
}
