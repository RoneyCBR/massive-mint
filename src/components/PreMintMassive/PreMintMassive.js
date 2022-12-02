import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {useFetch} from './hooks/useFetch';
import ShowCollection from './components/ShowCollection';
import ChosePanelMint from './components/ChosePanelMint';
import {
    CardContent,
    ContentArea,
    ContentForm,
    TitleH2,
    LineDividerV,
    LineDividerH,
    ContentFilter
} from './style';


const PreMintMassive = ({
    data,
    titleCollection,
    urlCollections,
    t
    })=>{
    let day = 86399000; // one day
    let nMonth = day * 30; // 30 days
    let maxDate = (new Date().getTime()) + (nMonth*3); // max date selected
    const [isOwner,setIsOwner] = React.useState(false);
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
    }

    const handleGetPreview = async() =>{
       alert(22);
    }

    const handleConfirmWithOutContent = async() =>{
        alert("confirm")
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