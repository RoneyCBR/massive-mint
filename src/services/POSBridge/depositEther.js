import { Hop, Chain  } from '@hop-protocol/sdk'
import { ethers } from 'ethers'
import Web3 from 'web3'
//import { Wallet } from 'ethers'

export const depositEther = async(amount, provider, address, callback, error) => {
    ///let interval;
    try {
        const web3 = new Web3(provider)
        const newProvider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = newProvider.getSigner()
        const hop = new Hop('mainnet', signer)
        const bridge = hop.connect(signer).bridge('ETH')
        let result = await bridge.send(web3.utils.toWei(""+amount), Chain.Ethereum, Chain.Polygon)
        callback(result)
    } catch (e) {
        error(e)
        //clearInterval(interval)
    }
}

