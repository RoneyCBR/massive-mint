import Web3 from 'web3'
import { getBalanceWMatic } from 'services/WMATIC/getBalance';
import { getBalance } from 'services/MATIC/getBalance';
import { getUser } from './User/getUser';

const web3Connection =async(provider) => {
    let shortWallet;
    try{
        const web3 = new Web3(provider)
        const chainID = await web3.eth.getChainId()
        const network = await web3.eth.net.getNetworkType()
        const accounts = await web3.eth.getAccounts()
        const userAccount = accounts[0]
        const formatMaticBalance = await getBalance(userAccount)
        const formatWMaticBalance = await getBalanceWMatic(userAccount)
        const user = await getUser(userAccount);
        if (accounts) {
            shortWallet = accounts[0].substring(0, 5) + '...' + accounts[0].substring(38, 54);
        }
        let viewEmailInput = true;
        if (user.registered) {
            viewEmailInput = false;
        } else {
            user.role = 0;
        }
        localStorage.setItem('viewEmailInput',""+viewEmailInput)
        let sign_exchange = false;
        const userData = {
            userAccount,
            network,
            chainID,
            provider,
            formatMaticBalance,
            viewEmailInput,
            user,
            sign_exchange,
            formatWMaticBalance,
            shortWallet
        }
        return userData
    }catch(error){
        console.log('error metamask ::', error)
    }
}

export const switchNetwork = async (provider) => {
    if (provider) {
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        chainId: Web3.utils.toHex(
                            process.env.REACT_APP_NETWORK
                        )
                    }
                ]
            });
        } catch (error) {
            if (error.code === 4902) {
                console.log('error from wallet', error)
                const ethereumChainParameter = {
                        chainId: Web3.utils.toHex(process.env.REACT_APP_NETWORK),
                        chainName: process.env.REACT_APP_NETWORK_NAME,
                        nativeCurrency: {
                        name: 'AVAX',
                        symbol: 'AVAX',
                        decimals: 18,
                    },
                    rpcUrls: [process.env.REACT_APP_RPC],
                    blockExplorerUrls:[process.env.REACT_APP_SCAN]
                    //iconUrls: []
                };
                try {
                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [ethereumChainParameter]
                    });
                } catch (error) {
                    console.error('error to switch network', error);
                }
            }
        }
    }
};

export default web3Connection
