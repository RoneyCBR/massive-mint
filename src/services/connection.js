import metamask from "./metamask";
import WalletConnect from "./WalletConnect";
import PropTypes from 'prop-types'


const getConnection =(provider,setMsg,setData,setIsLoading)=>{
    if(provider==='metamask'){
        return metamask(setMsg,setData,setIsLoading)
    }
    if(provider==='walletConnect'){
        return WalletConnect()
    }
}


getConnection.propTypes ={
    provider: PropTypes.string,
    setMsg: PropTypes.func
}

export default getConnection