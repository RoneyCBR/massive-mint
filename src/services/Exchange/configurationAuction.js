import Web3 from 'web3'
import Contract from './Exchange.json'

export const configurationAuction = async(tokenId,address,startBid,timeLive,is721,startNow,from,provider) => {
  console.log('start auction',tokenId,address,startBid,timeLive,startNow,is721,from)
  let web3 = new Web3(provider);
  let contract = new web3.eth.Contract(Contract.abi,process.env.REACT_APP_EXCHANGE)
  let wei = web3.utils.toWei(""+startBid);
  let transaction = await contract.methods.activeSettingOfNFT(address,tokenId,0, web3.utils.toBN(wei),timeLive,startNow,is721).send({
    from : from, value : 0
  })
  let receipt = await waitForReceipt(transaction.transactionHash,web3);
  const transactionHash =  receipt.transactionHash;
  return { tokenId, address, transactionHash }
}

export const deleteAuction = async(tokenId,address,from,provider) => {
  let web3 = new Web3(provider);
  let contract = new web3.eth.Contract(Contract.abi,process.env.REACT_APP_EXCHANGE)
  let transaction = await contract.methods.deleteAuction(address,tokenId).send({
    from : from, value : 0
  })
  //console.log('transaction ::', transaction,startBid)
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
