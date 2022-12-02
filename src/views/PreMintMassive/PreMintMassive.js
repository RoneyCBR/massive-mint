import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import ButtonStyled from 'components/ButtonStyled';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoaderModal from 'components/LoaderModal';
import {useFetch} from 'hooks/useFetch';
import { sign } from 'services/Utils/signature';
import { Context } from 'hooks/WalletContext';
import TypeMintRadioButton from './components/TypeMintRadioButton';
import { useLocation } from 'react-router-dom'
import CollectionCard from './components/CollectionCard';
import CircularProgress from '@mui/material/CircularProgress';
import CalendarCustom from './components/CalendarCustom';
import TextBoxLink from './components/TextBoxLink';
import TextBoxFilterRange from './components/TextBoxFilterRange'
import CardNFT from './components/CardNFT';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { initialize } from 'services/ERC721/initialize';
import CalendarAndTime from './components/CalendarAndTime';
import { deploy } from 'services/ERC721/deploy';
import { Link } from 'react-router-dom';
import { updateProjectKey } from 'services/Project/updateProjectKey';
import {
    CardContent,
    ContentArea,
    ContentForm,
    TitleH2,
    LineDividerV,
    LineDividerH,
    ContentFilter, 
    FilterBody, 
    FilterForm, 
    FilterDetailsContent, 
    FilterDetails,
    ContainerMessage,
    ContainerCards,
    TextTotal,
    BodyCard,
    CardGrid1,
    CardGrid2,
    MessageBoxContainer,
    PanelContainer,
    TextBox,
    FilterTitle
} from './style';

