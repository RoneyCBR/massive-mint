import React ,{ useContext, useEffect, useRef, useState } from 'react';
import { Context } from 'hooks/WalletContext';
import {Box, Card, CircularProgress, Container, Divider, Grid, ListItemText} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoaderModal from 'components/LoaderModal';
import ButtonStyled from 'components/ButtonStyled';
import { Formik ,Form} from 'formik';
import * as Yup from 'yup';
import { TextArea, TextField ,UploadFile} from './styles/styles';
import ErrorMessage from 'components/ErrorMessage';
import { useFetch } from 'hooks/useFetch';
import MultiCategory from 'components/ListAutoComplete/MultiCategory/MultiCategory';
import ImagePreview from 'components/ImagePreview';
import axios from 'axios';
import { isFormat, isValidFormat, isVideo } from 'services/Utils/validateFileFormat';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { sign } from 'services/Utils/signature';
import { useHistory } from "react-router";

const nftSchema = Yup.object().shape({
    image: Yup.mixed()
    .nullable()
    .notRequired()
    .test("FILE_SIZE", "Uploaded file is too big.",
        value => !value || (value && value.size <= 20900000000)),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    categories: Yup.array().required('Categories is required').min(1, 'Minimum of 1 categories').max(6, 'Maximum of 6 categories')
});

const formats = ['PNG','GIF','JPG','JPEG']


