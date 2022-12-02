import React, { useEffect, useState }  from 'react'
import { Divider, Box, Container } from '@mui/material';
import { FooterText } from './styles/styles';
import { footer } from 'api/sanity';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';



const Footer = () => {
    const [footerList, setFooterList] = useState([]);
    useEffect(()=>{
        footer().then(response=>{
            try{
                setFooterList(response[0]);
            }catch (e) {
                console.error(e)
            }
        });
    },[]);


    const styleLink = {
        width:'auto',
        textDecoration:'none',
        color:'#43B02A',
        fontSize:'16px',
        fontWeight:'bold',
        "&:hover":{
            color:'#fff'
        }
    }

    return (
        <Box component="footer" sx={{background:'#000'}}>
            <Container maxWidth="xl" >
                <Box
                    sx={{width:'100%',display:'grid',gridTemplateColumns:{xs:'repeat(1,1fr)',sm:'repeat(1,1fr)',md:'repeat(1,fr)',lg:'15% 1fr',xl:'15% 1fr'}}}
                >
                    <Box sx={{width:'100%',m:'0 auto',p:'30px'}}>
                        <Box sx={{display:'flex',width:'100%',justifyContent:{xs:'center',sm:'center',md:'center',lg:'space-around',xl:'space-around',gap:'20px'}}}>
                        {
                            footerList?.socialNetworks?.map((socialNetwork, index)=>(
                                <Box key={index}>
                                    {
                                        socialNetwork && socialNetwork.icon && socialNetwork.icon.asset && socialNetwork.icon.asset.url &&
                                        <Box >
                                            {
                                                socialNetwork.link && socialNetwork.link != null?
                                                    <Box component={"a"}  href={socialNetwork.link} target='_blank' rel="noopener" sx={styleLink}>
                                                        <CardMedia
                                                            component={'img'}
                                                            alt={socialNetwork.icon.asset._id}
                                                            src={socialNetwork.icon.asset.url}
                                                            sx={{
                                                                position:'relative',
                                                                boxSizing:'border-box',
                                                                margin: '0 auto',
                                                                height:'25px'
                                                            }}
                                                        />
                                                    </Box>
                                                :
                                                <CardMedia
                                                    component={'img'}
                                                    alt={socialNetwork.icon.asset._id}
                                                    src={socialNetwork.icon.asset.url}
                                                    sx={{
                                                        position:'relative',
                                                        boxSizing:'border-box',
                                                        margin: '0 auto',
                                                        height:'25px'
                                                    }}
                                                />
                                            }
                                        </Box>     
                                    }
                                </Box>
                            ))
                            
                        }
                        </Box>
                    </Box>
                    <Box sx={{width:'100%',m:'0 auto',p:'30px'}}>
                        <Box sx={{display:'flex',width:'100%',textAlign:'center',justifyContent:{xs:'center',sm:'center',md:'space-around',lg:'space-around',xl:'space-around'},flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'}}}>
                        {
                            footerList?.footerList?.map((option, index)=>(
                                <React.Fragment key={index}>
                                    {
                                        option && option.title &&
                                        <React.Fragment>
                                            {
                                                option.link && option.link != ''?
                                                <React.Fragment>
                                                    {
                                                        option.internalLink && 
                                                        <Box component={Link} to={option.link} sx={styleLink} >
                                                            {option.title}
                                                        </Box>
                                                    }
                                                    {
                                                        option.externalLink && 
                                                        <Box component={"a"}  href={option.link} target='_blank' rel="noopener" sx={styleLink} >
                                                            {option.title}
                                                        </Box>
                                                    }
                                                </React.Fragment>
                                                :
                                                <Box sx={styleLink}>
                                                    {option.title}
                                                </Box>
                                            }
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                            ))
                            
                        }
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Divider sx={{width:'100%',background:'#fff',color:'#fff',height:'1px',mb:'15px'}} />
            <FooterText>
                <Box 
                    sx={{
                        color:'#fff',
                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                        fontSize:{xs:'16px',sm:'18px',md:'20px'}
                    }}
                >
                    © 2022. All rights reserved
                </Box>
            </FooterText>
        </Box>
    );
};

export default Footer;
