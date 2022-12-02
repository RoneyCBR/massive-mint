import React,{useEffect} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import {useTranslation} from 'react-i18next';
import { allRequestChangeByTokenId } from 'views/NFT/components/RequestChange/allRequestChangeByTokenId'; 
import { Context } from 'hooks/WalletContext'
import {useLocation} from 'react-router-dom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AcceptExchange from 'views/NFT/components/ModalOffers/components/AcceptExchange/AcceptExchangeCrypto'; 
import { cancelAllByIds } from 'services/cancelAllRequests/cancelAllByIds'; 
import {sign} from "services/Blockchain/signMessage"
import avalancheIcon from 'assets/logos/avalanche_logo.svg'
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';


function EnhancedTableHead(props) {
    const {t} = useTranslation("translate");
    const { order, orderBy, onRequestSort,data,address} = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    
    return (
      <TableHead>
        <TableRow >
          <TableCell   align="center"
            sx={
                data  && (data.userAccount+'').toUpperCase() == (address+'').toUpperCase() ?
                {display:'auto'}
                :
                {display:'none'}
            }
            >
            </TableCell>
            <TableCell  padding='none' align="center">
                <b>{t("nft-screen.offers_modal_table.status_title_column")}</b>
            </TableCell>
            <TableCell  align="center">
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <BsFillGrid1X2Fill style={{fontSize:'12px',marginRight:'3px'}}/>
                <b>NFTs</b>
                </Box>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === "amount"}
                direction={orderBy === "amount" ? order : 'asc'}
                onClick={createSortHandler("amount")}
              >
                <b>{t("nft-screen.offers_modal_table.crypto_title_column")}</b>
                {orderBy === "amount" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ):null}
              </TableSortLabel>
            </TableCell>
            <TableCell align="center"
                sx={{
                    '@media screen and (max-width: 600px)':{
                        display:'none'
                    }
                }}
            >
                <b>{t("nft-screen.offers_modal_table.usd_title_column")}</b>
            </TableCell>
            <TableCell align="center"
              sx={{
                '@media screen and (max-width: 600px)':{
                  display:'none'
                }
              }}
            >
                <b>{t("nft-screen.offers_modal_table.from_title_column")}</b>
  
            </TableCell>
            <TableCell align="center"
              sx={{
                '@media screen and (max-width: 600px)':{
                  display:'none'
                }
              }}
            >
              <b>{t("nft-screen.offers_modal_table.date_title_column")}</b>
            </TableCell>
          </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    data: PropTypes.object,
    address: PropTypes.string,
  };

