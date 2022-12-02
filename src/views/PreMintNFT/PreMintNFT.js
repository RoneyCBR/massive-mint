import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Grid } from '@mui/material'
import ImagePreview from 'components/ImagePreview';
import ButtonStyled from 'components/ButtonStyled';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup';
import { Context } from 'hooks/WalletContext';
import { useHistory } from "react-router";
import { formats, isFormat, isValidFormat, isVideo } from 'services/Utils/validateFileFormat';
import axios from 'axios';
import { sign } from 'services/Utils/signature';
import LoaderModal from 'components/LoaderModal';
import { useTranslation } from 'react-i18next';
import { TextArea, TextField, UploadFile } from './styles/styles';
import MultiCategory from 'components/ListAutoComplete/MultiCategory/MultiCategory';



const attributesValidationSchema = Yup.object().shape({
    name: Yup.string(),
    type: Yup.string()
});


const mintSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Description is required'),
    attributes: Yup.array().of(attributesValidationSchema),
    image: Yup.mixed()
        .nullable()
        .notRequired()
        .test("FILE_SIZE", "Uploaded file is too big.",
            value => !value || (value && value.size <= 20900000000)),
    categories: Yup.array().required('Categories is required').min(1, 'Minimum of 1 categories').max(6, 'Maximum of 6 categories'),
    price: Yup.number().required('Price is required').test(
        'Is positive?', 
        'The number must be greater than 0!', 
        (value) => value > 0
        ),
    currency: Yup.string().required('Currency is required'),
});



