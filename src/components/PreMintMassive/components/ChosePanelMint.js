import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonStyled from './ButtonStyled';
import TextBoxLink from './TextBoxLink';
import TypeMintRadioButton from './TypeMintRadioButton';
import {
    PanelContainer,
    TextBox,
    TitleH3,
    TitleText
} from '../style';

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
    isOwner,
    handleConfirmWithOutContent,
    existData
}) =>{

    const handleChange = (e) =>{
        const {value,name} = e.target;
        if(value > 0){
            setFormMint({...formMint,[name]:value});
        }else{
            setFormMint({...formMint,[name]:value==""?value:0});
        }
    }

    return (
        <React.Fragment>
            <center>
                {
                    (!existData && isOwner) &&
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
                        <TitleText>{t("pre_mint_nft_massive.without_preview_text")}</TitleText>
                    </Box>
                    <center>
                        <TitleH3>{t("pre_mint_nft_massive.total_to_mint")}*</TitleH3>
                        <TextBox
                            type="number"
                            size={"small"}
                            label={""}
                            value={formMint.totalMint}
                            name={"totalMint"}
                            onChange={(e)=>{handleChange(e)}}
                        />
                    </center>
                    <center>
                        <TitleH3>{t("pre_mint_nft_massive.price")}*</TitleH3>
                        <TextBox
                            type="number"
                            size={"small"}
                            label={""}
                            value={formMint.price}
                            name={"price"}
                            onChange={(e)=>{handleChange(e)}}
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
                isOwner && (existData || showOptionPanel.typeMint == "with_preview") &&
                <PanelContainer>
                    {
                        !existData && 
                        <React.Fragment>
                            <Box sx={{width:'100%'}}>
                                <TitleText>{t("pre_mint_nft_massive.step_1")}</TitleText>
                            </Box>
                            <center>
                                <FormControlLabel
                                    sx={{color:'#fff',textAlign:'left'}}
                                    control={<Checkbox sx={{color:'#43B02A','&.Mui-checked': {color:'#43B02A'}}} value={checkedSharing}
                                    onChange={()=>{setCheckedSharing(!checkedSharing)}} />}
                                    label={t("pre_mint_nft_massive.confirm_step_1")}
                                />
                            </center>
                        </React.Fragment>
                    }
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
                            t={t}
                        />
                        <TextBoxLink 
                            link={formMint}
                            setLink={setFormMint}
                            value={formMint.link2}
                            nameLink="link2"
                            size={"large"}
                            width={"100%"} 
                            label={t("pre_mint_nft_massive.folder_rul")}
                            t={t}
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
                               ( formMint.typeMint == 2 ) &&
                                <Box sx={{m:'5px 0px'}}>
                                    <center>
                                        <TitleH3>{t("pre_mint_nft_massive.price")}*</TitleH3>
                                        <TextBox
                                            type="number"
                                            size={"small"}
                                            label={""}
                                            value={formMint.price}
                                            name={"price"}
                                            onChange={(e)=>{handleChange(e)}}
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
    handleConfirmWithOutContent: PropTypes.func,
    existData: PropTypes.bool
}

export default ChosePanelMint;