const AllOffers = () => {
    const { t } = useTranslation("translate");
    const {data} = React.useContext(Context)
    const {state} = useLocation();
    const {address,id_token,nftImage} = state ? state : {address:'',id_token:'',nftImage:''}
    
    let nftWithOffers = new Array();
    nftWithOffers.push({thumb_resize:nftImage});
    const [allOffers, setAllOffers] = React.useState([]);
    
    const [arrChecked, setArrChecked] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const [showAcceptExchange,setShowAcceptExchange] = React.useState(false)
    const [showTableOffers,setShowTableOffers] = React.useState(false)
    const [initCancel,setInitCancel] = React.useState(false)
    const [deleteLoading,setDeleteLoading] = React.useState(false)
    const [load,setLoad] = React.useState(true)

    const [error, setError] = React.useState(false);
    const [msg,setMsg] = React.useState('');
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('amount');
    console.log(load)
    const handleSwitchContent = (item) => {
        if(!initCancel){
        setSelected(item);
        console.log("selected ::",selected);
        setShowAcceptExchange(true)
        console.log(showTableOffers);
        }
    }

    const handleChange = (e) =>{
        
        const {name,checked} = e.target;
        let arrTemp = new Array();
       
        if(arrChecked.length == 0){
            allOffers.map((val,index)=>{
                if(name != "allSelected"){
                    if(name == index){
                        arrTemp.push({name:index,check:checked,id : val.id})
                    }else{
                        arrTemp.push({name:index,check:!checked,id : val.id})
                    }
                }else{
                    arrTemp.push({name:index,check:checked,id : val.id})
                }
            })
            setArrChecked(arrTemp)   
        }else{
            arrChecked.map((val,index)=> {
                if(name != "allSelected"){
                    if(name == index){
                        arrTemp.push({name:index,check:checked,id : val.id})
                    }else{
                        arrTemp.push(val)
                    }
                }else{
                    arrTemp.push({name:index,check:checked,id : val.id})
                }
            })
            setArrChecked(arrTemp);
        }
        console.log("arrChecked::",arrChecked)    
    }
    
    console.log('allOffers ::', allOffers)
    const formatDate = (date) => {
        const lang = localStorage.getItem('i18nextLng');
        const setLang = lang ? lang : 'en'
        const dateFormated = new Date(date);
        const dateFormatedString = new Intl.DateTimeFormat(`${setLang}`, { month: 'short', day:'2-digit', year:'2-digit' }).format(dateFormated);
        const hourFormat = new Intl.DateTimeFormat(`${setLang}`, { hour: '2-digit', minute:'2-digit', hour12:false }).format(dateFormated);
        let formatText = '';
        if(setLang == 'en'){
            formatText = dateFormatedString.replace(' ','/').replace(',','/')
        }else{
            formatText = dateFormatedString.replace(' ','/').replace(' ','/')
        }

        return formatText   +' - ' + hourFormat + ' H';
    }
    
    
    const msFormat = (ms, date) => {
        const dateFormated = new Date(date).getTime();
        const msFormated = dateFormated + Number(ms)
        const hours = Math.floor((msFormated % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((msFormated % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((msFormated % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    }
    

    const getAllOffers = () => {
        setLoad(true)
        allRequestChangeByTokenId(id_token).then((success) =>{
            console.log('success ::', success)
            setAllOffers(success.data)    
            setLoad(false)     
        }).catch((error) => {
            console.log('error ::', error)
            setLoad(false)
        })
        
    }

    const handleResetAllOffers = () => {

        let arrTemp = new Array();
        allOffers.map((val)=>{
        
            arrChecked.map((arr)=>{
               if(arr.id == val.id && !arr.check){
                    arrTemp.push(val)
                }
            })
        })
        setAllOffers(arrTemp);
    }

    const handleTrash = () => {
        setMsg('')
        setError(false);
        setDeleteLoading(true);
        console.log("arrChecked::",arrChecked)
        setInitCancel(true);
        if(data && data.provider){
            sign(data.userAccount,data.provider,t("all_offers.cancel_offers_text"),"cancel").then(res => {
                console.log(res)
                setError(false);
                let requestIDS = []
                arrChecked.forEach((check) => {
                    if(check.check) {
                        requestIDS.push(check.id)
                    }
                })
                console.log('requestIDS ::',requestIDS)
                if(requestIDS.length > 0) {
                    cancelAllByIds(requestIDS).then((success) => {
                        console.log(success)
                        setMsg(t('all_offers.cancel_success_text'))
                        setInitCancel(false);
                        handleResetAllOffers()
                        setDeleteLoading(false);
                        setArrChecked([]);
                    },(error) => {
                        console.log(error)
                        setMsg(error.message)
                        setError(true);
                        setInitCancel(false);
                        setDeleteLoading(false);
                    })
                }
                
            }).catch(error => {
                console.log(error)
                if(error.code == '4001'){
                    setMsg(t("custom_error_metamask.cancel_transaction"));
                }else{
                    setMsg("Error: "+ error.message.substring(0,100));
                }
                setError(true);
                setInitCancel(false);
                setDeleteLoading(false);
            })   
        }
    }

    useEffect(() => {
        if(data && data.userAccount){
            getAllOffers()    
        }
       
    },[data]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };


    const descendingComparator = (a, b, orderBy) =>{
        if(b[orderBy]){
            if (parseFloat(b[orderBy]) < parseFloat(a[orderBy])) {
              return -1;
            }
            if (parseFloat(b[orderBy]) > parseFloat(a[orderBy])) {
              return 1;
            }
        }else{
            return -1;
        }
        return 0;
    }
      
      const getComparator = (order, orderBy)=> {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
      
      // This method is created for cross-browser compatibility, if you don't
      // need to support IE11, you can use Array.prototype.sort() directly
      const stableSort = (array, comparator)=>{
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      
    
    return (
        < >

        <Container 
            maxWidth="lg"
            sx={{
                '@media screen and (max-width: 600px)': {
                    padding: '0px',
                  
                }
            }}
        >
            <Box sx={{width:'100%',color:'#ed2891',textAlign:'center', marginBottom:'15px'}}>
                <h1 style={{fontSize:'35px'}}>{t("all_offers.exchange_offers")}</h1>          
            </Box>

            <Box sx={{width:'100%'}}>
                <center>
                    <Card sx={{width:'170px',borderRadius:'5px',margin:'0 auto'}}>
                    <CardMedia
                        component="img"
                        image={nftImage}
                    />
                    </Card>
                </center>
            </Box>
            <Box sx={{display:'none'}}>
                {address}
            </Box>
            {
                    msg != '' &&
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0px'}}>
                        <Alert severity={error ? "error":"success"} >
                            {msg}
                        </Alert>
                    </Box>
            }  
            <Box sx={{width:'100%',height:'40px',display:'flex',justifyContent:'flex-start',marginBottom:'10px'}}>
                <input style={{marginLeft:'20px',marginTop:'10px'}}
                    type="checkbox" 
                    name='allSelected'
                    checked={arrChecked.length == 0 ? false :  arrChecked.filter((val)=> val?.check !== true).length < 1}
                    onChange={(e)=>{handleChange(e)}}
                />

                <span>
                {
                    //arrChecked.length == 0 ? false : arrChecked.filter((val)=> val?.check !== true).length < 1 &&   
                    arrChecked.filter((val)=> val?.check === true).length > 0 && !initCancel &&
                    <Tooltip title={t("all_offers.require_sign_text")} placement="right">
                        <IconButton 
                            onClick={ () => handleTrash()}
                            component='span'
                            sx={{color:'gray'}}
                        >
                            <HighlightOffIcon/>
                        </IconButton>
                    </Tooltip>
                }
                {
                    deleteLoading && 
                    <CircularProgress size={24}
                        sx={{
                            color: '#ED2891',
                            marginLeft: '5px',
                        }}
                    />
                }
                </span>
            </Box>   

             {
                load ?  <center>
                    <CircularProgress 
                    sx={{
                        color: '#ED2891'
                    }}
                    />
                     <h3 style={{color:'#ED2891'}}>{t('gallery.loading')}</h3>
                </center>
                :                
                    <TableContainer 
                        component={Paper} 
                        sx={{
                            '@media screen and (max-width: 600px)':{
                                width:'100%',
                                padding: '0px',
                            }
                        }}
                    >
                    
                    
                                <Table 
                                    size="small" 
                                    aria-label="sticky table"
                                    stickyHeader
                                
                                >
                                    
                                       
                                        <EnhancedTableHead
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={handleRequestSort}
                                            data={data}
                                            address={address}
                                            

                                        />
                                  
                                <TableBody>
                                
                                                
                                    {
                                
                                    stableSort(allOffers, getComparator(order, orderBy)).map((row, index) =>(
                                        <TableRow
                                            key={index}
                                            sx={{
                                                width:'50px',
                                                '&:last-child td, &:last-child th': { 
                                                    border: 0 
                                                },
                                                ':hover':{
                                                    backgroundColor:'#f5f5f5'
                                                    }
                                            }}
                                        
                                        >
                                            <TableCell component="th" scope="row" align='left' sx={{width:'10px'}}>
                                                <Box sx={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                    
                                                    {
                                                        arrChecked.length!=0 ?
                                                        arrChecked.map((val)=>{
                                                            return val.name == index && 
                                                            <>
                                                            <input  
                                                            type="checkbox"
                                                            name={index}
                                                            checked={val.check}
                                                            onChange={(e)=>{handleChange(e)}}
                                                            />
                                                            </>
                                                        })
                                                        :
                                                        <input 
                                                        type="checkbox"
                                                        name={index}
                                                        onChange={(e)=>{handleChange(e)}}
                                                        />
                                                    
                                                    }

                                                </Box>
                                                
                                                
                                            </TableCell>
                                            <TableCell align="center" onClick={() => {handleSwitchContent(row)}} sx={{cursor:'pointer'} } >
                                                {row.status === 1 &&(
                                                    <p style={{color:'#28a745'}}>{row.status}</p>
                                                )}
                                                {row.status === 2 &&(
                                                    <p style={{color:'#dc3545'}}>{row.status}</p>
                                                )}
                                                {row.status === 0 &&(
                                                    <p style={{color:'#6c757d'}}>{row.status}</p>
                                                )}
                                                {row.status != 3 && row.status != 'rejected' && row.status != 'pending' &&(
                                                    <Box sx={{color:'#007bff'}}>
                                                        {row.status === 4 && (<Box>{t("nft-screen.history_movement_table.status_column_expires")}</Box>)}
                                                        <Box>{msFormat(row.timelive, row.created_at)}</Box>
                                                    </Box>                  
                                                )}
                                            </TableCell>
                                            <TableCell align="center" onClick={() => {handleSwitchContent(row)}} sx={{cursor:'pointer'} } >
                                                
                                                    {row.offers ? row.offers.length : '---'}
                                                
                                            </TableCell>
                                            <TableCell align="center" onClick={() => {handleSwitchContent(row)}} sx={{cursor:'pointer'} }>
                                                {
                                                    row.amount && row.amount.length > 0 ? 
                                                    <>
                                                        {(row.amount).substring(0,8) }
                                                        <img src={avalancheIcon} style={{height:'13px', width:'13px',marginLeft:'5px'}} /> 
                                                    </>
                                                    :
                                                    '---'
                                                }
                                            </TableCell>
                                            <TableCell 
                                                align="center"
                                                sx={{
                                                    cursor:'pointer', 
                                                    '@media screen and (max-width: 600px)':{
                                                        display:'none'
                                                    }
                                                }}
                                                onClick={() => {handleSwitchContent(row)}} 
                                            >
                                                {
                                                    row.amount && row.usd_price && row.amount.length > 0 ? 
                                                    ((row.usd_price)*(row.amount)+'').substring(0,8)
                                                    :
                                                    '---'
                                                }
                                            </TableCell>
                                            <TableCell 
                                                align="center"
                                                sx={{
                                                    cursor:'pointer', 
                                                    color:'#ed2891',
                                                    '@media screen and (max-width: 600px)':{
                                                        display:'none'
                                                    }
                                                }}
                                                onClick={() => {handleSwitchContent(row)}} 
                                            >
                                                {/* <Link
                                                    style={{textDecoration:'none',}} 
                                                    to={`/profile?address=${row.from}`}
                                                > */}
                                                    {(row.from).substring(0,5)+ '...' +(row.from).substring(38,54)}
                                                {/* </Link> */}
                                            </TableCell>
                                            <TableCell 
                                                align="center"
                                                sx={{
                                                    cursor:'pointer', 
                                                    '@media screen and (max-width: 600px)':{
                                                        display:'none'
                                                    }
                                                }}
                                                onClick={() => {handleSwitchContent(row)}} 
                                            >
                                                {formatDate(row.created_at)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                                </Table>
                           
                    </TableContainer>
                }

            <Box sx={{width:'100%',marginBottom:'100px'}}>
                <Box sx={{float:'left',marginTop:'5px',marginBottom:'10px'}}>{t("nft-screen.offers_modal_table.approx_text")}</Box>
            </Box>
        </Container>

        {
            showAcceptExchange && 
            <AcceptExchange 
                data={data} 
                setShowAcceptExchange={setShowAcceptExchange} 
                setShowTableOffers={setShowTableOffers} 
                dataNFTS={nftWithOffers} 
                selected = {selected}
            />
        }
        
      
         
        </> 
    );
}

export default AllOffers;
