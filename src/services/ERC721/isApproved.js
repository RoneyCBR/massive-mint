import Web3 from 'web3'
import Contract from './Collectibles.json'

export const isApproved = async(address,from,to) => {
    let web3 = new Web3(process.env.REACT_APP_RPC);
    let contract = new web3.eth.Contract(Contract.abi,address)
    let  approve = await contract.methods.isApprovedForAll(from,to).call()
    console.log('Approve collection',approve)
    return approve
}
