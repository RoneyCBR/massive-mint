import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import {useFetch} from './hooks/useFetch';
import ShowCollection from './components/ShowCollection';
import ChosePanelMint from './components/ChosePanelMint';
import TextBoxFilterRange from './components/TextBoxFilterRange';
import axios from 'axios';
import {
    CardContent,
    ContentArea,
    ContentForm,
    TitleH2,
    LineDividerV,
    LineDividerH,
    ContentFilter,
    FilterTitle,
    FilterBody,
    FilterForm,
    FilterDetailsContent,
    FilterDetails,
    LineDividerMobile,
    LineDividerD,
    ContainerMessage,
    ContentGoToCollection,
    ButtonLink,
    TextTotal,
    ContainerCards,
    BodyCard,
    CardGrid1,
    CardGrid2,
    CardList
} from './style';
import ButtonStyled from './components/ButtonStyled';
import MessageBox from './components/MessageBox';
import CardNFT from './components/CardNFT';
import LoaderModal from './components/LoaderModal';


const PreMintMassive = ({
    data,
    titleCollection,
    urlCollections,
    t,
    sign,
    deploy,
    addressCollection
    })=>{
    let day = 86399000; // one day
    let nMonth = day * 30; // 30 days
    let maxDate = (new Date().getTime()) + (nMonth*3); // max date selected
    const [isOwner,setIsOwner] = React.useState(true);
    const [checkedSharing,setCheckedSharing] = React.useState(false);
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
    const [load,setLoad] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(1);
    const [NFTLoading,setNFTLoading] = React.useState(false);
    const [range,setRange] = React.useState({
        rangeBottom:0,
        rangeTop:0,
        limit:0
    })
    const [sliceBottom,setSliceBottom] = React.useState(0);
    const [sliceTop,setSliceTop] = React.useState(range.limit);
    const [items,setItems] = React.useState([]);
    const [msgSuccess,setMsgSuccess] = React.useState('');
    const [NFTError,setNFTError] = React.useState(null);
    const [goToCollection,setGoToCollection] = React.useState(false);
    const [msgLoad,setMsgLoad] = React.useState('Loading...');
    const {data:projectData, loading:projectLoading, error:projectError} = useFetch(urlCollections) //collection
    

    const handleResetValues = () =>{
        setShowOptionPanel({
            ...showOptionPanel,
            typeMint:''
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
        setNFTLoading(false);
        setLoad(false);
        setActiveTab(1);
        setItems([]);
        setMsgSuccess('');
        setNFTError(null);
        setGoToCollection(false);
        setMsgLoad('');
    }

    

    const selectActionRequest = async (res,body,action) =>{
        if(action == 'create' && res){
            setMsgSuccess("preview success") 
            setMetadataFolder(res.data.metadata_folder_url)
            handleResetValues();
            getDataIfExistsNfts();
        }else
        if(action == 'cancel'){
            handleResetValues();
        }else
        if(action == 'confirm'){
            console.log('res to confirm',res)
            if(metadataFolder && items.length > 0) {
                console.log('metadata_folder_url ::', metadataFolder, formMint.price, items.length)
                await deploy( metadataFolder+"/", body.price,data.userAccount,data.provider);
                handleResetValues();
            }
            setGoToCollection(true);
            setMsgSuccess(t("pre_mint_nft_massive.message.success_pre_mint"))
        }
    }

    const getDataIfExistsNfts = async () =>{
        setLoad(true)
        setNFTLoading(true)
        setMsgLoad(t("pre_mint_nft_massive.looking_data"));
        setNFTError('')
        setExistData(false)
        setActiveTab(1)
        let url = `${process.env.REACT_APP_URL_API}/nft/massive?project_key=${address}&domain=${process.env.REACT_APP_DOMAIN}`
        axios.get(url).then(async(res) => {
            setLoad(false)
            setNFTLoading(false)
            selectActionIFExistNFTs(res);
        }).catch(er=>{
            setLoad(false)
            setNFTLoading(false)
            setExistData(false)
            setActiveTab(1)
            if(er && String(er+'').includes("status code 500")){
                setNFTError(t("message_errors.try_again_later"))
            }else{
                setNFTError(er)
            }
            handleResetValues();
            setNFTError(null)
        })
    }


    const handleRequest = async (body,action) =>{
        setGoToCollection(false);
        let url = `${process.env.REACT_APP_URL_API}/nft/massive?project_key=${addressCollection}&action=${action}&domain=${process.env.REACT_APP_DOMAIN}${action=='create'?'&create_from=sheet':''}`
        axios.post(url,body,{
            headers:{
                'Content-Type': 'text/plain;charset=utf-8',
            }
        }).then(async(res) => {
            setNFTError(null)
            setLoad(false)
            setNFTLoading(false)
            selectActionRequest(res,body,action)
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
        alert("confirm")
    }

    const handleRangeFilter = () =>{
        if((range.rangeTop-range.rangeBottom) < 0 || (range.rangeTop-range.rangeBottom) > 29){
            setSliceBottom(0);
            setSliceTop(29);
        }else{
            setSliceTop(range.rangeTop)
            setSliceBottom(range.rangeBottom);
            setPreviewItems((range.rangeTop-range.rangeBottom))
        }        
    }

    React.useEffect(()=>{
        handleResetValues();
        setIsOwner(true);
    },[])

    return (
        <Box>
            <Container maxWidth="xl">
                    <br></br>
                    <CardContent>
                        <Box sx={{mb:'10px'}}>  
                            <ContentArea>
                                <ContentForm>
                                    <center>
                                        <TitleH2>{titleCollection}</TitleH2>
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
                                        existData={existData}
                                    />
                                </ContentForm>
                                <LineDividerV orientation="vertical"  flexItem />
                                <LineDividerH orientation="horizontal"  flexItem />
                                <ContentFilter>
                                    <LineDividerMobile />
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
                                        <LineDividerD />
                                        {
                                        !load && NFTError &&
                                        <ContainerMessage>  
                                            <h3>{NFTError+''}</h3>
                                         </ContainerMessage>
                                        }
                                        <MessageBox msgSuccess={msgSuccess} isOwner={isOwner} loading={projectLoading} t={t}/>
                                        {
                                            goToCollection && projectData && projectData.length > 0 && projectData[0] &&
                                            <ContentGoToCollection>
                                                <ButtonLink
                                                    LinkComponent={Link}
                                                    to={`/collection-buy?address=${projectData[0].project_key}`}
                                                    type="button"
                                                >
                                                {t("pre_mint_nft_massive.go_to_collection")}
                                                </ButtonLink>
                                            </ContentGoToCollection>
                                        }
                                        {
                                        (items.length > 0 || activeTab == 2) &&
                                        <React.Fragment>
                                            <center>
                                                <TextTotal>Items ( {previewItems+1} {' / '+items.length} )</TextTotal>
                                            </center>
                                            <Box
                                                sx={{p:'5px'}}
                                            >
                                                <ContainerCards>
                                                    {
                                                        items.slice(sliceBottom,sliceTop).map((item,index)=>{
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
                                                                        {(item.metadata && item.metadata.json_data && item.metadata.json_data.attributes).map((attribute, index) => (
                                                                            attribute.trait_type != 'Description' &&  attribute.trait_type != 'Name' && attribute.trait_type != 'Number' &&
                                                                            <CardList key={index}>
                                                                                <ListItemText 
                                                                                    primaryTypographyProps={{style: {color:'#fff',fontSize:'13px'}}}
                                                                                    secondaryTypographyProps={{style: {color:'#B9B9B9',fontSize:'12px'}}}
                                                                                    primary={attribute.trait_type ? (attribute.trait_type) : ''} 
                                                                                    secondary={attribute.trait_type ? (attribute.value) : ''}
                                                                                    sx={{textAlign:'center'}}
                                                                                />
                                                                            </CardList>
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
    )
}

PreMintMassive.propTypes = {
    data: PropTypes.object,
    titleCollection: PropTypes.string,
    urlCollections: PropTypes.string,
    t: PropTypes.any,
    sign: PropTypes.func,
    deploy: PropTypes.func,
    addressCollection: PropTypes.string
};


export default PreMintMassive;