import React ,{useState,useContext}from 'react';
import { Box, Button } from "@mui/material";
import LoaderModal from 'components/LoaderModal';
import { Context } from 'hooks/WalletContext';
import { switchEthereumChain } from 'services/metamask';
import {useHistory} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sign } from 'services/Utils/signature';

const styleBtn = {
    marginLeft:'5px',
    backgroundColor: '#000',
    color:'#fff', 
    width: 'auto',
    transition: 'all 0.3s ease-in-out',
    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#000',
    }
}


const Deploy = () => {
    const { t } = useTranslation("translate");
    const [connectWallet, setConnectWallet] = useState(false);
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState('');
    const { data } = useContext(Context)
    const [changeNetworkActive, setChangeNetworkActive] = useState(false);
    const location = useHistory();
    
    React.useEffect(() => {
        setLoader(false);
        setMsg('');
       
    },[])

    let first = true;

    React.useEffect(() => {
        if(data && data.userAccount && data.userAccount != 'undefined' && first){
            setConnectWallet(true);
            first = false;
            if(data.chainID != process.env.REACT_APP_POLYGON_NETWORK) {
                setChangeNetworkActive(true)
            } else {
                setChangeNetworkActive(false)
            }
        }else{
            setConnectWallet(false);
        }
    },[data])

    const handleChangeNetwork = () => {
        switchEthereumChain(process.env.REACT_APP_POLYGON_NETWORK)
    }

    const handleSignMetamask = async () => {
        setMsg('');
        setLoader(true);
        let {signature, message} = await sign("Sign deploy",data.userAccount,data.provider)
            .catch((error =>{
                console.log("error::",error);
                setMsg(error.message+'');
                
                return {signature:null, message:error.message};
        }));
        if(signature){
            console.log("debug message::",message);
            setLoader(false);
            setMsg('Sign successful');
            location.push('/setup-1');
        }
        setLoader(false);
    }


    return (
        <div>
            <Box sx={{ height:'100vh', paddingTop:'150px',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}} > 
                <h1 style={{textAlign: 'center',color: "#000"}}>App SetUp</h1>
                {
                    connectWallet ?
                    <React.Fragment>
                        <h2 style={{textAlign: 'center',color: "#000"}}>Connected wallet <br/>{data && data.userAccount && data.userAccount != 'undefined' && data.userAccount}</h2>
                        <Box sx={{ display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
                            {
                                changeNetworkActive ? 
                                <Box sx={{ display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
                                    <Button
                                        variant="contained"
                                        onClick={handleChangeNetwork}
                                        sx={styleBtn} 
                                    >
                                        <span>
                                            Switch to Avalanche
                                        </span>
                                    </Button>                  
                                </Box>  
                                :
                                <Button
                                    variant="contained"
                                    onClick={handleSignMetamask}
                                    sx={styleBtn} 
                                >
                                    <span>
                                        {t("setup2.sign")}
                                    </span>
                                </Button>
                            }

                            {
                                msg != '' && 
                                <h4 style={{textAlign: 'center',color: "#000"}}>{msg}</h4>
                            }
                                                 
                        </Box>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h3 style={{textAlign: 'center',color: "#000"}}>Connect your wallet</h3>
                    </React.Fragment>

                }

                
                <LoaderModal isOpen={loader} text={msg} textColor='#fff'  />
            </Box>
        </div>
    );
};



export default Deploy;