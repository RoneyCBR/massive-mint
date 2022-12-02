import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const DrawerMobileContext = createContext()

const DrawerMobileProvider = ({children})=>{
    const [openNav, setOpenNav] = useState(false);
    const [openWallet, setOpenWallet] = useState(false);
    window.addEventListener('keyup', (e)=>{
        if (e.key === "Escape") {
            setOpenNav(false)
            setOpenWallet(false)
        }
    })
    return(
        <DrawerMobileContext.Provider value={{openWallet, setOpenWallet, openNav, setOpenNav}}>
            {children}
        </DrawerMobileContext.Provider>
    )
}

DrawerMobileProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default DrawerMobileProvider
