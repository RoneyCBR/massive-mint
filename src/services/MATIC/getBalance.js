import Web3 from 'web3'

export const getBalance = async(account) => {
  try {
    let web3 = new Web3(process.env.REACT_APP_RPC);
    let result = await web3.eth.getBalance(account)
    let format = web3.utils.fromWei(result, 'ether');
    return format;
  } catch (err) {
    return '0.0'
  }
}