import Web3 from 'web3';
import Contract from './MintList.json';

export const isOnWhitelist = async(provider,from) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(Contract.abi, process.env.REACT_APP_MINT_LIST_ADDRESS)
    return contract.methods.isMinter(web3.utils.toChecksumAddress(from)).call()
}