import React,{createContext, useEffect, useState } from 'react'
import getConnection from 'services/connection'
import PropTypes from 'prop-types'
import { getIfHaveTxt } from 'services/User/getIfHaveTxt';
const defaultState = {
    userAccount: undefined,
    balance: '0.000',
    network: 'disconnected',
    chainID: 'NaN',
    provider: null,
    maticBalance: '0.00',
    viewEmailInput : false,
    user : null,
    sign_exchange : false,
    formatWMaticBalance: '0.00'
}
export const Context = createContext(defaultState)

const WalletProvider = ({children})=>{
    const [data, setData]=useState(defaultState)
    const [isLoading, setIsLoading] = useState(false);
    const [msg,setMsg] = useState('');
    const connection =(wallet)=>{
        try{
            getConnection(wallet,setMsg,setData,setIsLoading)
            .then(async(res)=>{
                setData(res)
                if(res && res != null && res.userAccount && res.userAccount != 'undefined'){
                    const txt = await getIfHaveTxt(res.userAccount);
                    if(txt){
                        console.log('debug txt pending', txt)
                    }                       
                } 
            })
            .catch((error) => {
                console.error('Error Context', error);
            });
        }catch(err){
            console.log(err)
        }
    }

    let net = localStorage.getItem('network')
    let metamask = localStorage.getItem('isMetamask')
    let walletConnect = localStorage.getItem('walletConnect')

    useEffect(()=>{
        net = localStorage.getItem('network')
        metamask = localStorage.getItem('isMetamask')
        walletConnect = localStorage.getItem('walletConnect')
        if(net && metamask){
            setIsLoading(true)
            connection('metamask')
        }
        if(walletConnect){
            setIsLoading(true)
            connection('walletConnect')
        }
    },[])

    return(
        <Context.Provider value={{data, connection, isLoading, setIsLoading, setData, msg}}>
            {children}
        </Context.Provider>
    )
}

WalletProvider.propTypes = {
    children: PropTypes.node
}

export default WalletProvider