const PreMintNFT = () => {
    const { t } = useTranslation("translate");
    const {data} = React.useContext(Context)
    const [preview, setPreview] = useState('');
    const [file, setFile] = useState('');
    const [showPanelVideo, setShowPanelVideo] = useState(false);
    const hiddenFileInput = useRef(null);
    const hiddenFileInputFile = useRef(null);
    const [current, setCurrent] = useState(0);
    const query = new URLSearchParams(location.search);
    const history = useHistory();
    const timeVideoRef = useRef(null);
    const [selectThumbnail, setSelectThumbnail] = useState(false);

    let sizeText = '(700 x 600)';


    const handleCurrentTime = (e) => {
        if(timeVideoRef.current){
            timeVideoRef.current.currentTime = e.target.value;
            setCurrent(e.target.value);
        }
    }

    const cancel = () => {
        history.push('/home')
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    const handleGetCurrencyType = () =>{
        if(String(process.env.REACT_APP_POLYGON_NETWORK_HEX+'') == '0xA86A'){
            return "AVAX"
        }else{
            return ""
        }
    }


    const handleDrag = (e) =>{
        if(e.dataTransfer.items) {
            let count = 0;
            if(e.dataTransfer.items.length > 0){
                for (let value of e.dataTransfer.items) {
                    if(count > 0){
                        return 0;
                    }
                    if(value.kind === 'file') {
                        let newFile = value.getAsFile();
                        handleFile(newFile)
                        count++;
                    }
                }
            }
        } 
    }
    
    const handleDropThumbnail = (e)=>{
        e.preventDefault();
        handleDrag(e)
        removeDragData(e)
    }

    const handleDropFile = (e)=>{
        e.preventDefault();
        if(e.dataTransfer.items) {
            handleDrag(e)
        }
        removeDragData(e)
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

    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        if(isValidFormat(file,['PNG','GIF','JPG','MP4','JPEG'])) {
            handlePreview(file)
        } else {
            alert("Invalid file, you have to add a thumbnail")
        }
    }

    const handlePreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        let formData = new FormData();
        formData.append("thumbnail", file);
        reader.onload = () => {
            console.log('video preview', reader.result)
            let preview = {
                src : reader.result,
                isVideo : isVideo(file),
                data : formData,
                format : file.type.split('/')[1]
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

    const handleFile = (file) => {
        if(isValidFormat(file,formats)) {
            let formData = new FormData();
            formData.append("files", file);
            let fileData = {
                isVideo : isVideo(file),
                type: file.type,
                data : formData,
                format : file.type.split('/')[1]
            }
            setFile(fileData)
            if(isFormat(file,'audio') || isFormat(file,'pdf')) {
                setPreview('')
                setShowPanelVideo(false);
                setSelectThumbnail(true);
            }else{
                handlePreview(file)
                setSelectThumbnail(false);
            }
        } else {
            alert("Invalid file for your nft")
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        handleFile(file)
    }

    const uploadNFTMedia = (file) => {
        return new Promise((resolve, reject) => {
            try {
                let url = `${process.env.REACT_APP_URL_API}/extra-files?domain=${process.env.REACT_APP_DOMAIN}`
                let headers = {
                  'Content-Type': 'multipart/form-data'
                }
                axios.post(url, file, { headers :headers}).then((success) => {
                    resolve(success.data)
                })
            } catch (error) {
                reject(error)
            }
        })
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
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    const determinateResolution = (file) => {
        let el = document.getElementById('preview')
        let resolution = ''
        if(isFormat(file,'audio') || isFormat(file,'pdf')) {
            resolution = 'N/A'
        } else {
            if(el) {
                if (preview.isVideo) {
                    resolution = ''+el.videoHeight+'x'+el.videoWidth
                } else {
                    resolution = ''+el.naturalHeight+'x'+el.naturalWidth
                }
            }
        }
        return resolution
    }

    const  currentDateVideo = () => {
        let currentTime = -1;
        if(preview.isVideo) {
            currentTime = current
        }
        return currentTime
    }

    const handleCreate = async(success,resolution,resetForm,ipfsGateway,values,setSubmitting)=>{
            let currentTime = currentDateVideo()
            let thumb_url = await uploadThumbnail(preview.data, preview.isVideo,currentTime);
            const address = query.get('address')
            let msg = "Approve my intention of create metadata of nft at";
            let {signature , message} = await sign(msg,data.userAccount,data.provider);
            let ipfsHashMetadata = success.data[0]
            let uri = ipfsGateway+ipfsHashMetadata
            let nft = {
                address_collectible : address,
                thumb_url : thumb_url,
                license : 1,
                signature : signature,
                message : message,
                action : 'CREATED_NFT',
                blockchain_name : process.env.REACT_APP_NETWORK_NAME,
                tags : values.categories,
                uri : uri,
                is_video : (file.isVideo) ? 1 : 0,
                format: file.format,
                resolution:resolution,
                domain:process.env.REACT_APP_DOMAIN
            }
            let url_create_nft = `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&type=LAZY&file_type=`+((currentTime > 0) ? 'JPG' : preview.format)
            await axios.post(url_create_nft,nft).then((success) => {
                if(success.data) {
                    resetForm()
                    setSubmitting(false);
                    history.push('/nft?address='+address+"&token_id="+success.data.tokenId+"&domain="+process.env.REACT_APP_DOMAIN)
                }
            }).catch((error) => {
                console.log('error ::', error)
            })
    }

    return (
        <>
            <Box sx={{marginBottom:'1rem'}}>
                <Box 
                    component='h1' 
                    sx={{
                        fontSize:'30px',
                        textAlign:'center',
                    }}
                >
                    {t('pre_mint_nft.title')}
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
                                    attributes: [],
                                    termsAndConditions: false,
                                    file: '',
                                    categories: [],
                                    price:'',
                                    currency:handleGetCurrencyType()
                                }}
                                validationSchema={mintSchema}
                                onSubmit={async(values, { setSubmitting, resetForm }) => {
                                    window.scrollTo(0, 0);
                                    setSubmitting(true);
                                    let resolution = determinateResolution(file)
                                    if(preview && preview.data) {
                                            let thumb = await uploadNFTMedia(file.data);
                                            let ipfsGateway = thumb.gateway;
                                            let image = ipfsGateway + thumb.urls[0]
                                            let meta = {
                                                image: image,
                                                is_video : file.isVideo,
                                                _properties : values.attributes,
                                                levels: [],
                                                stats : [],
                                                name : values.name,
                                                description: values.description,
                                                categories: values.categories,
                                                external_url : '',
                                                action : "CREATE_NFT_METADATA",
                                                blockchain_name : process.env.REACT_APP_NETWORK_NAME
                                            }
                                            let url_nft_metadata = `${process.env.REACT_APP_URL_API}/nft/metadata?domain=${process.env.REACT_APP_DOMAIN}`
                                            await axios.post(url_nft_metadata, meta,{
                                                headers:{
                                                    'Content-Type': 'text/plain;charset=utf-8',
                                                }
                                            }).then(async(success) => {
                                                handleCreate(success,resolution,resetForm,ipfsGateway,values,setSubmitting)
                                            })
                                    
                                    }
                                    
                                }}
                            >
                                {({errors, values,setValues,touched, isSubmitting}) =>(
                                <Form>
                                    <Container maxWidth='sm'>
                                        <Box>
                                            <Box 
                                                component='h1'
                                                sx={{
                                                    fontSize:'25px',
                                                    marginBottom:'0px',
                                                    marginTop:'0px',
                                                }}
                                            >
                                                {t('pre_mint_nft.upload_image')}<span style={{color:'#dc3545'}}>*</span>
                                            </Box>
                                            <Box 
                                                sx={{
                                                    fontSize:'14px',
                                                    marginTop:'10px',
                                                    marginBottom:'10px',
                                                    color:'#9B9B9B',
                                                }}
                                            >
                                                {t('pre_mint_nft.drag_or_choose')}
                                            </Box>
                                            <Box
                                                component='section'
                                                display='flex'
                                                flexDirection='column'
                                                alignItems='center'
                                                justifyContent='center'
                                                onDrop={handleDropFile}
                                                onDragOver={handleDragOver}
                                                onClick={() => hiddenFileInputFile.current.click()}
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
                                                    <UploadFileIcon htmlColor='#777E90' fontSize='large' />
                                                    <Box 
                                                        sx={{
                                                            color:'#777E90',
                                                            fontSize:'14px',
                                                        }}
                                                    >
                                                        PDF, MP3, PNG, GIF, JPG, MP4 50MB.
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display:'flex',
                                                            justifyContent:'center',
                                                            color:'#777E90',
                                                            fontSize:'16px',
                                                            mt:'10px'
                                                        }}
                                                    >
                                                        
                                                        {t('pre_mint_nft.recommended')}: {sizeText}
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <UploadFile 
                                                type='file' 
                                                ref={hiddenFileInputFile}
                                                accept="audio/mp3, application/pdf, image/png, image/gif, image/jpeg, video/mp4"
                                                name='file'
                                                onChange={handleFileUpload}
                                                multiple={false}
                                            />
                                        </Box>
                                        {selectThumbnail &&
                                        <Box sx={{marginBottom:'2rem'}}>
                                            <Box 
                                                component='h1'
                                                sx={{
                                                    fontSize:'25px',
                                                    marginBottom:'0px',
                                                    marginTop:'0px',
                                                }}
                                            >
                                                {t('pre_mint_nft.drag_or_choose')}<span style={{color:'#dc3545'}}>*</span>
                                            </Box>
                                            <Box 
                                                sx={{
                                                    fontSize:'14px',
                                                    marginTop:'10px',
                                                    marginBottom:'10px',
                                                    color:'#9B9B9B',
                                                }}
                                            >
                                                {t('pre_mint_nft.drag_or_choose')}
                                            </Box>
                                            <Box
                                                component='section'
                                                display='flex'
                                                flexDirection='column'
                                                alignItems='center'
                                                justifyContent='center'
                                                onDrop={handleDropThumbnail}
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
                                                    <UploadFileIcon htmlColor='#777E90' fontSize='large' />
                                                    <Box 
                                                        sx={{
                                                            color:'#777E90',
                                                            fontSize:'14px',
                                                        }}
                                                    >
                                                    PNG, GIF, JPG, MP4 Max 50MB.
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <UploadFile 
                                                type='file' 
                                                ref={hiddenFileInput}
                                                accept="image/png, image/gif, image/jpeg, video/mp4"
                                                name='image'
                                                onChange={handleThumbnailUpload}
                                                multiple={false}
                                            />
                                        </Box>}
                                        <Box sx={{marginTop:'1rem', marginBottom:'1rem'}}>
                                            <Box component='label' htmlFor='name' sx={{fontSize:'25px'}}>
                                                {t('pre_mint_nft.nft_name')} <span style={{color:'#dc3545'}}>*</span>
                                            </Box>
                                            <TextField
                                                id='name'
                                                type='text'
                                                placeholder={t('pre_mint_nft.nft_name')}
                                                name='name'
                                                value={values.name}
                                            />
                                            {errors.name && touched.name ? (
                                                <div style={{color:'#dc3545'}}>{errors.name}</div>
                                            ) : null}
                                        </Box>
                                        <Box sx={{marginBottom:'1rem'}}>
                                            <Box component='label' htmlFor='description' sx={{fontSize:'25px'}}>
                                                {t('pre_mint_nft.description')} <span style={{color:'#dc3545'}}>*</span>
                                            </Box>
                                            <TextArea
                                                id='description'
                                                as='textarea'
                                                placeholder={t('pre_mint_nft.description')}
                                                name='description'
                                                value={values.description}
                                            />
                                            {errors.description && touched.description ? (
                                                <div style={{color:'#dc3545'}}>{errors.description}</div>
                                            ) : null}
                                        </Box>
                                        <Box sx={{marginBottom:'1rem'}} className="notranslate">
                                            <Box component='label' htmlFor='categories' sx={{fontSize:'25px'}}>
                                                {t('pre_mint_nft.category')}:<span style={{color:'#dc3545'}}>*</span>
                                            </Box>
                                            <MultiCategory 
                                                array={values.categories}
                                                values={values}
                                                setValues={setValues}
                                                id='categories'
                                                name="categories"
                                            />
                                            {errors.categories ? (
                                                <div style={{color:'#dc3545'}}>{errors.categories}</div>
                                            ) : null}
                                        </Box>

                                        <Box sx={{marginTop:'1rem', marginBottom:'1rem'}}>
                                            <Box component='label' htmlFor='price' sx={{fontSize:'25px'}}>
                                                {t('pre_mint_nft.price')} <span style={{color:'#dc3545'}}>*</span>
                                            </Box>
                                            <TextField
                                                id='price'
                                                type='number'
                                                placeholder={t('pre_mint_nft.price')}
                                                name='price'
                                                value={values.price}
                                            />
                                            {errors.price && touched.price ? (
                                                <div style={{color:'#dc3545'}}>{errors.price}</div>
                                            ) : null}
                                        </Box>

                                        <Box sx={{marginTop:'1rem', marginBottom:'1rem'}}>
                                            <Box component='label' htmlFor='currency' sx={{fontSize:'25px'}}>
                                                {t('pre_mint_nft.Currency')} <span style={{color:'#dc3545'}}>*</span>
                                            </Box>
                                            <TextField
                                                disabled={true}
                                                id='currency'
                                                type='text'
                                                placeholder={t('pre_mint_nft.Currency')}
                                                name='currency'
                                                value={values.currency}
                                            />
                                            {errors.currency && touched.currency ? (
                                                <div style={{color:'#dc3545'}}>{errors.currency}</div>
                                            ) : null}
                                        </Box>

                                        <Box sx={{marginBottom:'1rem'}}>
                                            <Box component='label' htmlFor='attributes' sx={{fontSize:'25px'}}>
                                                {t('pre_mint_nft.attributes')}
                                            </Box>
                                        </Box>
                                        <FieldArray
                                            name="attributes"
                                            render={arrayHelpers => (
                                                <div>
                                                    {(values.attributes && values.attributes.length > 0) ? <>
                                                        {
                                                            values.attributes.map((attribute, index) => (
                                                                <div key={index}>
                                                                    <TextField
                                                                        type='text'
                                                                        placeholder='Attribute name. Example: Rareness'
                                                                        name={`attributes.${index}.name`}
                                                                        style={{marginBottom:'0.5rem'}}
                                                                    />
                                                                    <TextField
                                                                        type='text'
                                                                        placeholder='Attribute value. Example: Common'
                                                                        name={`attributes.${index}.type`}
                                                                        style={{marginBottom:'0.5rem'}}
                                                                    />
                                                                    <Box
                                                                        sx={{
                                                                            width:'100%',
                                                                            display:'flex',
                                                                            justifyContent:'flex-end'
                                                                        }}
                                                                    >
                                                                        <Button 
                                                                            type='button'
                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                        >
                                                                            {t('pre_mint_nft.remove_attribute')}
                                                                        </Button>
                                                                    </Box>
                                                                </div>
                                                            ))
                                                        }
                                                        <Button
                                                            type='button'
                                                            onClick={() => arrayHelpers.push('')}
                                                            sx={{marginTop:'0.5rem', marginBottom:'0.5rem'}}
                                                        >
                                                            {t('pre_mint_nft.add_attribute')}
                                                        </Button>
                                                    </>
                                                    : (
                                                        <Button
                                                            type='button'
                                                            onClick={() => arrayHelpers.push('')}
                                                        >
                                                             {t('pre_mint_nft.add_attribute')}
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </Container>
                                    <Container maxWidth='sm' sx={{marginTop:'1rem'}}>
                                        <Box display='flex' justifyContent='center' alignItems='center' sx={{gap:'5px'}}>
                                            <ButtonStyled text={t('pre_mint_nft.create_btn')} />
                                            <ButtonStyled type='button' text={t('pre_mint_nft.cancel_btn')} onClick={cancel} />
                                        </Box>
                                    </Container>
                                    <LoaderModal
                                        text={t('pre_mint_nft.mintig_loader')}
                                        isOpen={isSubmitting}
                                        textColor='#fff'
                                        spinnerColor='#fff'
                                    />
                                </Form>)}
                            </Formik>
                        </Grid>
                        <Grid item sm={12} md={6} lg={4} xl={4} sx={{margin:'0 auto'}}>
                        <ImagePreview timeVideoRef={timeVideoRef} title={t('create_collection.preview_image')} image={preview.src} isVideo={preview.isVideo}  />
                            {(showPanelVideo) &&
                            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{gap:'1rem', marginTop:'1rem'}}>
                                {/* <Slider value={videoTimer} aria-label="Default" valueLabelDisplay={timeVideoRef.current?.currentTime} onChange={handleCurrentTime} /> */}
                                {console.log("duration::", timeVideoRef.current?.duration)}
                                <input type = 'range' min = '0' max = {`${timeVideoRef.current?.duration}`} step = '0.1' value = {current} onChange = {handleCurrentTime} />
                                <div style={{textAlign:'center'}}>{t("create_collection.select_frame")}</div>
                            </Box>}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default PreMintNFT