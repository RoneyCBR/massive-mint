import React from 'react'
import { Context } from 'hooks/WalletContext';
import { depositEther } from './depositEther';
//import { useLocation } from 'react-router';
//import NFTData from './components/NFTData';
//import { CircularProgress } from '@mui/material';
//import {fetchNftByAddress} from './fetchNft'
//import { Box } from '@mui/system';
//import { useTranslation } from 'react-i18next';
//import ErrorBoundary from './components/ErrorBoundary'
//import NFTSection from './components/NFTSection';
//import { projectByAddress } from './components/fetchProject';
//import TableSection from './components/TableSection';
//import NavInfo from './components/NavInfo';


const POSBridge = () => {
    const {data} = React.useContext(Context)
    console.log('context',data)
    const handleClick = async() => {
     depositEther(1.0,data.provider,data.userAccount)
    }
    //const location = useLocation()
    //const query = new URLSearchParams(location.search)
    //const address = query.get("address")
    //const tokenId = query.get("token_id")
    //const resouce = fetchNftByAddress(address, tokenId);
    //const resouceProject = projectByAddress(address)
    //console.log(resouce.nft.read())
    //const resouce = fetchNftByAddress(address, tokenId)
    return (
<form>
  <legend>ETH - MATIC WETH</legend>
  <div className="mui-textfield">
    <input type="text" placeholder="Input 1" />
  </div>
  <div className="mui-textfield">
    <textarea placeholder="Textarea"></textarea>
  </div>
  <button type="button" className="mui-btn mui-btn--raised" onClick={ () => handleClick()}>Submit</button>
</form>
    );
}

export default POSBridge;