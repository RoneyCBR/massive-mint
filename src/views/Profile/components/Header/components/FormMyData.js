import React ,{useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import ButtonStyled from 'components/ButtonStyled';
import UserNameInputType1 from 'components/Form/UserNameInputType1';
import EmailInputType1 from 'components/Form/EmailInputType1';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import { updateUser } from 'services/User/updateUser';
import { sign } from 'services/Utils/signature';
import axios from 'axios';
import PropTypes from 'prop-types';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const FormMyData = ({
    formEditProfile,
    setFormEditProfile,
    setInitEditProfile,
    user,
    data,
    dataTemp,
    setDataTemp,
    setOpenModalForm
}) => {
    const {t} = useTranslation("translate");
    const [load,setLoad] = useState(false);
    const [error,setError] = useState(false);
    const [msg, setMsg] = useState('');
    const uploadFile = (thumbnail, isVideo) => {
        return new Promise((resolve, reject) => {
            try {
                let type = isVideo ? "video" : "img";
                let url_thumbnail = process.env.REACT_APP_URL_API+"/thumbnail?time=-1&type="+type+`&domain=${process.env.REACT_APP_DOMAIN}`
                console.log('video url_thumbnail', url_thumbnail)
                let headers = {
                  'Content-Type': 'multipart/form-data'
                }
                axios.post(url_thumbnail, thumbnail, { headers :headers}).then((success) => {
                    console.log('success ::', success);
                    resolve(success.data.url)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    const validPictures = () =>{
        if((formEditProfile.avatar != '') ||  (formEditProfile.banner != '')){
            if((formEditProfile.avatar != '') &&  (formEditProfile.banner != '')){
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,avatar:true}});
                return true;
            }else
            if(formEditProfile.banner != ''){
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,banner:true}});
                return true;
            }else
            if(formEditProfile.avatar != ''){
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,avatar:true,banner:true}});
                return true;
            }else{
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,avatar:false,banner:false}});
                return false;
            }
        }else{
            setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,avatar:false,banner:false}});
            return false;
        }
    }

    const validInputs = () =>{
        if((formEditProfile.username != '') ||  (formEditProfile.email != '')){
            if(formEditProfile.location != ''){
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,country:true,email:true}});
                return true;
            }else
            if((formEditProfile.username != '') &&  (formEditProfile.email != '')){
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,username:true,email:true}});
                return true;
            }else
            if(formEditProfile.username != ''){
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,username:true}});
                return true;
            }else
            if(formEditProfile.email != ''){
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,email:true}});
                return true;
            }else{
                setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,username:false,email:false}});
                return false;
            }
            
        }else{
            setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,avatar:false,banner:false}});
            return false;
        }

    }

    const validNotChanges = () =>{
        if(formEditProfile.username == dataTemp.username && formEditProfile.email == dataTemp.email
            && formEditProfile.validateAttr.avatar == null && formEditProfile.validateAttr.banner == null
            && formEditProfile.country == null && formEditProfile.instagram == null && formEditProfile.twitter == null
            ){
            setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,username:false,email:false}});
            return false;
        }else{
            return true;
        }

    }

    const handleUpdateData = async(username,email)=>{
        let profilePic = new FormData();
        let profilePicURL = '';
        console.log(formEditProfile)
        profilePic.append("thumbnail", formEditProfile.fileAvatar);
        if(formEditProfile.avatar != '' && formEditProfile.validateAttr.avatar){
            profilePicURL = await uploadFile(profilePic, false);
        }else{
            profilePicURL = String(user.profile_pic_url).replace("https://persea.mypinata.cloud/ipfs/", "");     
        }
                      
        let banner = new FormData();
        banner.append("thumbnail", formEditProfile.fileBanner)
        let bannerURL = '';
        if(formEditProfile.banner != '' && formEditProfile.validateAttr.banner){
            bannerURL = await uploadFile(banner, false);
        }else{
            bannerURL = String(user.banner_url).replace("https://persea.mypinata.cloud/ipfs/", "");
        }
        let  { signature, message } = await sign("Approve my intention to receive notifications at",data.userAccount,data.provider).catch(err=>{
            setInitEditProfile(false);
            console.log(err)
            return  {signature:null, message:err.message};
        })
        
        if(signature){
            try{
            await updateUser({
                address : data.userAccount,
                username : formEditProfile.username,
                email : formEditProfile.email,
                country: formEditProfile.country,
                about : formEditProfile.description,
                twitter : formEditProfile.social_media.twitter,
                facebook : formEditProfile.social_media.instagram,
                bannerURL : bannerURL,
                profilePicURL: profilePicURL,
                signature : signature,
                message : message
            }).then((res)=>{
                setDataTemp({...dataTemp,username:username,email:email});
                setMsg(t("profile.update_successful"));
                setError(false);
                setInitEditProfile(false);
                setLoad(false);
                let timeOut = setTimeout(()=>{
                    setMsg("");
                    setOpenModalForm(false)
                    clearTimeout(timeOut);
                },1500)
                console.log(res);
            })
            .catch(err=>{
                setInitEditProfile(false);
                setLoad(false);
                setError(true);
                setMsg(err.message);
                console.log("debug err::",err);
            })
            }catch(error){
                alert(error);
            }
        }else{
            setMsg(message);
            setError(true);
            setLoad(false);
        }
    }

    const handleSubmitEditProfile = async(e)=>{
        e.preventDefault();
        let temp = 22;
        const {username,email} = formEditProfile;
        if(validNotChanges()){
            if(temp == 22 && (validInputs() || validPictures()) || (validInputs() && validPictures())){
                console.log("debug form actual::",formEditProfile)
                setMsg("");
                setError(false);
                setInitEditProfile(true); 
                setLoad(true);
                handleUpdateData(username,email) 
                setInitEditProfile(false);   
            }
        }
        else{
            setMsg(t("profile.edit_profile_from.without_changes_text"));
            setError(false);
        }
    }

    const handleChangeProfileData = (e) =>{
        const {name,files} = e.target;
      
        if( name == "avatar" || name && name == "banner"){
            if (files &&  files.length > 0){
                let reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onloadend = function() {
                    let base64data = reader.result;                
                    if(name == "avatar"){
                        setFormEditProfile({...formEditProfile,[name]:base64data,fileAvatar:files[0],validateAttr:{...formEditProfile.validateAttr,avatar:true}});
                    }
                    else{
                        setFormEditProfile({...formEditProfile,[name]:base64data,fileBanner:files[0],validateAttr:{...formEditProfile.validateAttr,banner:true}});
                    }
                }      
            }
        }   
        console.log("debug formEditProfile::",formEditProfile," name::",name);
    }

    const handleChangeTextarea = (e) =>{
        e.preventDefault();
        if((formEditProfile.description+'').length > 800){
            setFormEditProfile({...formEditProfile,description:formEditProfile.description.substring(0,800)});
        }           
    }

    const validUrlInstagram = () =>{
        let band = formEditProfile.social_media.instagram+'';
        if(band.includes("https://www.instagram.com") || band.includes("https://instagram.com"))
            setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,instagram:true}});
        else
            setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,instagram:false}});
    }

    const validUrlTwitter = () =>{
        let band = formEditProfile.social_media.twitter+'';
        if(band.includes("https://www.twitter.com") || band.includes("https://twitter.com"))
            setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,twitter:true}});
        else
            setFormEditProfile({...formEditProfile,validateAttr:{...formEditProfile.validateAttr,twitter:false}});
    }

    return (
        <form onSubmit={(e)=>handleSubmitEditProfile(e)}>
            <center>
                <Input sx={{display:'none'}}
                    id="file-avatar"
                    type='file'
                    disableUnderline
                    disabled={load}
                    onChange={(e)=>handleChangeProfileData(e)}
                    name={"avatar"} 
                    accept="image/png, image/gif, image/jpeg"
                />
                <Input sx={{display:'none'}}
                    id="file-banner"
                    type='file'
                    disableUnderline
                    disabled={load}
                    onChange={(e)=>handleChangeProfileData(e)}
                    property={{
                        name:'banner'
                    }}
                    name={"banner"}
                    accept="image/png, image/gif, image/jpeg"
                />
            </center>
            
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:{xs:"repeat(1,1fr)",sm:"repeat(1,1fr)",md:"repeat(1,1fr)",lg:"repeat(1,1fr)"},
                }}
            >
                
                <Box
                    sx={{
                        width: "100%"
                    }}
                >
                    <Box
                        sx={{
                            width:'100%',
                            display:'flex',
                            marginTop:'15px',
                            justifyContent:'space-around',
                            gap:'15px'
                        }}
                    >   

                        <Box
                                sx={{
                                    color:'#000',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                                }}
                            >
                                <label htmlFor="file-avatar" 
                                    name="avatar"
                                    style={{ 
                                        width:'135px',
                                        height:'135px',
                                        borderRadius:'50%',
                                        color:'#1B2635',
                                        cursor:'pointer'
                                    }}
                                >
                                <Box 
                                    sx={{
                                        width:'135px',
                                        height:'135px',
                                        borderRadius:'50%',
                                        border:'1px solid #000',
                                        cursor:'pointer',
                                        "&:hover":{
                                            backgroundColor:'#E3E3E3',
                                        }
                                    }}
                                >
                                    {   formEditProfile.avatar != ''?
                                        <Avatar
                                            alt="Avatar"
                                            src={formEditProfile.avatar}
                                            sx={{width:'100%',
                                            height:'100%'}}
                                        />
                                        :
                                        <Box sx={{padding:'25px'}}>
                                            <PersonOutlineIcon htmlColor='#000' sx={{width:'100%',height:'100%'}}/>   
                                        </Box> 
                                    }                                 
                                </Box>
                                    
                                </label>
                                <center>
                                    {t("profile.modal_edit.avatar")}
                                </center>
                                <center>
                                    <Box component="span" sx={{color:'#9B9B9B',fontSize:'14px'}}>({t("profile.modal_edit.recommended")}: 200x200)</Box>
                                </center>
                        </Box>
                        <Box
                                sx={{
                                    color:'#000',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                }}
                            >
                                <label  htmlFor="file-banner"
                                    style={{ 
                                        width:'135px',
                                        height:'135px',
                                        borderRadius:'50%',
                                        color:'#fff',
                                        cursor:'pointer'
                                    }}
                                    name="banner"
                                >
                                <Box 
                                
                                    sx={{
                                        width:'135px',
                                        height:'135px',
                                        borderRadius:'8px',
                                        border:'1px solid #000',
                                        cursor:'pointer',
                                        "&:hover":{
                                            backgroundColor:'#E3E3E3',
                                        }
                                    }}
                                >
                                    {
                                        formEditProfile.banner != ''?
                                        <Avatar
                                            variant="square"
                                            alt="Avatar"
                                            src={formEditProfile.banner}
                                            sx={{width:'100%',
                                            height:'100%'}}
                                        />
                                        :
                                        <Box sx={{padding:'25px'}}>
                                            <PhotoCameraBackIcon htmlColor='#000' sx={{width:'100%',height:'100%'}}/> 
                                        </Box> 
                                    }
                                </Box>
                                </label>
                                <center>
                                    {t("profile.modal_edit.banner")}
                                </center>
                                <center>
                                    <Box component="span" sx={{color:'#9B9B9B',fontSize:'14px'}}>({t("profile.modal_edit.recommended")}: 600x300)</Box>
                                </center>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width:'100%',
                            display:'grid',
                            gridTemplateColumns:{xs:"repeat(1,1fr)",sm:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(2,1fr)"},
                        }}
                    >
                        <Box>
                            <Box 
                                sx={{
                                    width:'100%',
                                    display:'flex',
                                    marginTop:'15px',
                                    justifyContent:'space-around',
                                    "@media (max-width: 768px)": {
                                        display:'grid',
                                        width:'100%',
                                        gridTemplateColumns:'1fr',
                                    }
                                }}
                            >
                                <UserNameInputType1
                                    setMsg={setMsg}
                                    setError={setError}
                                    isEditProfile={load} 
                                    form={formEditProfile} 
                                    setForm={setFormEditProfile} 
                                    name={"username"} 
                                    label={t("profile.modal_edit.username")} 
                                    placeholder={"username"}
                                    helperText={t("profile.modal_edit.enter_username")}
                                />
                                <EmailInputType1
                                    isEditProfile={load} 
                                    form={formEditProfile} 
                                    setForm={setFormEditProfile} 
                                    name={"email"} 
                                    placeholder={"email"}
                                    label={t("profile.modal_edit.email")} 
                                    emailTemp={dataTemp.email}
                                    helperText={t("profile.modal_edit.enter_email")}
                                />


                            </Box>
                            <Box
                                sx={{
                                    width:'100%',
                                    display:'flex',
                                    marginTop:'15px',
                                    justifyContent:'space-around'
                                }}
                            >
                                <Box display='flex' flexDirection='column'
                                        sx={{
                                            width:'100%',
                                            padding:{xs:'0px 5px',sm:'0px 13px',md:'0px 13px',lg:'0px 13px'},
                                            fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                        }}
                                    >
                                        <Box component='label' htmlFor='instagram'>Instagram</Box>
                                        <Input 
                                            disabled={load}
                                            type='text' 
                                            placeholder='https://www.instagram.com/username'
                                            onChange={(e)=>setFormEditProfile({...formEditProfile, social_media:{...formEditProfile.social_media, instagram:e.target.value}})}  
                                            value={formEditProfile.social_media.instagram && formEditProfile.social_media.instagram !='no' ? formEditProfile.social_media.instagram : ''}
                                            onBlur={validUrlInstagram}
                                            error={formEditProfile.validateAttr.instagram != null ? !formEditProfile.validateAttr.instagram : false}
                                        />
                                        {
                                            formEditProfile.validateAttr.instagram != null && formEditProfile.validateAttr.instagram == false &&
                                            <small style={{color:'red'}}>Enter a valid instagram url</small>
                                        }
                                </Box>
                                        
                                <Box display='flex' flexDirection='column'
                                    sx={{
                                        width:'100%',
                                        padding:{xs:'0px 5px',sm:'0px 13px',md:'0px 13px',lg:'0px 13px'},
                                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                                    }}
                                >
                                    <Box component='label' htmlFor='twitter'>Twitter</Box>
                                    <Input 
                                        disabled={load}
                                        type='text' 
                                        placeholder='https://twitter.com/username'
                                        onChange={(e)=>setFormEditProfile({...formEditProfile, social_media:{...formEditProfile.social_media, twitter:e.target.value}})}
                                        value={formEditProfile.social_media.twitter ? formEditProfile.social_media.twitter : ''}
                                        onBlur={validUrlTwitter}
                                        error={formEditProfile.validateAttr.twitter != null ? !formEditProfile.validateAttr.twitter : false}
                                    />
                                    {
                                        formEditProfile.validateAttr.twitter != null && formEditProfile.validateAttr.twitter == false &&
                                        <small style={{color:'red'}}>Enter a valid twitter url</small>
                                    }
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Box component='h2' 
                                sx={{
                                    textAlign:'center',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                                }}
                            >
                                {t("profile.modal_edit.description")}
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <textarea 
                                    disabled={load}
                                    style={{width:'100%', height:'150px', overflow:'auto', resize: 'vertical',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif'}}
                                    onChange={(e)=>setFormEditProfile({...formEditProfile, description:e.target.value})}
                                    onKeyUp={(e)=>handleChangeTextarea(e)}
                                    value={formEditProfile.description}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'flex-end'
                                }}
                            >
                                <Box component="span" sx={{color:'#9B9B9B',fontSize:'14px'}}>({t("profile.modal_edit.max_characters")} 800)* | Total: {String(formEditProfile.description).length} </Box>
                            </Box>

                        </Box>
                    </Box>   
                </Box>

            </Box>

            <Box
                sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:'15px',marginBottom:'15px'}}
            >
                {
                    load ?
                    <CircularProgress size={24}
                        sx={{
                            color: '#000',
                            marginLeft: '5px'
                        }}
                    />
                    :
                    <ButtonStyled
                        isDisabled= {load}
                        text={t("profile.modal_edit.save_btn")}
                    />
                }

            </Box>
            <Container  maxWidth="sm">
                <center>
                {
                    msg != '' &&
                    <Alert severity={error ? "error":"success"} sx={{display:'flex',justifyContent:'center'}}>{msg}</Alert>
                }
                </center>
            </Container>
        </form>
    );
};


FormMyData.propTypes = {
    formEditProfile: PropTypes.object,
    setFormEditProfile: PropTypes.func,
    isSetEditProfile: PropTypes.func,
    setInitEditProfile : PropTypes.func,
    user: PropTypes.object,
    address: PropTypes.string,
    data: PropTypes.object,
    dataTemp: PropTypes.object,
    setDataTemp: PropTypes.func,
    showMsgRegister: PropTypes.bool,
    setShowMsgRegister: PropTypes.func,
    getMyDataProfile: PropTypes.func,
    showMyInfo: PropTypes.bool,
    setOpenModalForm: PropTypes.func
}


export default FormMyData;