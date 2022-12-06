import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import {useFetch} from './hooks/useFetch';
import ShowCollection from './components/ShowCollection';
import ChosePanelMint from './components/ChosePanelMint';
import TextBoxFilterRange from './components/TextBoxFilterRange'
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


const PreMintMassive = ({
    data,
    titleCollection,
    urlCollections,
    t
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
    const {data:projectData, loading:projectLoading, error:projectError} = useFetch(urlCollections) //collection
    
    const handleClick = () =>{
        alert("puto!");
    }

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
    }

    const handleGetPreview = async() =>{
       alert(22);
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
                                        <TitleH2 onClick={handleClick}>{titleCollection}</TitleH2>
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
                                    MassiveMint {String(data.userAccount).slice(0,10)+''}
                                </ContentFilter>
                            </ContentArea>
                        </Box>
                    </CardContent>
            </Container>
        </Box>
    )
}

PreMintMassive.propTypes = {
    data: PropTypes.object,
    titleCollection: PropTypes.string,
    urlCollections: PropTypes.string,
    t: PropTypes.any
};


export default PreMintMassive;