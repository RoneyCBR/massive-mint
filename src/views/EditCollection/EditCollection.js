import React, { useContext, useRef, useState } from 'react'
import { Box, Container, Grid, Modal } from '@mui/material'
import ImagePreview from 'components/ImagePreview';
import ButtonStyled from 'components/ButtonStyled';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from "react-router";
import { sign } from 'services/Utils/signature';
import { Context } from 'hooks/WalletContext'
import { isValidFormat, isVideo } from 'services/Utils/validateFileFormat';
import LoaderModal from 'components/LoaderModal';
import { useTranslation } from 'react-i18next';
import { TextArea, TextField, UploadFile } from './styles/styles';
import { useFetch } from 'hooks/useFetch';
import ErrorMessage from 'components/ErrorMessage';
import UpdatePriceCollection from './EditPrice/UpdatePriceCollection';
import Wrapper from './EditPrice/Wrapper';



const collectionSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!'),
    description: Yup.string()
        .min(3, 'Too Short!')
        .max(500, 'Too Long!'),
    image: Yup.mixed()
    .nullable() 
    //.notRequired()
    .test("FILE_SIZE", "Uploaded file is too big.",
        value => !value || (value && value.size <= 20900000000)),
    banner: Yup.mixed()
    .nullable() 
    //.notRequired()
    .test("FILE_SIZE", "Uploaded file is too big.",
        value => !value || (value && value.size <= 20900000000))
});

const formats = ['PNG','GIF','JPG','MP4','JPEG']