const EditNFT = () => {
    const { t } = useTranslation("translate");
    let maxImgSize = 512000 //512000 bytes = 500 kb
    const [msgFile,setMsgFile] = useState('')
    // get params from url
    const params = new URLSearchParams(window.location.search);
    const history = useHistory();
    const token_id = params.get('token_id');
    const address = params.get('address');
    const {data,isLoading} = useContext(Context);
    const timeVideoRef = useRef(null);
    const [current, setCurrent] = useState(0);
    const [showPanelVideo, setShowPanelVideo] = useState(false);
    const [preview, setPreview] = useState('');
    const [file, setFile] = useState('');
    const [selectThumbnail, setSelectThumbnail] = useState(false);
    const hiddenFileInput = useRef(null);
    const hiddenFileInputFile = useRef(null);
    const [categories, setCategories] = useState([])
    const url = process.env.REACT_APP_URL_API+`/nft?address=${address}&token_id=${token_id}&domain=${process.env.REACT_APP_DOMAIN}`
    const {data:NFT, error:errorNFT,loading:loadingNFT} = useFetch(url);
    const [newNFT,setNewNFT] = useState({})
    let sizeText = '(700 x 600)';

    



    useEffect(() => {
        window.scrollTo(0, 0);    
       
        if(NFT && NFT.length > 0 && NFT[0] != null) {
            let nft = NFT[0];
            setNewNFT(nft)
        }
    },[NFT])

    useEffect(() => {
        if(NFT && NFT.length > 0 && NFT[0] != null && NFT[0].isVideo) {
            setShowPanelVideo(true);
        }
        if(NFT && NFT.length > 0 && NFT[0].tags){
            let temp = NFT[0].tags?.map((item)=>{
                return item.name
            })
            setCategories(temp)
        }
    },[NFT])

  

    const handleCurrentTime = (e) => {
        if(timeVideoRef.current){
            timeVideoRef.current.currentTime = e.target.value;
            setCurrent(e.target.value);
        }
    }

     const handleDropThumbnail = (e)=>{
        e.preventDefault();
        if (e.dataTransfer.items) {
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    let newFile = e.dataTransfer.items[i].getAsFile();
                    handlePreview(newFile)
                  }
                }
            }
        removeDragData(e)
    }

    const handleDropFile = (e)=>{
        e.preventDefault();
        if (e.dataTransfer.items) {
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    let newFile = e.dataTransfer.items[i].getAsFile();
                    setMsgFile('')
                    if(newFile && String(newFile.type).includes("image") && newFile.size > maxImgSize ){
                        setMsgFile(t("mint_nft.file_is_big_500kb"));
                    }else{
                        handleFile(newFile)
                    }
                  }
                }
            }
        removeDragData(e)
    }

    console.log("debug preview",preview);

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
        if(isValidFormat(file,['PNG','GIF','JPG','JPEG'])) {
            handlePreview(file)
        } else {
            setMsgFile("Invalid file")
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
            setMsgFile("Invalid file")
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setMsgFile('')
        if(file && String(file.type).includes("image") && file.size > maxImgSize ){
            setMsgFile(t("mint_nft.file_is_big_500kb"));
        }else{
            handleFile(file)
        }
    }

    const uploadNFTMedia = (file) => {
        return new Promise((resolve, reject) => {
            try {
                let url = `${process.env.REACT_APP_URL_API}/extra-files`
                let headers = {
                  'Content-Type': 'multipart/form-data'
                }
                axios.post(url, file, { headers :headers}).then((success) => {
                    resolve(success.data.urls[0])
                })
            } catch (error) {
                reject(error)
            }
        })
    }



    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                marginBottom:'1rem'
            }}
        >   
            {
                isLoading ? 'Connecting wallet...' :
                <React.Fragment>
                    {loadingNFT && !errorNFT &&  
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{height: '100vh'}}>
                            <CircularProgress size={30} sx={{color: '#000'}} />
                            <h3>Loading info...</h3>
                        </Box>
                    }
                    {!loadingNFT && errorNFT && <Box ><ErrorMessage error={errorNFT.message} /></Box>}
                    {!loadingNFT && NFT && NFT.length > 0 && NFT[0] != null && data != null && data.userAccount && data.userAccount!='undefined' && NFT[0].owner == data.userAccount &&
                        <Box sx={{marginBottom:'1rem'}}>
                            <Box 
                                component='h1' 
                                sx={{
                                    fontSize:'30px',
                                    textAlign:'center',
                                }}
                            >
                                Edit NFT
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
                                                thumbnail: '',
                                                name: NFT[0] && NFT[0].metadata && NFT[0].metadata.json_data.name ? NFT[0].metadata.json_data.name:'',
                                                description: NFT[0] && NFT[0].metadata && NFT[0].metadata.json_data.description ? NFT[0].metadata.json_data.description:'',
                                                categories: categories
                                            }}
                                            validationSchema={nftSchema}
                                            onSubmit={
                                                async (values, { setSubmitting,resetForm }) => {
                                                    window.scrollTo(0, 0);
                                                    console.log("debug values::",values);
                                                    let msg = "Approve my intention of update data";
                                                    let { signature , message } = await sign(msg,data.userAccount,data.provider);
                                                    console.log(message);
                                                    if(signature){
                                                        let thumb_url = null;
                                                        if(file){
                                                            thumb_url = await uploadNFTMedia(file.data);
                                                        }else{
                                                            thumb_url = String(newNFT.thumb_url).replace("https://persea.mypinata.cloud/ipfs/");
                                                        }
                                                        let updateNFT = {
                                                            domain : process.env.REACT_APP_DOMAIN,
                                                            token_id : token_id,
                                                            address: address,
                                                            thumb_url : thumb_url,
                                                            tags:values.categories
                                                        } 
                                                        console.log('debug updateNFT', updateNFT);
                                                        await axios.put(process.env.REACT_APP_URL_API+"/nft", updateNFT).then((success) => {
                                                        if(success.data) {
                                                            resetForm();
                                                            setSubmitting(false);
                                                            history.push('/nft?address='+address+"&token_id="+token_id+"&domain="+process.env.REACT_APP_DOMAIN)
                                                        }
                                                        }).catch((error) => {
                                                            console.log('error ::', error)
                                                        })
                                                    } 
                                                }
                                            }
                                        >
                                            {({ errors,  values, setValues, touched, isSubmitting}) =>(
                                            <Form name='collection'>
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
                                                        {t('mint_nft.upload_image')}
                                                    </Box>
                                                    <Box 
                                                        sx={{
                                                            fontSize:'14px',
                                                            marginTop:'10px',
                                                            marginBottom:'10px',
                                                            color:'#9B9B9B',
                                                        }}
                                                    >
                                                        {t('mint_nft.drag_or_choose')}
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
                                                                PNG, GIF, JPG Max 500 KB
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
                                                                
                                                                {t('mint_nft.recommended')}: {sizeText}
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
                                                        {t('mint_nft.drag_or_choose')}
                                                    </Box>
                                                    <Box 
                                                        sx={{
                                                            fontSize:'14px',
                                                            marginTop:'10px',
                                                            marginBottom:'10px',
                                                            color:'#9B9B9B',
                                                        }}
                                                    >
                                                        {t('mint_nft.drag_or_choose')}
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
                                                                PNG, GIF, JPG Max 500 KB
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <UploadFile 
                                                        type='file' 
                                                        ref={hiddenFileInput}
                                                        accept="image/png, image/gif, image/jpeg, video/mp4"
                                                        name='image'
                                                        onChange={(e)=>{handleThumbnailUpload(e)}}
                                                        multiple={false}
                                                    />
                                                </Box>                                                
                                                }
                                                    {errors.image && touched.image ? (
                                                        <div style={{color:'#dc3545'}}>{errors.image}</div>
                                                    ) : null}
                                                    {
                                                        msgFile != '' && 
                                                        <div style={{color:'#dc3545'}}>{msgFile}</div>
                                                    }

                                                    <Box sx={{marginTop:'1rem', marginBottom:'1rem'}}>
                                                        <Box 
                                                            component='label' 
                                                            htmlFor='name'
                                                            sx={{
                                                                fontSize:'25px'
                                                            }}
                                                        >
                                                            {t('mint_nft.nft_name')}: <span style={{color:'#9B9B9B'}}>*</span><Box component="span" sx={{color:'#9B9B9B',fontSize:'14px'}}>No editable</Box>
                                                        </Box>
                                                        <TextField
                                                            disabled={true}
                                                            id='name'
                                                            type='text'
                                                            name='name'
                                                            placeholder={'Name'}
                                                            values={values.name}
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
                                                                fontSize:'25px'
                                                            }}
                                                        >
                                                            {t('mint_nft.description')}: <span style={{color:'#9B9B9B'}}>*</span>  <Box component="span" sx={{color:'#9B9B9B',fontSize:'14px'}}>No editable</Box>
                                                        </Box>
                                                        <TextArea
                                                            disabled={true}
                                                            id='description'
                                                            component='textarea'
                                                            placeholder={t('create_collection.description')}
                                                            name='description'
                                                            values={values.description}
                                                        />
                                                        {errors.description && touched.description ? (
                                                            <div style={{color:'#dc3545'}}>{errors.description}</div>
                                                        ) : null}
                                                    </Box>

                                                    <Box sx={{marginBottom:'1rem'}}>
                                                        <Box component='label' htmlFor='categories' sx={{fontSize:'25px'}}>
                                                        {t('mint_nft.category')}: <span style={{color:'#dc3545'}}>*</span>
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
                                                </Container>
                                                <Box
                                                    sx={{
                                                        width:'100%'
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width:'100%',
                                                            height:'100%',
                                                            display:'grid',
                                                            gridTemplateColumns:'1fr auto 1fr'
                                                        }}
                                                    >   
                                                        <Box
                                                            sx={{
                                                                mt:'13px'
                                                            }}
                                                        >
                                                            <Divider />
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                color:'#9B9B9B'
                                                            }}
                                                        >
                                                            No editable {t('mint_nft.attributes')}
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                mt:'13px'
                                                            }}
                                                        >
                                                            <Divider />
                                                        </Box>

                                                    </Box>

                                                    <Grid  container rowSpacing={1} columns={{xs:12,sm:12, md:12, lg:12, xl:12}} >
                                                        {NFT[0] && NFT[0].metadata && (NFT[0].metadata.json_data.attributes).map((attribute, index) => (
                                                            <Grid key={index} item xs={6} sm={6} md={6} lg={6}>
                                                                <Card
                                                                    sx={{
                                                                        border:'1px solid #E5E5E5',
                                                                        borderRadius:'8px',
                                                                        boxSizing: 'border-box',
                                                                        padding: '4px',
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        minHeight: '70px',
                                                                        backgroundColor: '#EFEFEF',
                                                                    }}
                                                                >
                                                                <ListItemText 
                                                                        secondaryTypographyProps={{style: {color:'#666'}}}
                                                                        primary={attribute.trait_type ? (attribute.trait_type) : ''} 
                                                                        secondary={attribute.trait_type ? (attribute.value) : ''}
                                                                        sx={{textAlign:'center'}}
                                                                    />
                                                                </Card>
                                                            </Grid>
                                                        ))}
                                                    </Grid>

                                                </Box>
                                                <Container maxWidth='sm' sx={{marginTop:'1rem'}}>
                                                    <Box display='flex' justifyContent='center' alignItems='center' sx={{gap:'5px'}}>
                                                        <ButtonStyled isDisabled={!file} text={'Save'} type='submit'/>
                                                        <ButtonStyled text={t('create_collection.cancel_btn')} type='button' onClick={()=>{
                                                            history.push('/nft?address='+address+"&token_id="+token_id+"&domain="+process.env.REACT_APP_DOMAIN)
                                                        }}  />
                                                    </Box>
                                                </Container>
                                                <LoaderModal
                                                    setIsClosed = {() => {}}
                                                    text={t('mint_nft.updating')}
                                                    isOpen={isSubmitting}
                                                    textColor='#fff'
                                                    spinnerColor='#fff'
                                                />
                                            </Form>)}
                                        </Formik>
                                        
                                    </Grid>

                                    <Grid item sm={12} md={6} lg={4} xl={4} sx={{margin:'0 auto'}}>
                                
                                        <Grid  container rowSpacing={1} columns={{xs:12,sm:12, md:12, lg:12, xl:12}} >

                                            <Grid item sm={12} md={12} lg={12} xl={12}>
                                                <ImagePreview timeVideoRef={timeVideoRef} title={t('create_collection.preview_image')} image={preview && preview.src ? preview.src :newNFT.thumb_gif ? newNFT.thumb_gif :newNFT.thumb_resize} isVideo={preview ? preview.isVideo :NFT[0].isVideo} text={sizeText} />
                                                {(showPanelVideo) &&
                                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{gap:'1rem', marginTop:'1rem'}}>
                                                    {/* <Slider value={videoTimer} aria-label="Default" valueLabelDisplay={timeVideoRef.current?.currentTime} onChange={handleCurrentTime} /> */}
                                                    {console.log("duration::", timeVideoRef.current?.duration)}
                                                    <input type = 'range' min = '0' max = {`${timeVideoRef.current?.duration}`} step = '0.1' value = {current} onChange = {handleCurrentTime} />
                                                    <div style={{textAlign:'center'}}>{t("create_collection.select_frame")}</div>
                                                </Box>}
                                            </Grid>                   

                                        </Grid>
                                    </Grid>

                                
                                </Grid>

                                
                            </Box>
                        </Box>
                    }
                    {
                        data && data.userAccount && data.userAccount!='undefined' && NFT != null && NFT.length > 0 &&  NFT[0] != null && NFT[0].owner != data.userAccount &&
                        <Box
                            sx={{
                                width:'100%',
                                height:'100%',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                textAlign:'center',
                                mt:'20px'
                            }}
                        >
                            <h2>{t('mint_nft.not_allowed_change')}</h2>
                        </Box>
                    }
                </React.Fragment>
            }
           
        </Box>
    );
};

export default EditNFT;