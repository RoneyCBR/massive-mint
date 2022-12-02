import ABI from './ABI.json'
import Web3 from 'web3'

export const balanceOfERC20 = async( provider, address) => {
    return new Promise((resolve,reject) => {
        try {
            let web3 = new Web3(provider);
            const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_ERC_20_CONTRACT);
            contract.methods.balanceOf(address).call().then((amount) =>{
                let weth = web3.utils.fromWei(""+amount);
                resolve(weth)
            })
        } catch (error) {
            reject(error)
        }
    });
}