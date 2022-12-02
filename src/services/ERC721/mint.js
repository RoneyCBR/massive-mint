import Web3 from 'web3'
import Contract from './Collectibles.json'

export const mint = async(URI,address,from,provider) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(Contract.abi,address)
    let transaction = await contract.methods.mint(URI).send({
      from : from
    })
    console.log('transaction ::', transaction)
    let receipt = await waitForReceipt(transaction.transactionHash,web3);
    const tokenId = parseInt(""+transaction.events.Transfer.returnValues['tokenId']);
    const transactionHash =  receipt.transactionHash;
    return { tokenId, transactionHash }
}

export const waitForReceipt = async(tx,web3) => {
  let receipt =  await web3.eth.getTransactionReceipt(tx);
  if (receipt !== null) {
    return receipt;
  } else {
    return await  waitForReceipt(tx,web3);
  }
}

/* export const decodeParams = (receipt, web3) => {
  const typesArray = [
    {type: 'address', name: 'from'},
    {type: 'address', name: 'to'},
    {type: 'uint256', name: 'tokenId'}
  ];

} */