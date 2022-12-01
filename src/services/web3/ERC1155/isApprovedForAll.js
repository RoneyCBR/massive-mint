import ABI from './ABI.json'
import Web3 from 'web3'

export const isApprovedForAll = async(from,to) => {
    try {
        let web3 = new Web3(process.env.REACT_APP_RPC);
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_COLLECTION_ADDRESS_TX);
        let approved = await contract.methods.isApprovedForAll(from,to).call()
        console.log('approved ::', approved)
        return approved
    } catch (err) {
        console.log(err)
    }
}