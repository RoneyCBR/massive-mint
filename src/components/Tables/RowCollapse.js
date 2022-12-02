import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Status from 'components/Status/Status';
import avalancheIcon from 'assets/logos/avalanche_logo.svg';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {useTranslation} from 'react-i18next';
import { Link } from 'react-router-dom';

const RowCollapse = ({row,show,handleChange,index,arrChecked,data,address,closeRowCollapse,handleCloseRowCollapse}) => {
    const { t } = useTranslation("translate");

    const {REACT_APP_COLLECTION_ADDRESS} = process.env;

    const formatDate = (date) => {
      const lang = localStorage.getItem('i18nextLng');
      const setLang = lang ? lang : 'en'
      const dateFormated = new Date(date);
      const dateFormatedString = new Intl.DateTimeFormat(`${setLang}`, { month: 'short', day:'2-digit', year:'2-digit' }).format(dateFormated);
      const hourFormat = new Intl.DateTimeFormat(`${setLang}`, { hour: '2-digit', minute:'2-digit'}).format(dateFormated);
      let formatText = '';
        if(setLang == 'en'){
            formatText = dateFormatedString.replace(' ','/').replace(',','/')
        }else{
            formatText = dateFormatedString.replace(' ','/').replace(' ','/')
        }
        return formatText   +' - ' + hourFormat + ' H';
    }

    const handleCollapse= (index) => {
        if(closeRowCollapse.length > 0){
            closeRowCollapse.map((value,index1)=>{
                console.log(value);
                if(index1 == index){
                    handleCloseRowCollapse(index,!value)
                   
                }
            })
        }else{
            handleCloseRowCollapse(index,true)
        }
    }

    const handleOnLoadCapture = (e) => {
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnLoadCapture")
    }

    const handleOnLoad = (e) => {
        e.isPropagationStopped(e);
        console.log("imgOnLoad::",e)
    }


    const handleOnLoadStart = (e) => {
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnLoadStart")
    }


    const handleOnError = (e) => {
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnError")
    }

    const handleOnEnded = (e) =>{
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnEnded")
    }

    const handleOnLoadedData = (e) => {
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnLoadedData")
    }

    const handleOnLoadedMetadata = (e) => {
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnLoadedMetadata")
    }
    const handleOnLoadStartCapture = (e) =>{
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnLoadStartCapture")
    }
    const handleOnLoadedDataCapture = (e) => {
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnLoadedDataCapture")
    }

    const handleOnLoadedMetadataCapture = (e) => {
        e.isPropagationStopped(e);
        console.log("imgOnLoad:: handleOnLoadedMetadataCapture")
    }
    

    return (
        <React.Fragment>
            {/* <TableRow size="small" sx={open ?{display:'none'} :{display:'auto'} }> */}
            <TableRow size="small" sx={{'&:hover':{cursor:'pointer'} }}  >

                <TableCell size="small" align="left" padding='none' 
                    sx={{width:'10px'}} 
                >

                    <Box sx={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                        {
                            data  && (data.userAccount+'').toUpperCase() == (address+'').toUpperCase() ?
                                arrChecked.length!=0 ?
                                arrChecked.map((val)=>{
                                    return val.name == index &&
                                    <input
                                    style={{marginLeft:'15px'}}
                                    type="checkbox"
                                    name={index}
                                    checked={val.check}
                                    onChange={(e)=>{handleChange(e)}}
                                    />
                                })
                                :
                                <input
                                style={{marginLeft:'15px'}}
                                type="checkbox"
                                name={index}
                                onChange={(e)=>{handleChange(e)}}
                                />
                            :
                            ''
                         }
                        
                        {
                            closeRowCollapse.length > 0 ?
                            closeRowCollapse.map((value,index1)=> {
                            return index1 == index &&
                             <span key={index1}>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => handleCollapse(index)}
                                >
                                    {value ? <KeyboardArrowUpIcon htmlColor='#4D4D4D' /> : <KeyboardArrowDownIcon htmlColor='#4D4D4D' />}
                                </IconButton>
                            </span>
                            })
                            :
                            <span >
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => handleCollapse(index)}
                                >
                                    <KeyboardArrowDownIcon htmlColor='#4D4D4D' />
                                </IconButton>
                            </span>

                        }
                        
                        

                    </Box>
                </TableCell>
                <TableCell padding='none' align="center"  onClick={() => handleCollapse()}>
                    <Status status={row.status} timeLive={row.timelive} created_at={row.created_at}/>
                </TableCell>
                <TableCell align="center" onClick={() => handleCollapse(index)} >
                    {
                        row && row.offers && row.offers.length > 0 ?
                        <>
                        {row.offers.length }

                        </>
                    : '---'}

                </TableCell>
                <TableCell align="center" onClick={() => handleCollapse(index)}>
                    {
                      row.amount ?
                        row.amount != 0 ?
                        <>
                        {row.amount}
                        <img src={avalancheIcon} style={{height:'13px', width:'13px',marginLeft:'5px'}} />
                        </>
                        :
                        "---"
                      :
                      "---"
                      }
                </TableCell>
                <TableCell padding='none' align="center" onClick={() => handleCollapse(index)}
                    sx={{
                        '@media screen and (max-width: 600px)':{
                            display:'none'
                        }
                    }}
                >
                    {
                        row.amount ?
                            row.amount && row.usd_price && row.amount.length > 0 ?
                            ((row.usd_price)*(row.amount)+'').substring(0,8)
                            :
                            '---'
                        :
                        '---'
                    }
                </TableCell>
                <TableCell onClick={() => handleCollapse(index)}
                    sx={{
                        color:'#ed2891',
                        '@media screen and (max-width: 600px)':{
                            display:'none'
                        }
                    }}
                >
                    {
                        show == "to" ?
                        (row.to).substring(0,5)+ '...' +(row.to).substring(38,54)
                        :
                        (row.from).substring(0,5)+ '...' +(row.from).substring(38,54)
                    }
                </TableCell>
                <TableCell align='center' onClick={() => handleCollapse(index)}
                    sx={{
                        '@media screen and (max-width: 600px)':{
                            display:'none'
                        }
                    }}
                >
                    {formatDate(row.created_at)}
                </TableCell>
            </TableRow>
                                                        
            

            {
                closeRowCollapse.map((value,index1)=> {

                
                if(index1 === index && value == true)
                return <TableCell key={index1} style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                        <Collapse in={value} timeout="auto" unmountOnExit>
        
                            <Box sx={row.amount && row.amount > 0 ?
                                {margin: 1,height:'180px',width:'100%'}
                                :
                                {margin: 1,height:'140px',width:'100%'}
                            }>
        
                                <Grid container rowSpacing={1}  spacing={{ xs: 2, md: 2, lg: 2 }} columns={{xs: 12, sm: 12,md:12, lg:12 }}>
                                    <Grid  item xs={5} sm={5} md={5} lg={5}>
                                        <center>
                                            {
                                                // show == "from" ?
                                                // <b>
                                                //     {t("profile.offer_nfts")}
                                                // </b>
                                                // :
                                                // <b>
                                                //     {t("profile.for_nfts")}
                                                // </b>

                                                <b>
                                                    {t("profile.offer_nfts")}
                                                </b>
                                               
                                            }
                                           
                                        <Box sx={{height:'120px',width:'120px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            {

                                                <Link style={{textDecoration:'underline',color:'#ed2891'}} to={`/nft?address=${REACT_APP_COLLECTION_ADDRESS}&token_id=${row.id_token}`}>
                                                    <CardMedia
                                                        sx={{padding:'25px'}}
                                                        component="img"
                                                        image={row.nft.thumb_url_mini}
                                                       
                                                    />
                                                </Link>
                                            }
                                        </Box>
                                        </center>
                                    </Grid>
                                    <Grid  item xs={2} sm={2} md={2} lg={2} >
                                        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'140px'}}>
                                            <CompareArrowsIcon sx={{fontSize:'70px',color:'#F344A1'}}/>
                                        </Box>
        
                                    </Grid>
                                    <Grid  item xs={5} sm={5} md={5} lg={5}>
                                        <center>
                                            {
                                                // show == "to" ? 
                                                // <b>
                                                //     {t("profile.offer_nfts")}
                                                // </b>
                                                // :
                                                // <b>
                                                //     {t("profile.for_nfts")}
                                                // </b>
                                                <b>
                                                    {t("profile.for_nfts")}
                                                </b>
                                            }
                                            <Box sx={{height:'140px'}}>
                                                {
                                                row.nft_offers && row.nft_offers.length > 0 &&
        
                                                <Grid container rowSpacing={1}  spacing={{ xs: 2, md: 2, lg: 2 }} columns={{xs: 12, sm: 12,md:12, lg:12 }}>
                                                    {
                                                        row.nft_offers?.map((offer,index) => (
                                                            row.nft_offers.length == 1 ?
                                                            <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
                                                                <Box sx={{height:'120px',width:'120px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                                    
                                                                    
                                                                   
                                                                        <Link style={{textDecoration:'underline',color:'#ed2891'}} to={`/nft?address=${REACT_APP_COLLECTION_ADDRESS}&token_id=${offer.id_token}`}>
                                                                        <CardMedia
                                                                            sx={{padding:'25px'}}
                                                                            component="img"
                                                                            image={offer.thumb_url_mini}
                                                                            onLoad={(e)=>handleOnLoad(e)}
                                                                            onLoadCapture={(e)=>handleOnLoadCapture(e)}

                                                                            onError={(e)=>handleOnError(e)}
                                                                            onEnded={(e)=>handleOnEnded(e)}
                                                                            onLoadStart={(e)=>handleOnLoadStart(e)}
                                                                            onLoadedData={(e)=>handleOnLoadedData(e)}
                                                                            onLoadedMetadata={(e)=>handleOnLoadedMetadata(e)}
                                                                            onLoadStartCapture={(e)=>handleOnLoadStartCapture(e)}
                                                                            onLoadedDataCapture={(e)=>handleOnLoadedDataCapture(e)}
                                                                            onLoadedMetadataCapture={(e)=>handleOnLoadedMetadataCapture(e)}
                                                                        />
                                                                        </Link>
                                                                    
                                                                   
                                                                </Box>
                                                            </Grid>
                                                            :
                                                            ''
                                                        ))
                                                    }
                                                </Grid>
                                                }
                                                {
                                                    row && row.amount && row.amount > 0 &&
                                                    <center>
                                                    {
                                                        row.offers && row.offers.length > 0 ?
                                                        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                            <b>+</b>
                                                        </Box>
                                                        :
                                                        <br/>
                                                    }
                                                   
                                                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                        {row.amount}<span> <img src={avalancheIcon} style={{height:'13px', width:'13px',marginLeft:'5px'}} /></span>
                                                    </Box>
                                                    </center>
        
                                                }
                                            </Box>
        
                                        </center>
                                    </Grid>
                                </Grid>
        
                            </Box>
                        </Collapse>
        
                    </TableCell>
                    })
                }
               
           
           


        </React.Fragment>
    )
}

RowCollapse.propTypes = {
    row: PropTypes.shape({
        status: PropTypes.number.isRequired,
        timelive: PropTypes.string.isRequired,
        created_at: PropTypes.number.isRequired,
        amount: PropTypes.string,
        offers: PropTypes.array.isRequired,
        usd_price: PropTypes.string,
        from : PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        nft_offers: PropTypes.array.isRequired,
        nft: PropTypes.object.isRequired,
        id_token: PropTypes.number.isRequired
    }).isRequired,
    show: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    arrChecked: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    closeRowCollapse : PropTypes.array.isRequired,
    handleCloseRowCollapse: PropTypes.func.isRequired
};

export default RowCollapse;