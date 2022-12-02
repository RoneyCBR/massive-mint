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
    TextBox
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

export default ChosePanelMint;
