import Web3 from 'web3'
import ABI from './ABI.json'

export const balanceOf = async(address,from) => {
    let web3 = new Web3(process.env.REACT_APP_RPC);
    let contract = new web3.eth.Contract(ABI,address)
    let  balance = await contract.methods.balanceOf(from).call()
    balance = web3.utils.fromWei(balance, 'ether')
    console.log('Wavax',balance)
    return balance
}
