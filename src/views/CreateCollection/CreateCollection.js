import React, { useRef, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import ImagePreview from 'components/ImagePreview';
import ButtonStyled from 'components/ButtonStyled';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router";
import { sign } from 'services/Utils/signature';
//import { deploy } from 'services/ERC721/deploy';
import { Context } from 'hooks/WalletContext'
import { isValidFormat, isVideo } from 'services/Utils/validateFileFormat';
import LoaderModal from 'components/LoaderModal';
import { nameAndSymbol } from 'services/ERC721/nameAndSymbol';
import { useTranslation } from 'react-i18next';
import { TextArea, TextField, UploadFile } from './styles/styles';
import ErrorMessage from 'components/ErrorMessage';

const collectionSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is required'),
    description: Yup.string()
        .min(3, 'Too Short!')
        .max(500, 'Too Long!')
        .required('Description is required'),
    image: Yup.mixed()
    .nullable() ,
    banner: Yup.mixed()
    .nullable() 
    //.notRequired()
    .test("FILE_SIZE", "Uploaded file is too big.",
        value => !value || (value && value.size <= 20900000000))
});

const formats = ['PNG','GIF','JPG','MP4','JPEG']

const CreateCollection = () => {
    const { t } = useTranslation("translate");
    const {data} = React.useContext(Context)
    const [preview, setPreview] = useState('');
    const [banner, setBanner] = useState('');
    const [bannerPreview, setBannerPreview] = useState('');
    const [showPanelVideo, setShowPanelVideo] = useState(false);
    const [showPanelBannerVideo, setShowPanelBannerVideo] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [current, setCurrent] = useState(0);
    const hiddenFileInput = useRef(null);
    const hiddenFileInputBanner = useRef(null);
    const history = useHistory()
    const timeVideoRef = useRef(null);
    const timeVideoBannerRef = useRef(null);
    const [error,setError] = useState(null);

    const handleCurrentTime = (e) => {
        if(timeVideoRef.current) {
            timeVideoRef.current.currentTime = e.target.value;
            setCurrent(e.target.value);
        }
    }

    const handleCurrentBannerTime = (e) => {
        if(timeVideoBannerRef.current){
            timeVideoBannerRef.current.currentTime = e.target.value;
            setCurrentBanner(e.target.value);
        }
    }

    const cancel = () => {
        history.push('/home')
    }

    const handleDragOver = (e)=>{
        e.preventDefault();
    }

    function removeDragData(ev) {
        if (ev.dataTransfer.items) {
            ev.dataTransfer.items.clear();
        } else {
            ev.dataTransfer.clearData();
        }
    }

    const handlePreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        let formData = new FormData();
        formData.append("thumbnail", file);
        reader.onload = () => {
            let preview = {
                src : reader.result,
                isVideo : isVideo(file),
                data : formData,
            }
            if(preview.isVideo) {
                window.setTimeout(()=>{
                    setShowPanelVideo(true);
                }, 100)
                window.clearTimeout(timeVideoRef.current);
            }else {
                setShowPanelVideo(false);
            }
            setPreview(preview);
        };
    }

    const handleBannerPreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        let formData = new FormData();
        formData.append("thumbnail", file);
        reader.onload = () => {
            let preview = {
                src : reader.result,
                isVideo : isVideo(file),
                data : formData,
            }
            if(preview.isVideo) {
                window.setTimeout(()=>{
                    setShowPanelBannerVideo(true);
                }, 100)
                window.clearTimeout(timeVideoRef.current);
            }else {
                setShowPanelBannerVideo(false);
            }
            setBannerPreview(preview);
        };
    }

    const handleDrop = (e)=>{
        e.preventDefault();
        if (e.dataTransfer.items) {
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();
                    if(isValidFormat(file,formats)) {
                        handlePreview(file)
                    } else {
                        alert("Invalid file")
                    }
                  }
                }
            }
        removeDragData(e)
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if(isValidFormat(file,formats)) {
            handlePreview(file)
        } else {
            alert("Invalid file")
        }
    }

    const handleFileInputBanner = (e) => {
        const file = e.target.files[0];
        if(!isVideo(file)) {
            let formData = new FormData();
            formData.append("files", file);
            setBanner(formData)
            handleBannerPreview(file);
        } else {
            alert("Invalid file")
        }
    }

    const uploadThumbnail = (thumbnail, isVideo, time = -1) => {
        return new Promise((resolve, reject) => {
            try {
                let type = isVideo ? "video" : "img";
                let url = `${process.env.REACT_APP_URL_API}/thumbnail?domain=${process.env.REACT_APP_DOMAIN}&type=${type}&time=${time}`
                console.log('url ::', url);
                let headers = {
                  'Content-Type': 'multipart/form-data'
                }
                axios.post(url, thumbnail, { headers :headers}).then((success) => {
                    resolve(success.data.url)
                }).catch((err)=> {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    const uploadNFTMedia = (file) => {
        return new Promise((resolve, reject) => {
            try {
                let url = `${process.env.REACT_APP_URL_API}/extra-files`
                let headers = {
                  'Content-Type': 'multipart/form-data'
                }
                axios.post(url, file, { headers :headers}).then((success) => {
                    resolve(success.data)
                }).catch((err)=> reject(err))
            } catch (error) {
                reject(error)
            }
        })
    }

    const  currentDateVideo = () => {
        let currentTime = -1;
        if(preview.isVideo) {
            currentTime = current
        }
        return currentTime
    }

    return (
        <>
            <Box sx={{marginBottom:'1rem'}}>
                    <Box 
                        component='h1' 
                        sx={{
                            fontSize:'30px',
                            textAlign:'center',
                            color:'#fff'
                        }}
                    >
                        {t('create_collection.title')}
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        sx={{
                            padding:'0 20vw',
                            '@media (max-width: 600px)': {
                                padding:'0 5vw',
                            }
                        }}
                    >
                        <Grid container rowSpacing={5} columns={{sm:12, md:12, lg:12, xl:12}} sx={{marginTop:'1rem'}}>
                            <Grid item sm={12} md={6} lg={8} xl={8}>
                                <Formik
                                    initialValues={{
                                        image: '',
                                        name: '',
                                        description: '',
                                        termsAndConditions: false
                                    }}
                                    validationSchema={collectionSchema}
                                    onSubmit={async(values, { setSubmitting, resetForm }) => {
                                        window.scrollTo(0, 0);
                                        setSubmitting(true);
                                        setError(null);
                                        if(preview) {
                                            if(preview.data) {
                                                console.log('Submit data ::', values)
                                                let currentTime = currentDateVideo()
                                                let thumb_url = await uploadThumbnail(preview.data, preview.isVideo,currentTime).catch((err)=>{
                                                    setError(err); 
                                                    setSubmitting(false)
                                                });
                                                let data_banner = await uploadNFTMedia(banner).catch((err)=>{
                                                    setError(err); 
                                                    setSubmitting(false)
                                                });
                                                if(thumb_url && data_banner){
                                                    let msg = "Approve my intention of create project at";
                                                    let {signature , message} = await sign(msg,data.userAccount,data.provider)
                                                        .catch((error) => {
                                                            setError(error);
                                                        })
                                                    let { name, symbol} = nameAndSymbol(values.name);
                                                    console.log(name)
                                                    let collection = {
                                                        address_collectible : (signature.substring(1,42)+symbol),
                                                        tags: [],
                                                        categories : [],
                                                        social_networks : [],
                                                        files_url : [],
                                                        commission : [],
                                                        external_url : '',
                                                        description : values.description,
                                                        name : values.name,
                                                        thumb_url : thumb_url,
                                                        banner_url : data_banner.urls[0],
                                                        signature : signature,
                                                        message : message,
                                                        is_video : (preview.isVideo)? 1 : 0,
                                                        domain : process.env.REACT_APP_DOMAIN,
                                                        action : 'CREATED_PROJECT',
                                                        blockchain_name : process.env.REACT_APP_NETWORK_NAME,
                                                        thumb_second: preview.isVideo ? Math.round(timeVideoRef.current?.currentTime) : -1,
                                                    }
                                                    await axios.post(process.env.REACT_APP_URL_API+ `/project?domain=${process.env.REACT_APP_DOMAIN} `,collection)
                                                        .then((success) => {
                                                        console.log('success ::', success)
                                                        resetForm()
                                                        setSubmitting(false);
                                                        history.push('/create')
                                                        }).catch((error) => {
                                                            console.log('error ::', error)
                                                            setSubmitting(false)
                                                            setError(error);
                                                        })
                                                }else{
                                                    setSubmitting(false)
                                                }
                                            }
                                        }
                                        console.log('Submit data',values);
                                    }}
                                >
                                    {({ errors, touched, isSubmitting}) =>(
                                    <Form name='collection'>
                                        <Container maxWidth='sm'>
                                            <Box>
                                                <Box 
                                                    component='h1'
                                                    sx={{
                                                        fontSize:'25px',
                                                        marginBottom:'0px',
                                                        marginTop:'0px',
                                                        color:'#fff'
                                                    }}
                                                >
                                                    {t('create_collection.upload_image')}
                                                </Box>
                                                <Box 
                                                    sx={{
                                                        fontSize:'14px',
                                                        marginTop:'10px',
                                                        marginBottom:'10px',
                                                        color:'#D1D1D1'
                                                    }}
                                                >
                                                    {t('create_collection.drag_or_choose')}
                                                </Box>
                                                <Box
                                                    component='section'
                                                    display='flex'
                                                    flexDirection='column'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    onDrop={handleDrop}
                                                    onDragOver={handleDragOver}
                                                    onClick={() => hiddenFileInput.current.click()}
                                                    sx={{
                                                        border: '1px solid #E5E5E5',
                                                        height: '200px',
                                                        width: '100%',
                                                        borderRadius: '8px',
                                                        padding: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Box 
                                                        component='article' 
                                                        display='flex' 
                                                        flexDirection='column'
                                                        alignItems='center'
                                                        justifyContent='center'
                                                    >
                                                        <UploadFileIcon htmlColor='#D1D1D1' fontSize='large' />
                                                        <Box 
                                                            sx={{
                                                                fontSize:'14px',
                                                                color:'#D1D1D1'
                                                            }}
                                                        >
                                                            PNG, GIF, JPG, MP4 Max 50MB.
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <UploadFile 
                                                    id="image-collection"
                                                    data-testid='image-collection'
                                                    type='file' 
                                                    ref={hiddenFileInput}
                                                    accept="image/png, image/gif, image/jpeg, video/mp4"
                                                    name='image'
                                                    onChange={handleFileUpload}
                                                    multiple={false}
                                                />
                                            </Box>
                                            {errors.image && touched.image ? (
                                                <div style={{color:'#dc3545'}}>{errors.image}</div>
                                            ) : null}
                                            <Box>
                                                <Box 
                                                    component='h1'
                                                    sx={{
                                                        fontSize:'25px',
                                                        marginBottom:'0px',
                                                        marginTop:'0px',
                                                        color:'#fff'
                                                    }}
                                                >
                                                    {t('create_collection.upload_banner')}
                                                </Box>
                                                <Box 
                                                    sx={{
                                                        fontSize:'14px',
                                                        marginTop:'10px',
                                                        marginBottom:'10px',
                                                        color:'#D1D1D1'
                                                    }}
                                                >
                                                    {t('create_collection.drag_or_choose')}
                                                </Box>
                                                <Box
                                                    component='section'
                                                    display='flex'
                                                    flexDirection='column'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    onDrop={handleDrop}
                                                    onDragOver={handleDragOver}
                                                    onClick={() => hiddenFileInputBanner.current.click()}
                                                    sx={{
                                                        border: '1px solid #E5E5E5',
                                                        height: '200px',
                                                        width: '100%',
                                                        borderRadius: '8px',
                                                        padding: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Box 
                                                        component='article' 
                                                        display='flex' 
                                                        flexDirection='column'
                                                        alignItems='center'
                                                        justifyContent='center'
                                                    >
                                                        <UploadFileIcon htmlColor='#D1D1D1' fontSize='large' />
                                                        <Box 
                                                            sx={{
                                                                fontSize:'14px',
                                                                color:'#D1D1D1'
                                                            }}
                                                        >
                                                            PNG, GIF, JPG Max 2MB.
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <UploadFile 
                                                    data-testid='image-collection'
                                                    type='file' 
                                                    ref={hiddenFileInputBanner}
                                                    accept="image/png, image/gif, image/jpeg, video/mp4"
                                                    name='banner'
                                                    onChange={handleFileInputBanner}
                                                    multiple={false}
                                                />
                                            </Box>
                                            {errors.banner && touched.banner ? (
                                                <div style={{color:'#dc3545'}}>{errors.image}</div>
                                            ) : null}

                                            <Box sx={{marginTop:'1rem', marginBottom:'1rem'}}>
                                                <Box 
                                                    component='label' 
                                                    htmlFor='name'
                                                    sx={{
                                                        fontSize:'25px',
                                                        color:'#fff'
                                                    }}
                                                >
                                                    {t('create_collection.collection_name')}<span style={{color:'#dc3545'}}>*</span>
                                                </Box>
                                                <TextField
                                                    id='name'
                                                    type='text'
                                                    name='name'
                                                    placeholder={t('create_collection.collection_name')}
                                                />
                                                {errors.name && touched.name ? (
                                                    <div style={{color:'#dc3545'}}>{errors.name}</div>
                                                ) : null}
                                            </Box>
                                            <Box sx={{marginBottom:'1rem'}}>
                                                <Box 
                                                    component='label' 
                                                    htmlFor='description'
                                                    sx={{
                                                        fontSize:'25px',
                                                        color:'#fff'
                                                    }}
                                                >
                                                    {t('create_collection.description')} <span style={{color:'#dc3545'}}>*</span>  <Box component="span" sx={{color:'#D1D1D1',fontSize:'14px'}}>({t('create_collection.max_characters')})</Box>
                                                </Box>
                                                <TextArea
                                                    id='description'
                                                    component='textarea'
                                                    placeholder={t('create_collection.description')}
                                                    name='description'
                                                />
                                                {errors.description && touched.description ? (
                                                    <div style={{color:'#dc3545'}}>{errors.description}</div>
                                                ) : null}
                                            </Box>
                                        </Container>
                                        <Container maxWidth='sm' sx={{marginTop:'1rem'}}>
                                            <Box display='flex' justifyContent='center' alignItems='center' sx={{gap:'5px'}}>
                                                <ButtonStyled text={t('create_collection.create_btn')} type='submit'/>
                                                <ButtonStyled text={t('create_collection.cancel_btn')} type='button' onClick={cancel} />
                                            </Box>
                                        </Container>
                                        <LoaderModal
                                            setIsClosed = {() => {}}
                                            text={t('create_collection.creating_loader')}
                                            isOpen={isSubmitting}
                                            textColor='#fff'
                                            spinnerColor='#fff'
                                        />
                                    </Form>)}
                                </Formik>
                            </Grid>
                            <Grid item sm={12} md={6} lg={4} xl={4} sx={{margin:'0 auto'}}>
                                <ImagePreview timeVideoRef={timeVideoRef} title={t('create_collection.preview_image')} image={preview.src} isVideo={preview.isVideo} />
                                {(showPanelVideo) &&
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{gap:'1rem', marginTop:'1rem'}}>
                                    {/* <Slider value={videoTimer} aria-label="Default" valueLabelDisplay={timeVideoRef.current?.currentTime} onChange={handleCurrentTime} /> */}
                                    {console.log("duration::", timeVideoRef.current?.duration)}
                                    <input type = 'range' min = '0' max = {`${timeVideoRef.current?.duration}`} step = '0.1' value = {current} onChange = {handleCurrentTime} />
                                    <div style={{textAlign:'center'}}>{t("create_collection.select_frame")}</div>
                                </Box>}
                                <ImagePreview timeVideoRef={timeVideoBannerRef} title={t('create_collection.preview_banner')} image={bannerPreview.src} isVideo={bannerPreview.isVideo} />
                                {(showPanelBannerVideo) &&
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{gap:'1rem', marginTop:'1rem'}}>
                                    {/* <Slider value={videoTimer} aria-label="Default" valueLabelDisplay={timeVideoRef.current?.currentTime} onChange={handleCurrentTime} /> */}
                                    {console.log("duration::", timeVideoBannerRef.current?.duration)}
                                    <input type = 'range' min = '0' max = {`${timeVideoBannerRef.current?.duration}`} step = '0.1' value = {currentBanner} onChange = {handleCurrentBannerTime} />
                                    <div style={{textAlign:'center'}}>{t("create_collection.select_frame")}</div>
                                </Box>}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{display:'flex',justifyContent:'center'}}
                    >
                        {
                            error != null && error &&
                            <ErrorMessage error={error}  />
                        }
                    </Box>
            </Box>
        </>
       
    )
}

export default CreateCollection
