import detectEthereumProvider from '@metamask/detect-provider';
import web3Provider from 'services/web3'
import Web3 from 'web3';
import PropTypes from 'prop-types'

const metamask = async(setMsg,setData,setIsLoading) => {


    const provider = await detectEthereumProvider().catch((err) =>{
       console.log("Error provider detectEthereumProvider()::",err);
    })

    await provider.request({ method: 'eth_requestAccounts' }).catch((error) => { 
        console.log("debug  provider.request err",error);
        if(error && error.code === -32002){
            setMsg("Please open your Wallet in your browser")
        }
    })

//update metamask
    if(provider){
        return new Promise((resolve, reject) => {
            try{
                localStorage.setItem('isMetamask', true)
                localStorage.setItem('wallet', true)
                web3Provider(provider).then(res => {
                    resolve(res);
                })
                
                provider.on('accountsChanged', async() => {
                    setIsLoading(true);
                    localStorage.clear();
                    (web3Provider(provider).then(x=>{
                        if(x === undefined){
                            window.location.reload();
                        }else{
                            setData(x);
                        }
                        setIsLoading(false)
                    }).catch(()=>{
                        setIsLoading(false)
                    })
                    )
                });
                provider.removeListener('accountsChanged', () => {
                    (web3Provider(provider).then(x=>{
                        if(x === undefined){
                            localStorage.clear()
                        }
                        window.location.reload()
                    }))
                });
                provider.on('chainChanged', () => {
                    (web3Provider(provider).then(x=>{
                        if(x === undefined){
                            localStorage.clear()
                        }
                        window.location.reload()
                    }))
                });
                provider.removeListener('chainChanged', () => {
                    (web3Provider(provider).then(x=>{
                        if(x === undefined){
                            localStorage.clear()
                        }
                        window.location.reload()
                    }))
                });
            }catch(err){
                localStorage.clear()
                setMsg("please open your metamask in your browser")
                reject(err)
            }
        })
    }else{
        alert('Metamask is not installed')
    }

}

const switchEthereumChain = async(network) => {
    if (window?.ethereum) {
        try {
          if (network === 0) return;
            console.log('network ::',network)
            if (process.env.REACT_APP_NETWORK == network) {
                console.log('hex ::', Web3.utils.toHex(process.env.REACT_APP_NETWORK))
                let provider = {
                        chainId: Web3.utils.toHex(process.env.REACT_APP_NETWORK),
                        chainName: process.env.REACT_APP_NETWORK_NAME,
                        nativeCurrency: {
                        name: 'ethereum',
                        symbol: 'ethereum',
                        decimals: 18,
                    },
                    rpcUrls: [process.env.REACT_APP_RPC],
                    blockExplorerUrls:[process.env.REACT_APP_SCAN]
                }
                await window?.ethereum.request({method: "wallet_addEthereumChain", params: [provider]})
                await window?.ethereum?.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: Web3.utils.toHex(network) }],
                });
            } else {
                await window?.ethereum?.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: Web3.utils.toHex(network) }],
                });
            }
        } catch (error) {
            console.log('Error ::', error);
            //alert('Error to change network')
        }
    }
}

metamask.propTypes ={
    setMsg: PropTypes.func
}
export {switchEthereumChain}
export default metamask