import React, { useContext } from 'react'
// import ReactAccountCircleIcon from '@mui/icons-material/AccountCircle';
import { /* Avatar, AvatarGroup, */ Box, CardMedia } from '@mui/material';
import { FiShare } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Context } from 'hooks/WalletContext';
import PropTypes from 'prop-types';

const Share = ({func, setState, onChange, fileRef, content}) => {
    const { t } = useTranslation("translate");
    const { data } = useContext(Context);

    function isValidHttpUrl(string) {
        let url;
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
        return url.protocol === "http:" || url.protocol === "https:";
      }
    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            sx={{
                paddingLeft:'4rem',
                paddingRight:'10rem',
                '@media screen and (max-width: 768px)':{
                    flexDirection:'column',
                    justifyContent:'center',
                    flexWrap:'wrap',
                    paddingLeft:'0px',
                    paddingRight:'0px',
                }
            }}
        >
            <Box
                sx={{
                    position:'relative',
                    boxSizing:'border-box',
                    padding:'2rem',
                    backgroundColor:'#fff',
                    display:'inline-flex',
                    gap:'2rem',
                    borderRadius:'8px',
                    boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.3)',
                    top: '-0.98rem',
                    '@media screen and (max-width: 768px)':{
                        flexWrap:'wrap',
                        justifyContent:'space-between',
                    }
                }}
            >
                <Box>
                    <Box sx={{color:'#7F7F7F', fontSize:'18px', fontWeight:600}}>{t('collection.box_item_one')}</Box>
                    <Box sx={{color:'#000', fontWeight:600, fontSize:'24px'}}>{content.collection_of}</Box>
                </Box>
{/*                 <Box>
                    <Box sx={{color:'#7F7F7F', fontSize:'18px', fontWeight:600}}>{t('collection.box_item_two')}</Box>
                    <Box display='flex' alignItems='center' sx={{gap:'5px'}}>
                        <span style={{color:'#000', fontWeight:600, fontSize:'24px'}}>{content.owned_by.length}</span>
                        <AvatarGroup total={content.owned_by.length}>
                        {content.owned_by.map((item, index)=>(  index < 3 &&
                            <Avatar 
                                alt="Remy Sharp" 
                                src={item.profile_pic_url} 
                                sx={{ height: '25px', width: '25px'}}
                            />

                        ))}
                        </AvatarGroup>
                    </Box>
                </Box> */}
                <Box>
                    <Box sx={{color:'#7F7F7F', fontSize:'18px', fontWeight:600}}>{t('collection.box_item_three')}</Box>
                    <Box sx={{color:'#000', fontWeight:600, fontSize:'24px'}}>
                        <Box display="flex" alignItems="center" gap="5px">
                            <CardMedia component="img" src="eth.png" alt="currency" sx={{ width: '16px' }} />
                            <span>{content.floor_price}</span>
                        </Box>
                    </Box>
                </Box>
{/*                 <Box>
                    <Box sx={{color:'#7F7F7F', fontSize:'18px', fontWeight:600}}>{t('collection.box_item_four')}</Box>
                    <Box sx={{color:'#000', fontWeight:600, fontSize:'24px'}}>{content.sales}</Box>
                </Box> */}
                {
                    content && content.external_url && isValidHttpUrl(content.external_url) &&
                    <Box>
                        <Box sx={{color:'#7F7F7F', fontSize:'18px', fontWeight:600}}>External Url</Box>
                        <Box sx={{color:'#000', fontWeight:600, fontSize:'24px'}}>
                            <Box
                                component="a"
                                href={content.external_url}
                                target="_blank" 
                                rel="noopener noreferrer"
                                sx={{
                                    textDecoration: 'none',
                                    color:'#000', fontWeight:600, fontSize:'24px',
                                    cursor: 'pointer',
                                    textAlign: 'center'
                                }}
                            >
                                Here
                            </Box>
                        </Box>
                    </Box>
                }
            </Box>
            <Box
                sx={{
                    position:'relative',
                    boxSizing:'border-box',
                    display:'flex',
                    gap:'2rem',
                    top: '-4rem',
                    '@media screen and (max-width: 768px)':{
                        marginTop:'3rem',
                    }
                }}
            >
                <Box 
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    onClick={()=>setState(true)}
                    sx={{
                        color:'#000', 
                        fontWeight:600, 
                        fontSize:'24px',
                        boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.3)',
                        borderRadius:'999px',
                        backgroundColor:'#fff',
                        paddingLeft:'1rem',
                        paddingRight:'1rem',
                        cursor:'pointer',
                    }}
                >
                    <span style={{marginRight:'5px'}}>{t('collection.share_btn')}</span>
                    <FiShare size={25} />
                </Box>
                {data && data.userAccount && String(data.userAccount+'').toUpperCase() == String(content.owner+'').toUpperCase() &&  (
                    <Box 
                        component={Link}
                        to={`/create/edit-collection?project_key=${content.project_key}`}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        onClick={()=>setState(true)}
                        sx={{
                            color:'#000', 
                            fontWeight:600, 
                            fontSize:'24px',
                            boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.3)',
                            borderRadius:'999px',
                            backgroundColor:'#fff',
                            paddingLeft:'1rem',
                            paddingRight:'1rem',
                            cursor:'pointer',
                            textDecoration: 'none'
                        }}
                    >
                        <span style={{marginRight:'5px'}}>{t('collection.edit')}</span>
                        <EditIcon size={25} />
                    </Box>
                )}
                { content.is_owner &&
                    <Box 
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        onClick={func}
                        sx={{
                            color:'#000', 
                            fontWeight:600, 
                            fontSize:'24px',
                            boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.3)',
                            borderRadius:'999px',
                            backgroundColor:'#fff',
                            paddingLeft:'1rem',
                            paddingRight:'1rem',
                            cursor:'pointer',
                        }}
                    >
                        <span style={{marginRight:'5px'}}>{t('collection.upload_btn')}</span>
                        <input onChange={onChange} ref={fileRef} type='file' style={{display:'none'}} />
                        <AiOutlineCloudUpload size={30} />
                    </Box>

                }
            </Box>
        </Box>
    )
}

Share.propTypes = {
    content: PropTypes.object.isRequired,
    func: PropTypes.func,
    setState: PropTypes.func,
    onChange: PropTypes.func,
    fileRef: PropTypes.object,
}

export default Share