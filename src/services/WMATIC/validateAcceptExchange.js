import Web3 from 'web3'
import ABI from './ABI.json'


export const validateAcceptExchange = async(provider,fromAddress,toAddress) => {
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(ABI, process.env.REACT_APP_WRAPPED_MATIC);
        let result = await contract.methods.allowance(fromAddress,toAddress).call();
        result = web3.utils.fromWei(result, 'ether');
        console.log("getAllowance",result);
        return result;
    } catch (err) {
      console.log(err)
    }
  }