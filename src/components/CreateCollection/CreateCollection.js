import React, { useRef, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import ImagePreview from './components/ImagePreview';
import ButtonStyled from './components/ButtonStyled';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';
import LoaderModal from './components/LoaderModal';
import { useHistory } from "react-router-dom";
import {TextField, UploadFile } from './styles/styles';
import ErrorMessage from './components/ErrorMessage';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import customToolBar from './utils/customToolBar';

/* Validating the form fields. */
const collectionSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is required'),
    image: Yup.mixed()
    .nullable() ,
    banner: Yup.mixed()
    .nullable() 
    .test("FILE_SIZE", "Uploaded file is too big.",
        value => !value || (value && value.size <= 20900000000))
});

const formats = ['PNG','GIF','JPG','MP4','JPEG'];

/**
 * It's a function that returns a form to create a project (collection)
 * @returns A component CreateCollection 
 */
const CreateCollection = ({sign,data,t,isValidFormat,isVideo,nameAndSymbol,imgDefaultPreview,api,domain}) => {
    let maxImgSize = 2097152 // 2097152 bytes = 2 MB
    const [preview, setPreview] = useState('');
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

    const [editorState,setEditorState] = React.useState()
    const [editorTemp,setEditorTemp] = React.useState(null)
    const [errorEditor,setErrorEditor] = React.useState(false)

    const [msgError, setMsgError] = useState('');
    const [msgFile,setMsgFile] = useState('');
    const [msgFileBanner,setMsgFileBanner] = useState('');
    const [fileBanner,setFileBanner] = useState(null)

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

    const handleDragOverBanner = (e)=>{
        e.preventDefault();
    }

    const removeDragData = (ev) => {
        if (ev.dataTransfer.items) {
            ev.dataTransfer.items.clear();
        } else {
            ev.dataTransfer.clearData();
        }
    }

    /**
     * It takes a file, reads it as a dataURL, and then sets the state of the component to the dataURL.
     * @param file - the file that is being uploaded
     */
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

    /**
     * It takes a file, reads it, and then sets the state of the component.
     * @param file - the file that is being uploaded
     */
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

    /**
     * If the value is a file, check if it's a valid format, if it's not, set the error message, if it
     * is, set the error message to an empty string and handle the preview.
     * @param value - the value of the input file
     * @returns the value of the variable msgFile.
     */
    const validateDrag = (value) =>{
        if(value.kind === 'file') {
            let newFile = value.getAsFile();
            if(!isValidFormat(newFile,formats)) {setMsgFile(t("create_collection.message_error.invalid_file")); return 0;}
            setMsgFile('')
            handlePreview(newFile)
        }
    }

    /**
     * It validates the file dragged into the dropzone and if it's valid, it sets the file to the
     * state.
     * @param value - is the file that is being dragged
     * @returns the value of the last statement in the function.
     */
    const validateDragBanner = (value) =>{
        if(value.kind === 'file') {
            let newFile = value.getAsFile();
            if(!isValidFormat(newFile,formats)) {setMsgFileBanner(t("create_collection.message_error.invalid_file")); return 0;}
            setMsgFileBanner('')
            if(newFile && String(newFile.type).includes("image") && newFile.size > maxImgSize ){
                setMsgFileBanner(t("create_collection.message_error.file_is_to_big"));
                return 
            }
            let formData = new FormData();
            formData.append("files", newFile);
            setFileBanner(formData)
            handleBannerPreview(newFile)
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
        removeDragData(e)
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setMsgFile('')
        if(isValidFormat(file,formats)) {
            handlePreview(file)
        } else {
            setMsgFile(t("create_collection.message_error.invalid_file"))
        }
    }

    const handleFileInputBanner = (e) => {
        const file = e.target.files[0];
        setMsgFileBanner('')
        if(file && String(file.type).includes("image") && file.size > maxImgSize ){
            setMsgFileBanner(t("create_collection.message_error.file_is_to_big"));
            return 
        }
        if(isValidFormat(file,formats)) {
            let formData = new FormData();
            formData.append("files", file);
            setFileBanner(formData)
            handleBannerPreview(file)
        } else {
            setMsgFileBanner(t("create_collection.message_error.invalid_file"))
        }
    }

    const uploadThumbnail = (thumbnail, isVideo, time = -1) => {
        return new Promise((resolve, reject) => {
            try {
                let type = isVideo ? "video" : "img";
                let url = `${api}/thumbnail?domain=${domain}&type=${type}&time=${time}`
                console.log('url ::', url);
                let headers = {
                'Content-Type': 'multipart/form-data'
                }
                axios.post(url, thumbnail, { headers :headers}).then((success) => {
                    resolve(success.data.url)
                }).catch((err)=> reject(err))
            } catch (error) {
                reject(error)
            }
        })
    }

    const uploadBannerMedia = (file) => {
        return new Promise((resolve, reject) => {
            try {
                let url = `${api}/extra-files`
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

    React.useEffect(() => {
        let customScroll = document.querySelector(".custom-scroll")
        if(customScroll){
            customScroll.scrollTo(0,0)
        }
        window.scrollTo(0,0)
        setEditorState('');
    },[]);
   
    return (
        <React.Fragment>
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
                                        try{

                                        
                                            setErrorEditor(false)
                                            if(values.description == '' || values.description && values.description.getCurrentContent && String(draftToHtml(convertToRaw(values.description.getCurrentContent()))) == "<p></p>\n"){
                                                setErrorEditor(true)
                                                return null;
                                            }
                                            window.scrollTo(0, 0);
                                            setSubmitting(true);
                                        /* Uploading a video to the server. */
                                            if(preview) {
                                                if(preview.data) {
                                                    console.log('Submit data ::', values)
                                                    let currentTime = currentDateVideo()
                                                    let thumb_url = await uploadThumbnail(preview.data, preview.isVideo,currentTime).catch((err)=>{ setMsgError(err); setSubmitting(false)});
                                                    let data_banner = await uploadBannerMedia(fileBanner).catch((err)=>{ setMsgError(err); setSubmitting(false)});
                                                    console.log('banner ::', data_banner)
                                                    let msg = "Approve my intention of create project at";
                                                    let {signature , message} = await sign(msg,data.userAccount,data.provider).catch((err)=>{ setMsgError(err); setSubmitting(false)});
                                                    let { name, symbol} = nameAndSymbol(values.name);
                                                    console.log('name',name)
                                                    let collection = {
                                                        address_collectible : (signature.substring(1,42)+symbol),
                                                        tags: [],
                                                        categories : [],
                                                        social_networks : [],
                                                        files_url : [],
                                                        commission : [],
                                                        external_url : '',
                                                        description : String(draftToHtml(convertToRaw(values.description.getCurrentContent()))),
                                                        name : values.name,
                                                        thumb_url : thumb_url,
                                                        banner_url : data_banner.urls[0],
                                                        signature : signature,
                                                        message : message,
                                                        is_video : (preview.isVideo)? 1 : 0,
                                                        domain : domain,
                                                        action : 'CREATED_PROJECT',
                                                        blockchain_name : process.env.REACT_APP_NETWORK_NAME,
                                                        thumb_second: preview.isVideo ? Math.round(timeVideoRef.current.currentTime) : -1,
                                                    }
                                                    await axios.post(api+ `/project?domain=${domain} `,collection)
                                                        .then((success) => {
                                                        console.log('success ::', success)
                                                        resetForm()
                                                        setSubmitting(false);
                                                        history.push('/create')
                                                        }).catch((error) => {
                                                            console.log('error ::', error)
                                                            setMsgError(error);
                                                            setSubmitting(true);
                                                        })
                                                }
                                            }
                                            console.log('Submit data',values);
                                        }catch(err){
                                            setMsgError(err);
                                            setSubmitting(false);
                                        }
                                    }}
                                >
                                    {({ errors, touched,values,setValues,isSubmitting}) =>(
                                    <Form name='collection'>
                                        <Container maxWidth='sm'>
                                            <Box>
                                                <Box 
                                                    component='h1'
                                                    sx={{
                                                        fontSize:'25px',
                                                        marginBottom:'0px',
                                                        marginTop:'0px',
                                                        color:'#fff',
                                                        fontFamily:'BentonSansBBVA-Medium,sans-serif'
                                                    }}
                                                >
                                                    {t('create_collection.upload_image')}
                                                </Box>
                                                <Box 
                                                    sx={{
                                                        fontSize:'14px',
                                                        marginTop:'10px',
                                                        marginBottom:'10px',
                                                        color:'#D1D1D1',
                                                        fontFamily:'BentonSansBBVA-Medium,sans-serif'
                                                    }}
                                                >
                                                    {t('create_collection.drag_or_img_or_video')}
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
                                                                color:'#D1D1D1',
                                                                fontFamily:'BentonSansBBVA-Medium,sans-serif'
                                                            }}
                                                        >
                                                            PNG, GIF, JPG, MP4 Max 50MB.
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <UploadFile 
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
                                                <div style={{color:'#dc3545',fontFamily:'BentonSansBBVA-Medium,sans-serif'}}>{errors.image}</div>
                                            ) : null}
                                            {
                                                msgFile != '' && 
                                                <div style={{color:'#dc3545',fontFamily:'BentonSansBBVA-Medium,sans-serif'}}>{msgFile}</div>
                                            }
                                            <Box>
                                                <Box 
                                                    component='h1'
                                                    sx={{
                                                        fontSize:'25px',
                                                        marginBottom:'0px',
                                                        marginTop:'0px',
                                                        color:'#fff',
                                                        fontFamily:'BentonSansBBVA-Medium,sans-serif'
                                                    }}
                                                >
                                                    {t('create_collection.upload_banner')}
                                                </Box>
                                                <Box 
                                                    sx={{
                                                        fontSize:'14px',
                                                        marginTop:'10px',
                                                        marginBottom:'10px',
                                                        color:'#D1D1D1',
                                                        fontFamily:'BentonSansBBVA-Medium,sans-serif'
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
                                                                color:'#D1D1D1',
                                                                fontFamily:'BentonSansBBVA-Medium,sans-serif'
                                                            }}
                                                        >
                                                            PNG, GIF, JPG Max 2MB.
                                                        </Box>
                                                        <Box 
                                                            sx={{
                                                                fontSize:'14px',
                                                                color:'#D1D1D1',
                                                                fontFamily:'BentonSansBBVA-Medium,sans-serif'
                                                            }}
                                                        >
                                                            {t("profile.modal_edit.recommended")}: (1400 x 400)
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
                                                <div style={{color:'#dc3545',fontFamily:'BentonSansBBVA-Medium,sans-serif'}}>{errors.banner}</div>
                                            ) : null}
                                            {
                                                msgFileBanner != '' && 
                                                <div style={{color:'#dc3545',fontFamily:'BentonSansBBVA-Medium,sans-serif'}}>{msgFileBanner}</div>
                                            }
                                            <Box sx={{marginTop:'1rem', marginBottom:'1rem'}}>
                                                <Box 
                                                    component='label' 
                                                    htmlFor='name'
                                                    sx={{
                                                        fontSize:'25px',
                                                        color:'#fff',
                                                        fontFamily:'BentonSansBBVA-Medium,sans-serif'
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
                                                    <div style={{color:'#dc3545',fontFamily:'BentonSansBBVA-Medium,sans-serif'}}>{errors.name}</div>
                                                ) : null}
                                            </Box>
                                            <Box sx={{marginBottom:'1rem'}}>
                                                <Box 
                                                    component='label' 
                                                    htmlFor='description'
                                                    sx={{
                                                        fontSize:'25px',
                                                        color:'#fff',
                                                        fontFamily:'BentonSansBBVA-Medium,sans-serif'
                                                    }}
                                                >
                                                    {t('create_collection.description')} <span style={{color:'#dc3545'}}>*</span>  <Box component="span" sx={{color:'#D1D1D1',fontSize:'14px'}}>({t('create_collection.max_characters')})</Box>
                                                </Box>
                                               
                                                
                                                <Box sx={{background:'#1973B8',padding:'10px'}}>
                                                    <Box
                                                        id='description'
                                                        name='description'
                                                        component={Editor}
                                                        toolbar={customToolBar}
                                                        placeholder={t('create_collection.description')}
                                                        editorState={editorState}
                                                        toolbarClassName="toolbarClassName"
                                                        wrapperClassName="wrapperClassName"
                                                        editorClassName="editorClassName"
                                                        onEditorStateChange={setEditorState}
                                                        marginX={10}
                                                        onChange={
                                                            ()=>{
                                                                if(editorState && editorState.getCurrentContent){
                                                                    if(String(draftToHtml(convertToRaw(editorState.getCurrentContent()))).length <= 3500){
                                                                        setEditorTemp(editorState)
                                                                        setValues({...values,description:editorState})
                                                                    }else{
                                                                        setValues({...values,description:editorTemp})
                                                                        setEditorState(editorTemp)
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    />
                                                </Box>
                                                {errorEditor || editorState && editorState.getCurrentContent && String(draftToHtml(convertToRaw(editorState.getCurrentContent()))) == "<p></p>\n" ? (
                                                    <div style={{color:'#dc3545',fontFamily:'BentonSansBBVA-Medium,sans-serif'}}>Description is required</div>
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
                                <ImagePreview timeVideoRef={timeVideoRef} title={t('create_collection.preview_image')} image={preview.src} isVideo={preview.isVideo} imgDefaultPreview={imgDefaultPreview} />
                                {(showPanelVideo) &&
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{gap:'1rem', marginTop:'1rem'}}>
                                    {/* <Slider value={videoTimer} aria-label="Default" valueLabelDisplay={timeVideoRef.current?.currentTime} onChange={handleCurrentTime} /> */}
                                    <input type = 'range' min = '0' max = {`${timeVideoRef.current.duration}`} step = '0.1' value = {current} onChange = {handleCurrentTime} />
                                    <div style={{textAlign:'center',color:'#FEFFFF'}}>{t("create_collection.select_frame")}</div>
                                </Box>}
                                <ImagePreview timeVideoRef={timeVideoBannerRef} title={t('create_collection.preview_banner')} image={bannerPreview.src} isVideo={bannerPreview.isVideo} imgDefaultPreview={imgDefaultPreview} />
                                {(showPanelBannerVideo) &&
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{gap:'1rem', marginTop:'1rem'}}>
                                    {/* <Slider value={videoTimer} aria-label="Default" valueLabelDisplay={timeVideoRef.current?.currentTime} onChange={handleCurrentTime} /> */}
                                    <input type = 'range' min = '0' max = {`${timeVideoBannerRef.current.duration}`} step = '0.1' value = {currentBanner} onChange = {handleCurrentBannerTime} />
                                    <div style={{textAlign:'center',color:'#FEFFFF'}}>{t("create_collection.select_frame")}</div>
                                </Box>}
                            </Grid>
                        </Grid>
                    </Box>
                    {
                        msgError != '' &&
                        <Box sx={{color:'red'}}><ErrorMessage error={msgError} t={t}  /></Box>
                    }
            </Box>
        </React.Fragment>
       
    )
}

CreateCollection.propTypes = {
    sign: PropTypes.func,
    data: PropTypes.object,
    t: PropTypes.any,
    isValidFormat: PropTypes.func,
    isVideo: PropTypes.func,
    nameAndSymbol: PropTypes.func,
    imgDefaultPreview: PropTypes.string,
    api: PropTypes.string,
    domain: PropTypes.string
};


export default CreateCollection;
