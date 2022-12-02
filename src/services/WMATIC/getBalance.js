import Web3 from 'web3'
import ABI from './ABI.json'


export const getBalanceWMatic = async(account) => {
  try {
    let web3 = new Web3(process.env.REACT_APP_RPC);
    let contract = new web3.eth.Contract(ABI, process.env.REACT_APP_WRAPPED);
    let result = await contract.methods.balanceOf(account).call();
    let format = web3.utils.fromWei(result, 'ether');
    console.log('wmatic ::', format)
    return format;
  } catch (err) {
    return '0.0'
  }
}