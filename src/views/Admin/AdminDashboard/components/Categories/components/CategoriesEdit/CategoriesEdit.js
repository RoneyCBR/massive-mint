import React from 'react';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Input from '@mui/material/Input'
import PropTypes from 'prop-types';
import axios from 'axios';
import ImagePreview from 'components/ImagePreview';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { isValidFormat} from 'services/Utils/validateFileFormat';

const UploadFile = styled.input`
    display: none;
`;
const formats = ['JPG','JPEG','PNG','GIF']

const CategoriesEdit = ({rows,setRows,isEdit,row,openModal,setLoad,getCategories}) => {
    console.log(rows,setRows);
    let maxImgSize = 512000 //512000 bytes = 500 kb
    const { t } = useTranslation("translate");
    const [file, setFile] = React.useState('');
    const [preview, setPreview] = React.useState('');
    const [msgFile,setMsgFile] = React.useState('')
    const hiddenFileInputFile = React.useRef(null);
    const [sectionForm,setSectionForm] = React.useState({
        id: '',
        category:'',
        filter:'',
    });

    const handleDropThumbnail = (e)=>{
        e.preventDefault();
        if (e.dataTransfer.items) {
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    let newFile = e.dataTransfer.items[i].getAsFile();
                    setMsgFile('')
                    if(newFile && String(newFile.type).includes("image") && newFile.size > maxImgSize ){
                        setMsgFile(t("mint_nft.file_is_big_500kb"));
                    }else{
                        handlePreview(newFile)
                    }
                   
                  }
                }
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
        setMsgFile('');
        if(file && String(file.type).includes("image") && file.size > maxImgSize ){
            setMsgFile(t("mint_nft.file_is_big_500kb"));
            return 0;
        }
        if(isValidFormat(file,formats)) {
            setFile(file)
            handlePreview(file)
        } else {
            setMsgFile("Invalid file, you have to add a thumbnail")
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
                isVideo : false,
                data : formData,
                format : file.type.split('/')[1]
            }
            setPreview(preview);
        };
    }

    const uploadThumbnail = (thumbnail, isVideo, time = -1) => {
        return new Promise((resolve, reject) => {
            try {
                let type = isVideo ? "video" : "img";
                let url = `${process.env.REACT_APP_URL_API}/thumbnail?type=${type}&time=${time}`
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


    /*********** init form */

    const resetForm = () => {
        setSectionForm({
            id: '',
            category:'',
            filter:''
        });
    }

    const addSection = async () => {
        if(file){
            setLoad(true);
            let thumb_url = await uploadThumbnail(preview.data,false,0);
            if(thumb_url){
                let data = {
                    name:sectionForm.category
                }
                axios.post(`${process.env.REACT_APP_URL_API}/category`,data)
                .then((success)=>{
                    console.log("debug success save category::",success);
                    getCategories();
                    resetForm();
                    setLoad(false);
                }).catch((err)=>{
                    console.log("debug erro save category::",err);
                    setLoad(false);
                }) 
            }
        }   
    }

    const updateSection = async () => {
        if(file){
            setLoad(true);
            let thumb_url = await uploadThumbnail(preview.data,false,0);
            if(thumb_url){
                let data = {
                    name:row.category,
                    update_category:sectionForm.category
                }
                axios.put(`${process.env.REACT_APP_URL_API}/category`,data)
                .then((update)=>{
                    console.log("debug update save category::",update);
                    getCategories();
                    resetForm();
                    setLoad(false);
                    openModal(false)
                }).catch((err)=>{
                    console.log("debug erro update category::",err);
                    setLoad(false);
                })  
            }
            
        }
        
          
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(isEdit){
            await updateSection();
        }else{
            addSection();
        }
    }

    const handleChangeName = (e) => {
        if(isEdit){
            setSectionForm({...sectionForm,category:e.target.value});
        }else{
            setSectionForm({...sectionForm,id:e.target.value,category:e.target.value})
        }      
    }

    React.useEffect(() => {
        if(isEdit){
            setSectionForm(row);
        }
    },[isEdit]);


    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
                padding: '20px',
                gap: '20px'
            }}
        >
            <FormGroup
                sx={{
                    width: '90%',
                }}
            >
                <FormLabel>Category</FormLabel>
                <Input 
                    name="category" 
                    type="text"
                    placeholder="Category"
                    onChange={(e) =>handleChangeName(e)}
                    value={sectionForm.category}
                />
            </FormGroup>

            <FormGroup
                sx={{
                    width: '90%'
                }}
            >
                 <Box
                    sx={{
                        width:'100%',
                        height:'100%',
                        border:'1px solid #9B9B9B',
                        borderRadius: '5px 5px',
                        cursor: 'pointer',
                        p:'15px'
                    }}
                    onDrop={handleDropThumbnail}
                    onDragOver={handleDragOver}
                    onClick={() => hiddenFileInputFile.current.click()}
                >
                    
                    <ImagePreview 
                        timeVideoRef={{}}
                        title={"Thumbnail"} 
                        image={isEdit && preview && preview.src ? preview.src:row.thumbnail}
                        isVideo={false}  
                        text={""}
                    /> 
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
                        sx={{
                            color:'#777E90',
                            fontSize:'14px',
                        }}
                    >
                        PNG, GIF, JPG - Max 5MB.
                    </Box>
                </Box>
                <UploadFile 
                    type='file' 
                    ref={hiddenFileInputFile}
                    accept="image/png, image/gif, image/jpeg, video/mp4"
                    name='image'
                    onChange={(e)=>{handleThumbnailUpload(e)}}
                    multiple={false}
                />
                {
                    msgFile != '' && 
                    <div style={{color:'#dc3545'}}>{msgFile}</div>
                }              
            </FormGroup>

            <FormGroup>
                <Button 
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    disabled={sectionForm.category === ''|| !file}
                    sx={{
                        "&.Mui-disabled":{
                            background: '#fff',
                            border:'1px solid #ccc',
                        }
                    }}
                >
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

CategoriesEdit.propTypes = {
    rows: PropTypes.array,
    setRows: PropTypes.func,
    isEdit: PropTypes.bool,
    row: PropTypes.object,
    openModal: PropTypes.func,
    setLoad: PropTypes.func,
    getCategories: PropTypes.func
};

export default CategoriesEdit;