import React from 'react'
import PropTypes from 'prop-types'

export const OpenWalletContext = React.createContext()

const OpenWalletProvider = ({children})=>{
    const [openWallet, setOpenWallet] = React.useState(false)
    return(
        <OpenWalletContext.Provider value={{openWallet, setOpenWallet}}>
            {children}
        </OpenWalletContext.Provider>
    )
}

OpenWalletProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default OpenWalletProvider
