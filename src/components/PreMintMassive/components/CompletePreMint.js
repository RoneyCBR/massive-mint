import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {
    TitleH2,
    ButtonLink
} from '../style';

const CompletePreMint = ({addressOwner,projectData,children,t}) =>{

    React.useEffect(() => {
        let customScroll = document.querySelector(".custom-scroll")
        if(customScroll){
            customScroll.scrollTo(0,0)
        }
        window.scrollTo(0,0)
    },[]);

    return (
        <React.Fragment>
            <Box sx={{width:'100%',height:'30px'}} />
            <Box sx={{padding:'10px 0px'}}>
                <Box
                    sx={{
                        width:'310px',
                        margin:'0 auto'
                    }}
                >
                    {children}
                </Box>
                <Box
                    sx={{
                        width:'100%',
                        color:'#FEFFFF',
                        padding:'20px'
                    }}
                >
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent: 'center',
                            padding:'10px 0px'
                        }}
                    >
                        <TitleH2>{t("pre_mint_nft_massive.collection_minted.description")}</TitleH2>
                    </Box>
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'center',
                            flexDirection:{xs:'column',sm:'row'},
                            gap:'15px'
                        }}
                    >   
                        <ButtonLink 
                            LinkComponent={'a'}
                            width='200px'
                            href={`/create/select-collection?address=${addressOwner}`}
                        >
                            {t("pre_mint_nft_massive.collection_minted.go_back_btn")}
                        </ButtonLink>

                        <ButtonLink 
                            LinkComponent={'a'}
                            width='200px'
                            href={`/collection?address=${projectData.project_key}`}
                        >
                             {t("pre_mint_nft_massive.collection_minted.go_to_collection_btn")}
                        </ButtonLink>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );

}


CompletePreMint.propTypes = {
    addressOwner: PropTypes.any,
    projectData: PropTypes.object,
    children: PropTypes.node,
    t: PropTypes.any
};

export default CompletePreMint;