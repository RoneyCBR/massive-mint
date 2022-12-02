import Web3 from 'web3'
import Contract from './Exchange.json'
import {fee} from './fee.js'

export const configurationAuction = async(tokenId,address,startBid,timeLive,is721,from,provider) => {
    console.log('start auction',tokenId,address,startBid,timeLive,is721,from)
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(Contract.abi,process.env.REACT_APP_EXCHANGE)
    let wei = web3.utils.toWei(""+startBid);
    console.log('auction wei amount ::', wei)
    let feeAmount = await fee(process.env.REACT_APP_EXCHANGE)
    let transaction = await contract.methods.activeSettingOfNFT(address,tokenId,0, web3.utils.toBN(wei),timeLive,is721).send({
      from : from, value : feeAmount
    })
    console.log('transaction ::', transaction,startBid)
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