const EditCollection = () => {
    let maxImgSize = 2097152 // 2097152 bytes = 2 MB
    const { t } = useTranslation("translate");
    const {data} = useContext(Context)
    const [preview, setPreview] = useState('');
    const [msgError, setMsgError] = useState('');
    const [msgFile,setMsgFile] = useState('');
    const [msgFileBanner,setMsgFileBanner] = useState('');
    const [showPanelVideo, setShowPanelVideo] = useState(false);
    const [showPanelBannerVideo, setShowPanelBannerVideo] = useState(false);
    const [bannerPreview, setBannerPreview] = useState('');
    const [current, setCurrent] = useState(0);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [fileBanner,setFileBanner] = useState(null)
    const [editPriceModal, setEditPriceModal] = useState(false);
    const hiddenFileInput = useRef(null);
    const hiddenFileInputBanner = useRef(null);
    const history = useHistory();
    const timeVideoRef = useRef(null);
    const timeVideoBannerRef = useRef(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const address = query.get('project_key'); 
    const collection = `${process.env.REACT_APP_URL_API}/project?address=${address}&domain=${process.env.REACT_APP_DOMAIN}`
    const { loading, error, data:project } = useFetch(collection);

    const handleCloseUpdatePrice = () => {
        setEditPriceModal(false);
    };

    const handleCurrentTime = (e) => {
        if(timeVideoRef.current){
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
    
    const validateDrag = (value) =>{
        if(value.kind === 'file') {
            let newFile = value.getAsFile();
            if(!isValidFormat(newFile,formats)) {setMsgFile("Invalid file"); return 0;}
            setMsgFile('')
            if(newFile && String(newFile.type).includes("image") && newFile.size > maxImgSize ){
                setMsgFile("your file is too big to be uploaded");
                return 
            }
            handlePreview(newFile)
        }
    }

    const validateDragBanner = (value) =>{
        if(value.kind === 'file') {
            let newFile = value.getAsFile();
            if(!isValidFormat(newFile,formats)) {setMsgFileBanner("Invalid file"); return 0;}
            setMsgFileBanner('')
            if(newFile && String(newFile.type).includes("image") && newFile.size > maxImgSize ){
                setMsgFileBanner("your file is too big to be uploaded");
                return 
            }
            let formData = new FormData();
            formData.append("files", newFile);
            setFileBanner(formData)
            handlePreviewBanner(newFile)
        }
    }

    const handleDrop = (e)=>{
        e.preventDefault();
        let count = 0;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            for (let value of e.dataTransfer.items) {
                if(count > 0){
                    return 0;
                }
                validateDrag(value);
                count++;
            }
        }
        removeDragData(e)
    }
    const handleDropBanner = (e)=>{
        e.preventDefault();
        let count = 0;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            for (let value of e.dataTransfer.items) {
                if(count > 0){
                    return 0;
                }
                validateDragBanner(value);
                count++;
            }
        }
        handleDragOverBanner(e)
    }

    const handleDragOver = (e)=>{
        e.preventDefault();
    }
    const handleDragOverBanner = (e)=>{
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

    const handlePreviewBanner = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        let formData = new FormData();
        formData.append("thumbnail2", file);
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
                window.clearTimeout(timeVideoBannerRef.current);
            }else {
                setShowPanelBannerVideo(false);
            }
            setBannerPreview(preview);
        };
    }


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setMsgFile('')
        if(file && String(file.type).includes("image") && file.size > maxImgSize ){
            setMsgFile("your file is too big to be uploaded");
            return 
        }
        if(isValidFormat(file,formats)) {
            handlePreview(file)
        } else {
            setMsgFile("Invalid file")
        }
    }

    const uploadThumbnail = (thumbnail, isVideo, time = -1) => {
        return new Promise((resolve, reject) => {
            try {
                let type = isVideo ? "video" : "img";
                let url = `${process.env.REACT_APP_URL_API}/thumbnail?type=${type}&time=${time}&domain=${process.env.REACT_APP_DOMAIN}`
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

    const uploadBannerMedia = (file) => {
        return new Promise((resolve, reject) => {
            try {
                let url = `${process.env.REACT_APP_URL_API}/extra-files`
                let headers = {
                  'Content-Type': 'multipart/form-data'
                }
                axios.post(url, file, { headers :headers}).then((success) => {
                    if(success.status == 200){
                        resolve(success.data)
                    }
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

    const handleBannerPreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        let formData = new FormData();
        formData.append("thumbnail2", file);
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
                window.clearTimeout(timeVideoBannerRef.current);
            }else {
                setShowPanelBannerVideo(false);
            }
            setBannerPreview(preview);
           
        };
    }

    const handleFileInputBanner = (e) => {
        const file = e.target.files[0];
        setMsgFileBanner('')
        if(file && String(file.type).includes("image") && file.size > maxImgSize ){
            setMsgFileBanner("your file is too big to be uploaded");
            return 
        }
        if(isValidFormat(file,formats)) {
            let formData = new FormData();
            formData.append("files", file);
            setFileBanner(formData)
            handleBannerPreview(file)
        } else {
            setMsgFileBanner("Invalid file")
        }
    }
    if (loading) {
        return (
            <Box data-testid='loader' sx={{ minHeight: '100vh' }}>
                <LoaderModal text="loading..." />
            </Box>
        );
    }
    if (error) {
        return (
            <Box sx={{ minHeight: '100vh' }}>
                <ErrorMessage error={error} />
            </Box>
        );
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
                    {t('edit_collection.title')}
                </Box>
                <Container maxWidth="xs">
                    <Box display="flex" justifyContent="center" gap="5px" alignItems="center" sx={{ color: '#B5B8C0' }}>
                        <Box>{t("edit_collection.price_nft")}:</Box>
                        <Box display="flex" gap="10px">
                            {project && project[0].reveal && <Box>{project[0]?.reveal.price} ETH</Box>}
                            <Box sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => setEditPriceModal(true)}>
                                {t("edit_collection.update_price")}
                            </Box>
                        </Box>
                    </Box>
                </Container>
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
                    <Grid container rowSpacing={5} columns={{sm:12, md:12, lg:12, xl:12}} sx={{ paddingTop: '0px !important', marginTop: '0px' }}>
                        <Grid item sm={12} md={6} lg={8} xl={8}>
                            <Formik
                                initialValues={{
                                    image: '',
                                    name: project && project[0].name,
                                    description: project && project[0].description
                                }}
                                validationSchema={collectionSchema}
                                onSubmit={async(values, { setSubmitting, resetForm }) => {
                                    try{
                                    window.scrollTo(0, 0);
                                    setSubmitting(true);
                                    if(preview) {
                                        if(preview.data) {
                                            console.log('Submit data ::', values);
                                            let msg = "Approve my intention of update project";
                                            let { signature , message } = await sign(msg,data.userAccount,data.provider);
                                            if (signature) {
                                                let currentTime = currentDateVideo()
                                                //let currentTimeBanner = currentBannerDateVideo();
                                                let thumb_url = await uploadThumbnail(preview.data, preview.isVideo,currentTime).catch((err)=>{
                                                    setMsgError(err); 
                                                    setSubmitting(false)
                                                });
                                                let data_banner = await uploadBannerMedia(fileBanner).catch((err)=>{ 
                                                    setMsgError(err); 
                                                    setSubmitting(false)
                                                });
                                                if(thumb_url && data_banner){
                                                    let updateCollection = {
                                                        domain : process.env.REACT_APP_DOMAIN,
                                                        project_key: address,
                                                        blockchain_name : process.env.REACT_APP_NETWORK_NAME,
                                                        thumb_url : thumb_url,
                                                        banner_url : data_banner.urls[0],
                                                        description : values.description,
                                                        name : values.name,
                                                        is_video : 0,
                                                    }
                                                    console.log('data to send ::', updateCollection)
                                                    await axios.put(`${process.env.REACT_APP_URL_API}/project?domain=${process.env.REACT_APP_DOMAIN}`, updateCollection,{
                                                        headers:{
                                                            'Content-Type': 'text/plain;charset=utf-8',
                                                        }
                                                    }).then((success) => {
                                                        console.log('success ::', message, success);
                                                        resetForm()
                                                        setSubmitting(false);
                                                        history.push('/collection?address='+address);
                                                    }).catch((error) => {
                                                        console.log('error ::', error);
                                                        setMsgError(error);
                                                    })
                                                }else{
                                                    setSubmitting(false)
                                                }
                                            } else {
                                                throw new Error('error to send data');
                                            }
                                        }
                                    }
                                    console.log('Submit data',values);
                                    }catch(er){
                                        console.log('err');
                                        setSubmitting(false);
                                        setMsgError(er)
                                    }
                                }}
                            >
                                {({ errors, touched,values,isSubmitting}) =>(
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
                                                    color:'#fff'
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
                                                            color:'#D1D1D1',
                                                            fontSize:'14px',
                                                        }}
                                                    >
                                                        PNG, GIF, JPG Max 2MB.
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <UploadFile 
                                                data-testid='image-collection'
                                                type='file' 
                                                ref={hiddenFileInput}
                                                accept="image/png, image/gif, image/jpeg, video/mp4"
                                                name='image'
                                                onChange={(e)=>handleFileUpload(e)}
                                                multiple={false}
                                            />
                                        </Box>
                                        {errors.image && touched.image ? (
                                            <div style={{color:'#dc3545'}}>{errors.image}</div>
                                        ) : null}
                                        {
                                            msgFile != '' && 
                                            <div style={{color:'#dc3545'}}>{msgFile}</div>
                                        }
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
                                                onDrop={handleDropBanner}
                                                onDragOver={handleDragOverBanner}
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
                                                data-testid='image-banner'
                                                type='file' 
                                                ref={hiddenFileInputBanner}
                                                accept="image/png, image/gif, image/jpeg, video/mp4"
                                                name='banner'
                                                onChange={handleFileInputBanner}
                                                multiple={false}
                                            />     
                                        </Box>
                                        {errors.banner && touched.banner ? (
                                            <div style={{color:'#dc3545'}}>{errors.banner}</div>
                                        ) : null}
                                        {
                                            msgFileBanner != '' && 
                                            <div style={{color:'#dc3545'}}>{msgFileBanner}</div>
                                        }
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
                                                value={`${values.name}`}
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
                                                value={`${values.description}`}
                                            />
                                            {errors.description && touched.description ? (
                                                <div style={{color:'#dc3545'}}>{errors.description}</div>
                                            ) : null}
                                        </Box>
                                    </Container>
                                    <Container maxWidth='sm' sx={{marginTop:'1rem'}}>
                                        <Box display='flex' justifyContent='center' alignItems='center' sx={{gap:'5px'}}>
                                            <ButtonStyled text={t('edit_collection.btn_update')} type='submit'/>
                                            <ButtonStyled text={t('create_collection.cancel_btn')} type='button' onClick={cancel} />
                                        </Box>
                                        
                                    </Container>
                                    <LoaderModal
                                        setIsClosed = {() => {}}
                                        text={t('edit_collection.modal_loader')}
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
                                <div style={{textAlign:'center',color:'#fff'}}>{t("create_collection.select_frame")}</div>
                            </Box>}
                            <ImagePreview timeVideoRef={timeVideoBannerRef} title={t('create_collection.preview_banner')} image={bannerPreview.src} isVideo={bannerPreview.isVideo} />
                            {(showPanelBannerVideo) &&
                            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{gap:'1rem', marginTop:'1rem'}}>
                                {/* <Slider value={videoTimer} aria-label="Default" valueLabelDisplay={timeVideoRef.current?.currentTime} onChange={handleCurrentTime} /> */}
                                {console.log("duration::", timeVideoBannerRef.current?.duration)}
                                <input type = 'range' min = '0' max = {`${timeVideoBannerRef.current?.duration}`} step = '0.1' value = {currentBanner} onChange = {handleCurrentBannerTime} />
                                <div style={{textAlign:'center',color:'#fff'}}>{t("create_collection.select_frame")}</div>
                            </Box>}
                        </Grid>
                    </Grid>
                </Box>
                {
                    msgError != '' &&
                    <Box sx={{color:'red'}}><ErrorMessage error={msgError}  /></Box>
                }
                <Modal open={editPriceModal} onClose={() => setEditPriceModal(false)}>
                    <>
                    <Wrapper handleClose={handleCloseUpdatePrice}>
                        <UpdatePriceCollection projectKey={address} />
                    </Wrapper>
                    </>
                </Modal>
            </Box>
        </>
       
    )
}

export default EditCollection;
