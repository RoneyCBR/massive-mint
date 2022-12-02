import React from 'react';
import { Avatar, Box, CircularProgress} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import ModalCustom from 'components/ModalCustom';
import FormMyData from './components/FormMyData';
import { useTranslation } from 'react-i18next';
import {ContentBanner, ContentHead, LinkAddress, Row1Head, Row2Head} from './style';

const AvatarPicture = ({formEditProfile,address,data,getMyDataProfile,loadMyData,loadingData}) =>{

    return(
        <React.Fragment>
            <Avatar
                alt="Avatar"
                src={formEditProfile.avatar != ''?formEditProfile.avatar:'/static/images/avatar/1.jpg'}
                sx={{ width: 120, height: 120, marginTop: '-60px',border:'5px solid #fff' }}
            />
                {
                    loadingData ? 
                    <Box
                        sx={{
                            position:'absolute',
                            top:'0px',
                            left:'0px',
                            width:'100%',
                            height:'100%',
                        }}
                    >   
                        <Box sx={{display:'flex',height:'100%',boxSizing:'border-box',justifyContent:'center',alignItems:'center'}}><CircularProgress size={60} sx={{color:'#43B02A'}}  /></Box>
                    </Box>
                    :
                    data && data.userAccount != 'undefined' && String(data.userAccount+'').toUpperCase() == String(address+'').toUpperCase() &&
                    <Box
                        onClick={()=>{!loadMyData && getMyDataProfile();}}
                        sx={{
                            position:'absolute',
                            bottom:'10px',
                            right:'0px',
                            width:'30px',
                            height:'30px',
                            borderRadius: '50% 50%',
                            color:'#fff',
                            cursor:'pointer',
                            background:'#43B02A',
                            "&:hover":{background:'#2A9114'}
                        }}
                    >
                        {
                            loadMyData ?
                                <CircularProgress size={20} sx={{color:'#fff',ml:'5px',mt:'5px'}}  />
                            :
                                <EditIcon sx={{ml:'5px',mt:'5px',fontSize:'20px'}} 
                            />
                        }
                        
                    </Box>
                }
        </React.Fragment>
    )

}


const Header = ({
    formEditProfile,
    setFormEditProfile,
    address,
    data,
    user,
    dataTemp,
    setDataTemp,
    getMyDataProfile,
    loadMyData,
    openModalForm,
    setOpenModalForm,
    loadingData
    }) => {
    const {t} = useTranslation("translate");

    return (
        <React.Fragment>
            <ContentBanner/>
            {formEditProfile.banner != '' &&
                <img src={formEditProfile.banner} height='250px' width='100%' style={{position:'absolute',top:0}} />
            }
            <ContentHead>
                <Row1Head>
                    <Box>
                        <Box
                            sx={{
                                position: 'relative',
                            }}
                        >
                            <AvatarPicture 
                                formEditProfile={formEditProfile} 
                                address={address} 
                                data={data}
                                getMyDataProfile={getMyDataProfile}
                                loadMyData={loadMyData}
                                loadingData={loadingData}
                            />
                        </Box>
                    </Box>
                </Row1Head>     
                <Row2Head>
                    <h3 style={{marginTop:'-20px', color:'#43B02A'}}>
                        {
                            formEditProfile && formEditProfile.username && formEditProfile.username != '' && String(formEditProfile.username +'').toUpperCase() != String(address+'').toUpperCase() ?
                            <React.Fragment>
                                {
                                    String(formEditProfile.username+'').toUpperCase() ===  String(address+'').toUpperCase() ?
                                    <LinkAddress href={`${process.env.REACT_APP_SCAN}address/`+String(address+'').toLowerCase()}  target="_blank" rel="nofollow noopener noreferrer">
                                        {(address).substring(0,5)+ '...' +(address).substring(38,54)}
                                    </LinkAddress>
                                    :
                                    <LinkAddress href={`${process.env.REACT_APP_SCAN}address/`+String(address+'').toLowerCase()} target="_blank" rel="nofollow noopener noreferrer">
                                        {formEditProfile.username}
                                    </LinkAddress>
                                
                                }
                            </React.Fragment>
                            :
                            <LinkAddress href={`${process.env.REACT_APP_SCAN}address/`+String(address+'').toLowerCase()} target="_blank" rel="nofollow noopener noreferrer">
                                {(address).substring(0,5)+ '...' +(address).substring(38,54)}
                            </LinkAddress>
                        }
                    </h3>
                </Row2Head>
            </ContentHead>
            <ModalCustom 
                isOpen={openModalForm}
                onCloseModal={()=>setOpenModalForm(false)}
                title={t("profile.modal_edit.title")}    
                height={'auto'}    
            >
                <Box
                    sx={{
                        width:'100%',
                        height:{xs:'90vh',sm:'90vh',md:'100%',lg:'100%',xl:'auto'},
                        overflowY:'auto'
                    }}
                > 
                    <FormMyData 
                        formEditProfile={formEditProfile}
                        setFormEditProfile={setFormEditProfile}
                        setInitEditProfile={()=>{}}
                        isSetEditProfile={()=>{}}
                        user={user}
                        data={data}
                        dataTemp={dataTemp}
                        setDataTemp={setDataTemp}
                        setOpenModalForm={setOpenModalForm}
                    />
                </Box>
            </ModalCustom>
        </React.Fragment>
    )
}

AvatarPicture.defaultProps = {
    formEditProfile: {},
    address:'',
    data:{},
    getMyDataProfile: ()=>{},
    loadMyData:false,
    loadingData: false
}

AvatarPicture.propTypes = {
    formEditProfile: PropTypes.object,
    address: PropTypes.string,
    data: PropTypes.object,
    editProfile: PropTypes.bool,
    setEditProfile: PropTypes.func,
    getMyDataProfile: PropTypes.func,
    loadMyData: PropTypes.bool,
    loadingData: PropTypes.bool
}

Header.defaultProps = {
    formEditProfile: {},
    setFormEditProfile: ()=>{},
    address:'',
    data:{},
    user:{},
    dataTemp:{},
    setDataTemp: ()=>{},
    getMyDataProfile: ()=>{},
    loadMyData:false,
    openModalForm:false,
    setOpenModalForm: ()=>{},
    loadingData: false
}

Header.propTypes = {
    formEditProfile: PropTypes.object,
    setFormEditProfile: PropTypes.func,
    address: PropTypes.string,
    data: PropTypes.object,
    user: PropTypes.object,
    dataTemp: PropTypes.object,
    setDataTemp: PropTypes.func,
    getMyDataProfile: PropTypes.func,
    loadMyData: PropTypes.bool,
    openModalForm: PropTypes.bool,
    setOpenModalForm: PropTypes.func,
    loadingData: PropTypes.bool
}


export default Header;