const ShowCollection = ({content,loading,error}) =>{
    return (
        <React.Fragment>
            {
                loading ?
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'200px'}}>
                    <CircularProgress
                        size={35}
                        sx={{
                            color: '#000'
                        }}
                    />
                </Box>
                :
                <React.Fragment>
                    {
                        !error && content &&
                        <CollectionCard content={content} limit={1}/>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

ShowCollection.propTypes = {
    content: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.any
}

const ChosePanelMint = ({
    typePanel,
    showOptionPanel,
    setShowOptionPanel,
    checkedSharing,
    setCheckedSharing,
    formMint,
    setFormMint,
    handleGetPreview,
    typeMintList,
    t,
    NFTLoading,
    load,
    activeTab,
    maxDate,
    handleResetValues,
    isOwner,
    handleConfirmWithOutContent
    }) =>{

    React.useEffect(() => {
        handleResetValues();
    },[showOptionPanel])

    return (
        <React.Fragment>
            <center>
                {
                    isOwner &&
                    <TypeMintRadioButton 
                        options={typePanel} 
                        type={showOptionPanel}
                        setType={setShowOptionPanel} 
                        label={''}
                        name={"typeMint"} 
                        colorRadioButtons={"#43B02A"}
                        autoSelectedFirst={false}
                    />
                }
            </center>
            {
                showOptionPanel.typeMint == "without_preview" && isOwner &&
                <PanelContainer>
                    <Box sx={{width:'100%'}}>
                        <Box sx={{color:'#fff'}}>{t("pre_mint_nft_massive.without_preview_text")}</Box>
                    </Box>
                    <center>
                        <h3 style={{margin:'0px 0px',color:'#fff'}}>{t("pre_mint_nft_massive.total_to_mint")}*</h3>
                        <TextBox
                            type="number"
                            size={"small"}
                            label={""}
                            value={formMint.totalMint}
                            onChange={(e)=>{Number(e.target.value) >= 0 && setFormMint({...formMint,totalMint:Number(e.target.value)})}}
                        />
                    </center>
                    <center>
                        <h3 style={{margin:'0px 0px',color:'#fff'}}>{t("pre_mint_nft_massive.price")}*</h3>
                        <TextBox
                            type="number"
                            size={"small"}
                            label={""}
                            value={formMint.price}
                            onChange={(e)=>{Number(e.target.value) >= 0 && setFormMint({...formMint,price:Number(e.target.value)})}}
                        />
                    </center>
                    <center>
                        <h3 style={{margin:'0px 0px',color:'#fff',display:'none'}}>{t("pre_mint_nft_massive.sale_date")}*</h3>
                        <CalendarAndTime
                            date={formMint} 
                            setDate={setFormMint} 
                            name="dateMint"
                            maxDate={maxDate}
                        />
                    </center>
                    <center>
                        <ButtonStyled 
                            text={t("pre_mint_nft_massive.pre_mint_btn")}
                            onClick={handleConfirmWithOutContent}
                            isDisabled={formMint.totalMint <= 0 || formMint.price <= 0 }
                        />
                    </center>
                </PanelContainer>
            }
            {
                showOptionPanel.typeMint == "with_preview" && isOwner &&
                <PanelContainer>
                    <Box sx={{width:'100%'}}>
                        <Box sx={{color:'#fff'}}>{t("pre_mint_nft_massive.step_1")}</Box>
                    </Box>
                    <center>
                        <FormControlLabel
                            sx={{color:'#fff'}}
                            control={<Checkbox sx={{color:'#43B02A','&.Mui-checked': {color:'#43B02A'}}} value={checkedSharing}
                            onChange={()=>{setCheckedSharing(!checkedSharing)}} />}
                            label={t("pre_mint_nft_massive.confirm_step_1")}
                        />
                    </center>
                    {checkedSharing && isOwner &&
                    <React.Fragment>
                        <center>
                            <h3 style={{margin:'0px 0px',color:'#fff'}}>{t("pre_mint_nft_massive.check_link")}</h3>
                        </center>
                        <TextBoxLink 
                            link={formMint}
                            setLink={setFormMint}
                            value={formMint.link1}
                            nameLink="link1"
                            size={"large"}
                            width={"100%"}
                            label={t("pre_mint_nft_massive.sheet_file_url")}
                        />
                        <TextBoxLink 
                            link={formMint}
                            setLink={setFormMint}
                            value={formMint.link2}
                            nameLink="link2"
                            size={"large"}
                            width={"100%"} 
                            label={t("pre_mint_nft_massive.folder_url")}
                        />
                        <center>
                            <ButtonStyled 
                                text={t("pre_mint_nft_massive.check_btn")} 
                                onClick={handleGetPreview}
                                isDisabled={NFTLoading || load || !formMint.isValid.link1 || !formMint.isValid.link2}
                            />
                        </center>
                        </React.Fragment>
                    }
                    {
                        activeTab == 2 && isOwner &&
                        <React.Fragment>
                            <Box display={"flex"} justifyContent={"center"}>
                                <TypeMintRadioButton 
                                    options={typeMintList} 
                                    type={formMint}
                                    setType={setFormMint} 
                                    label={t("pre_mint_nft_massive.mint_type.title")}
                                    name={"typeMint"} 
                                    colorRadioButtons={"#43B02A"}
                                />
                            </Box>
                            {   
                            formMint.typeMint == 3 && 
                            <CalendarCustom 
                                date={formMint} 
                                setDate={setFormMint} 
                                name="dateMint"
                                maxDate={maxDate}
                            />
                            }
                            {
                               ( formMint.typeMint == 2 || formMint.typeMint == 3) &&
                                <Box sx={{m:'5px 0px'}}>
                                    <center>
                                        <h3 style={{margin:'0px 0px',color:'#fff'}}>{t("pre_mint_nft_massive.price")}*</h3>
                                        <TextBox
                                            type="number"
                                            size={"small"}
                                            label={""}
                                            value={formMint.price}
                                            onChange={(e)=>{Number(e.target.value) >= 0 && setFormMint({...formMint,price:Number(e.target.value)})}}
                                        />
                                    </center>
                                </Box>
                            }
                        </React.Fragment>
                    }
                </PanelContainer>
            }
        </React.Fragment>
    )
}

ChosePanelMint.propTypes = {
    typePanel: PropTypes.array,
    showOptionPanel: PropTypes.object,
    setShowOptionPanel: PropTypes.func,
    checkedSharing: PropTypes.bool,
    setCheckedSharing: PropTypes.func,
    formMint: PropTypes.object,
    setFormMint: PropTypes.func,
    handleGetPreview: PropTypes.func,
    typeMintList: PropTypes.array,
    t: PropTypes.any,
    NFTLoading: PropTypes.bool,
    load: PropTypes.bool,
    activeTab: PropTypes.number,
    maxDate: PropTypes.any,
    handleResetValues: PropTypes.func,
    isOwner: PropTypes.bool,
    handleConfirmWithOutContent: PropTypes.func
}

const  MessageBox = ({msgSuccess,isOwner,loading,t}) =>{
    console.log(isOwner)
    return (
        <React.Fragment>
            {
                !loading && 
                <React.Fragment>
                    <MessageBoxContainer>
                        <h2 style={{margin:'0px 0px'}}>{msgSuccess}</h2> 
                    </MessageBoxContainer>
                    {!isOwner && 
                    <MessageBoxContainer>
                        <h2 style={{margin:'0px 0px'}}>{ t("pre_mint_nft_massive.message.you_dont_owner")}</h2>
                    </MessageBoxContainer>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

MessageBox.propTypes = {
    msgSuccess: PropTypes.string,
    isOwner: PropTypes.bool,
    loading: PropTypes.bool,
    t: PropTypes.any,
}

const PreMintMassive = () => {
    const { t } = useTranslation("translate");
    const {search} = useLocation();
    const query = new URLSearchParams(search);
    const address = query.get('address');
    const {data} = React.useContext(Context);
    const [msgLoad,setMsgLoad] = React.useState('Loading...');
    const [msgSuccess,setMsgSuccess] = React.useState('');
    const [load,setLoad] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(1);
    const [items,setItems] = React.useState([]);
    const [checkedSharing,setCheckedSharing] = React.useState(false);
    const [checkedConfirm,setCheckedConfirm] = React.useState(false);
    let day = 86399000; // one day
    let nMonth = day * 30; // 30 days
    let maxDate = (new Date().getTime()) + (nMonth*3); // max date selected
    const [formMint,setFormMint] = React.useState({
        link1:'',
        link2:'',
        isValid:{
            link1:false,
            link2:false
        },
        typeMint:'',
        price:0,
        dateMint:'',
        totalMint:0 // only use if typePanel == without_preview;
    });
    const [showOptionPanel, setShowOptionPanel] = React.useState({
        typeMint:''
    });
    let typePanel = [
        {label: t("pre_mint_nft_massive.type_panel.with_content"), value:'with_preview'},
        {label: t("pre_mint_nft_massive.type_panel.without_content"), value:'without_preview'}
    ];
    let typeMintList = [
        {label: t("pre_mint_nft_massive.mint_type.option_mint_with_preview"), value:'1'},
        {label: t("pre_mint_nft_massive.mint_type.option_mint_and_reveal"), value:'2'},
        {label: t("pre_mint_nft_massive.mint_type.option_blind_mint"), value:'3'},
    ];
    const [range,setRange] = React.useState({
        rangeBottom:0,
        rangeTop:0,
        limit:0
    })
    const [sliceBottom,setSliceBottom] = React.useState(0);
    const [sliceTop,setSliceTop] = React.useState(range.limit);  
    let urlCollection = `${process.env.REACT_APP_URL_API}/project?address=${address}&domain=${process.env.REACT_APP_DOMAIN}`
    const {data:projectData, loading:projectLoading, error:projectError} = useFetch(urlCollection) //collection
    const [NFTLoading,setNFTLoading] = React.useState(false);
    const [NFTError,setNFTError] = React.useState(null);
    const [isOwner,setIsOwner] = React.useState(false);
    const [metadataFolder,setMetadataFolder] = React.useState(null);
    const [goToCollection,setGoToCollection] = React.useState(false);

    const handleRangeFilter = () =>{
        setSliceBottom(range.rangeBottom-1);
        setSliceTop(range.rangeTop);
    }

    const handleResetValues = () =>{
        setItems([])
        setActiveTab(1);
        setCheckedSharing(false); 
        setCheckedConfirm(false);
        setRange({
            rangeBottom:0,
            rangeTop:0,
            limit:0
        });
        setFormMint({
            link1:'',
            link2:'',
            isValid:{
                link1:false,
                link2:false
            },
            typeMint:'',
            price:0,
            dateMint:'',
            totalMint:0 // only use if typePanel == without_preview;
        });
    }

    const handleRequest = async (body,action) =>{
        setGoToCollection(false);
        let url = `${process.env.REACT_APP_URL_API}/nft/massive?project_key=${address}&action=${action}&domain=${process.env.REACT_APP_DOMAIN}${action=='create'?'&create_from=sheet':''}`
        axios.post(url,body,{
            headers:{
                'Content-Type': 'text/plain;charset=utf-8',
            }
        }).then(async(res) => {
            setNFTError(null)
            if(action == 'create' && res){
                setMsgSuccess("preview success") 
                setMetadataFolder(res.data.metadata_folder_url)
                setActiveTab(2);
                getDataIfExistsNfts();
            }else
            if(action == 'cancel'){
                handleResetValues();
            }else
            if(action == 'confirm'){
                console.log('res to confirm',res)
                if(metadataFolder && items.length > 0) {
                    console.log('metadata_folder_url ::', metadataFolder, formMint.price, items.length)
                    let transaction = await deploy( metadataFolder+"/", body.price,data.userAccount,data.provider);
                    console.log('deploy transaction ::', transaction)
                    let msg = "Approve my intention of update project";
                    let { signature , message } = await sign(msg,data.userAccount,data.provider);
                    await updateProjectKey(projectData[0].project_key, transaction._address, message, signature);
                    handleResetValues();
                }
                setGoToCollection(true);
                setMsgSuccess(t("pre_mint_nft_massive.message.success_pre_mint"))
            }
            setLoad(false)
            setNFTLoading(false)
        }).catch(error=>{
            setGoToCollection(false);
            setLoad(false)
            setNFTLoading(false)
            if (error.response) {
                // Request made and server responded
                if(error.response.data.message) {
                    setNFTError(error.response.data.message)
                }
            } else if(error && String(error+'').includes("status code 500")){
                setNFTError(t("message_errors.try_again_later"))
            }else{
                setNFTError(error)
            }
        })
    }


    const getDataIfExistsNfts = async () =>{
        setLoad(true)
        setNFTLoading(true)
        setMsgLoad(t("pre_mint_nft_massive.looking_data"));
        setNFTError('')
        let url = `${process.env.REACT_APP_URL_API}/nft/massive?project_key=${address}&domain=${process.env.REACT_APP_DOMAIN}`
        axios.get(url).then((res) => {
            if(res && res.data && res.data.length > 0){
                if(res.data.length >= 30){
                    setRange({...range,
                        rangeBottom:1,
                        rangeTop:30,
                        limit:res.data.length
                    })
                    setSliceTop(30)
                }else{
                    setSliceTop(res.data.length)
                    setRange({...range,
                        rangeBottom:1,
                        rangeTop:res.data.length,
                        limit:res.data.length
                    })
                }
                setItems(res.data);
                setSliceBottom(0);
            }else{
                handleResetValues();
            }
            setLoad(false)
            setNFTLoading(false)
        }).catch(er=>{
            setLoad(false)
            setNFTLoading(false)
            if(er && String(er+'').includes("status code 500")){
                setNFTError(t("message_errors.try_again_later"))
            }else{
                setNFTError(er)
            }
            handleResetValues();
            setNFTError(null)
        })
    }


    const handleGetPreview = async() =>{
        try{
            setLoad(true)
            setNFTLoading(true)
            setMsgLoad(t("pre_mint_nft_massive.message_loader.validating_data"))
            let msg = 'Approve preview nfts"'
            let {signature , message} = await sign(msg,data.userAccount,data.provider);
            if(signature){
                let body = {
                    sheet_uri: formMint.link1,
                    folder_uri: formMint.link2,
                    signature: signature,
                    message: message,
                    blockchain_name: process.env.REACT_APP_NETWORK_NAME
                }
                handleRequest(body,"create");
            }
        }catch(err){
            console.log(err)
            setLoad(false)
            setNFTLoading(false)
        }
    }

    const handleConfirmWithOutContent = async() =>{
        try{
            setLoad(true)
            setNFTLoading(true)
            setMsgLoad(t("pre_mint_nft_massive.message_loader.confirm_pre_mint"))
            let msg = 'Confirm massive mint';
            let {signature , message} = await sign(msg,data.userAccount,data.provider);
            if(signature && Number(formMint.totalMint) > 0){
                await initialize(address,data.userAccount, formMint.price, formMint.totalMint,data.provider);
                let body = {
                    quantity: formMint.totalMint,
                    signature: signature,
                    message: message,
                    price:formMint.price,
                    sale_date: new Date(),
                    blockchain_name: process.env.REACT_APP_NETWORK_NAME
                }
                let url = `${process.env.REACT_APP_URL_API}/nft/massive?project_key=${address}&action=create&domain=${process.env.REACT_APP_DOMAIN}&create_from=quantity`
                axios.post(url,body,{
                    headers:{
                        'Content-Type': 'text/plain;charset=utf-8',
                    }
                }).then(async(res) => {
                    console.log(res)
                    handleResetValues();
                    getDataIfExistsNfts();
                    setMsgSuccess(t("pre_mint_nft_massive.message.success_pre_mint"))  
                }).catch(er=>{
                    setLoad(false)
                    setNFTLoading(false)
                    if(er && String(er+'').includes("status code 500")){
                        setNFTError(t("message_errors.try_again_later"))
                    }else{
                        setNFTError(er)
                    }
                })
            }
        }catch(err){
            console.log(err)
            setLoad(false)
            setNFTLoading(false)
        }
    }

    const handleConfirmWithContent = async() =>{
        try{
            setLoad(true)
            setNFTLoading(true)
            setMsgLoad(t("pre_mint_nft_massive.message_loader.confirm_pre_mint"))
            let msg = 'Confirm massive mint';
            let {signature , message} = await sign(msg,data.userAccount,data.provider);
            if(signature){
                let body = {
                    signature: signature,
                    message: message,
                    blockchain_name: process.env.REACT_APP_NETWORK_NAME,
                    reveal_type: "at_date",
                    //reveal_date: new Date(),
                    //sale_date: new Date(),
                    price: Number(formMint.price) == 0 ? 1 : Number(formMint.price)
                }
                handleRequest(body,"confirm");
            }
        }catch(err){
            console.log(err)
            setLoad(false)
            setNFTLoading(false)
        }
    }

    const handleCancel = async() =>{
        try{
            setLoad(true)
            setNFTLoading(true)
            setMsgLoad(t("pre_mint_nft_massive.message_loader.cancel_pre_mint"))
            let msg = 'Cancel massive mint';
            let {signature , message} = await sign(msg,data.userAccount,data.provider);
            if(signature){
                let body = {
                    signature: signature,
                    message: message,
                    blockchain_name: process.env.REACT_APP_NETWORK_NAME
                }
                handleRequest(body,"cancel");
            }
        }catch(err){
            console.log(err)
            setLoad(false)
            setNFTLoading(false)
        }
    }

   

    React.useEffect(()=>{
        window.scrollTo(0,0)
    },[]);

    React.useEffect(()=>{
        if(msgSuccess != ''){
            let timeOut = setTimeout(()=>{
                setMsgSuccess('')
                clearTimeout(timeOut);
                return null;
            },19600)
        }
    },[msgSuccess]);

    

    React.useEffect(()=>{
        if(!projectLoading && projectData != null && projectData.length > 0 && projectData[0] != null && projectData[0].owner){
            if(data != null && data.userAccount != null && data.userAccount != 'undefined' && String(projectData[0].owner+'').toUpperCase() === String(data.userAccount+'').toUpperCase()){
                setIsOwner(true); 
                getDataIfExistsNfts();
            }else{
                setIsOwner(true);
                getDataIfExistsNfts();

            }
        }  
    },[projectLoading,data,projectData]);



    return (
        <Box>
            <Container maxWidth="xl">
                    <br></br>
                    <CardContent>
                        <Box sx={{mb:'10px'}}>  
                            <ContentArea>
                                <ContentForm>
                                    <center>
                                        <TitleH2>{t("pre_mint_nft_massive.collection_selected")}</TitleH2>
                                    </center>
                                    <Box component='section' sx={{m:'0 auto',width:'90%',minHeight:'200px',maxHeight:'400px'}} >
                                        <ShowCollection  content={projectData} loading={projectLoading} error={projectError}/>
                                    </Box>
                                    <ChosePanelMint 
                                        typePanel={typePanel}
                                        showOptionPanel={showOptionPanel}
                                        setShowOptionPanel={setShowOptionPanel}
                                        checkedSharing={checkedSharing}
                                        setCheckedSharing={setCheckedSharing}
                                        formMint={formMint}
                                        setFormMint={setFormMint}
                                        handleGetPreview={handleGetPreview}
                                        typeMintList={typeMintList}
                                        t={t}
                                        NFTLoading={NFTLoading}
                                        load={load}
                                        activeTab={activeTab}
                                        maxDate={maxDate}
                                        handleResetValues={handleResetValues}
                                        isOwner={isOwner}
                                        handleConfirmWithOutContent={handleConfirmWithOutContent}
                                    />
                                    { activeTab == 2 && isOwner &&
                                    <Box sx={{m:'30px 0px'}}>
                                        <center>
                                            <FormControlLabel
                                                sx={{color:'#fff'}}
                                                control={<Checkbox sx={{color:'#43B02A','&.Mui-checked': {color:'#43B02A'}}} value={checkedConfirm}
                                                onChange={()=>{setCheckedConfirm(!checkedConfirm)}} />}
                                                label={t("pre_mint_nft_massive.confirm_checkbox")}
                                            />
                                        </center>
                                        <center>
                                            <ButtonStyled 
                                                text={t("pre_mint_nft_massive.pre_mint_btn")}
                                                onClick={handleConfirmWithContent}
                                                isDisabled={formMint.price <= 0  && formMint.typeMint == '2' || formMint.typeMint == '3' && formMint.dateMint == '' || items.length == 0 || items == null || items == undefined || !checkedConfirm }
                                            />
                                        </center>
                                        <br/>
                                        <center>
                                            <ButtonStyled 
                                                text={t("pre_mint_nft_massive.cancel_btn")}
                                                onClick={handleCancel}
                                                isDisabled={items.length == 0 || items == null || items == undefined}
                                            />
                                        </center>
                                    </Box>
                                    }
                                </ContentForm>
                                <LineDividerV orientation="vertical"  flexItem />
                                <LineDividerH orientation="horizontal"  flexItem />
                                <ContentFilter>
                                    <Divider sx={{display:{xs:'block',sm:'block',md:'none',lg:'none',xl:'none'},background:'#fff',m:'10px 0px'}} />
                                    <center>
                                        <FilterTitle>{t("pre_mint_nft_massive.preview.title")}</FilterTitle>
                                    </center>
                                    <FilterBody>
                                        <Box>
                                            <FilterForm>
                                                <TextBoxFilterRange 
                                                    range={range}
                                                    setRange={setRange}
                                                    nameRange="rangeBottom"
                                                    value={range.rangeBottom}
                                                    size={"small"}
                                                    label={"MIN"}
                                                    width={"100%"}
                                                    maxNumber={items.length}
                                                />
                                                <h3>{t("pre_mint_nft_massive.preview.to")}</h3>
                                                <TextBoxFilterRange 
                                                    range={range}
                                                    setRange={setRange}
                                                    nameRange="rangeTop"
                                                    value={range.rangeTop}
                                                    size={"small"}
                                                    label={"MAX"}
                                                    width={"100%"}
                                                    maxNumber={items.length}
                                                />
                                                <ButtonStyled 
                                                    width={"250px"}
                                                    text={t("pre_mint_nft_massive.preview.view_btn")}
                                                    onClick={handleRangeFilter}
                                                    isDisabled={items.length == 0 || items == null || items == undefined}
                                                />
                                            </FilterForm>
                                        </Box>
                                        {items.length > 0 && 
                                        <FilterDetailsContent>
                                            <FilterDetails>
                                                <Box><b>{t("pre_mint_nft_massive.preview.total_items")}: </b>{items.length}</Box>
                                                <Box><b>{t("pre_mint_nft_massive.preview.from")}: </b>{sliceBottom == 0?1:sliceBottom+1} <b>{t("pre_mint_nft_massive.preview.to")}: </b>{sliceTop}</Box>
                                            </FilterDetails>
                                        </FilterDetailsContent>
                                        }
                                    </FilterBody>
                                    <Box>
                                        <Divider />
                                        
                                        {
                                        !load && NFTError &&
                                        <ContainerMessage>  
                                            <h3>{NFTError+''}</h3>
                                         </ContainerMessage>
                                        }
                                        <MessageBox msgSuccess={msgSuccess} isOwner={isOwner} loading={projectLoading} t={t}/>
                                        {
                                            goToCollection && projectData && projectData.length > 0 && projectData[0] &&
                                            <Box
                                                sx={{display:'flex',justifyContent:'center'}}
                                            >
                                                <Button
                                                    LinkComponent={Link}
                                                    to={`/collection-buy?collection=${projectData[0].project_key}`}
                                                    type="button"
                                                    sx={{
                                                        mt:'10px'
                                                    }}
                                                >
                                                {t("pre_mint_nft_massive.go_to_collection")}
                                                </Button>
                                            </Box>
                                        }
                                        {
                                        (items.length > 0 || activeTab == 2) &&
                                        <React.Fragment>
                                            <center>
                                                <TextTotal>Total ( {range.rangeTop-(range.rangeBottom) > 0 ? (range.rangeTop-range.rangeBottom+1):1} {' / '+items.length} )</TextTotal>
                                            </center>
                                            <Box
                                                sx={{p:'5px'}}
                                            >
                                                <ContainerCards>
                                                    {
                                                        items?.slice(sliceBottom,sliceTop).map((item,index)=>{
                                                            return (
                                                                <BodyCard key={index}>
                                                                    <CardGrid1>
                                                                        <CardNFT item={item}/>
                                                                        <Box sx={{p:'5px',color:'#fff'}}>
                                                                            <small>
                                                                                <b>{t("pre_mint_nft_massive.cards.name")}: </b>
                                                                                {item.metadata.json_data.name}
                                                                            </small>
                                                                            <br></br>
                                                                            <small>
                                                                                <b>{t("pre_mint_nft_massive.cards.description")}: </b>
                                                                                {item.metadata.json_data.description}
                                                                            </small>
                                                                            <br></br>
                                                                        </Box>
                                                                    </CardGrid1>
                                                                    <Box sx={{width:'100%',color:'#fff'}}>
                                                                        <small>
                                                                            <b>{t("pre_mint_nft_massive.cards.attributes")}: </b>
                                                                        </small>
                                                                    </Box>
                                                                    <CardGrid2>
                                                                        {(item.metadata && item.metadata.json_data && item.metadata.json_data.attributes)?.map((attribute, index) => (
                                                                            attribute.trait_type != 'Description' &&  attribute.trait_type != 'Name' && attribute.trait_type != 'Number' &&
                                                                            <Card key={index}>
                                                                                <ListItemText 
                                                                                    primaryTypographyProps={{style: {color:'#fff',fontSize:'13px'}}}
                                                                                    secondaryTypographyProps={{style: {color:'#B9B9B9',fontSize:'12px'}}}
                                                                                    primary={attribute.trait_type ? (attribute.trait_type) : ''} 
                                                                                    secondary={attribute.trait_type ? (attribute.value) : ''}
                                                                                    sx={{textAlign:'center'}}
                                                                                />
                                                                            </Card>
                                                                        ))}
                                                                    </CardGrid2>
                                                                </BodyCard>
                                                            )
                                                        })
                                                    }
                                                </ContainerCards>
                                            </Box>
                                           
                                        </React.Fragment>
                                        }
                                    </Box>
                                </ContentFilter>
                            </ContentArea>
                        </Box>
                    </CardContent>
            </Container>
            <LoaderModal
                text={msgLoad}
                isOpen={NFTLoading||load}
                textColor='#fff'
                spinnerColor='#fff'
            />
        </Box>
    );
};

export default PreMintMassive;