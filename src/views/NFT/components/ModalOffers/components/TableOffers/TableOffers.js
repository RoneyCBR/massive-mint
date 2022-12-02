import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box,IconButton,Alert,Tooltip} from '@mui/material';
//import Container from 'components/Container';
import {useTranslation} from 'react-i18next';
//import { Link } from 'react-router-dom';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
//import { MdDeleteForever } from 'react-icons/md';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { cancelAllByIds } from '../cancelAllRequests/cancelAllByIds';
import { sign } from 'services/Utils/signature';
import { CircularProgress } from '@mui/material';
import Status from 'components/Status/Status';
import avalancheIcon from 'assets/logos/avalanche_logo.svg';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { cancelAllCryptoRequestsByIds } from 'services/ExchangeCrypto/cancelAllCryptoRequestsByIds';
import PropTypes from 'prop-types';

const EnhancedTableHead = (props)=> {
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

const TableOffers = ({
    setShowTableOffers,
    data,
    setShowAcceptExchange, 
    allOffers, 
    setSelected, 
    dataNFTS, 
    setAllOffers,
    getAllOffers,
    setIsOpenModalOfferCrypto,
    setOffersSelected, 
    }) => {
    const { t } = useTranslation("translate");
    const {push} = useHistory();
    const [actionChecked, setActionChecked] = React.useState(false);
    const [arrChecked, setArrChecked] = React.useState([]);
    const validIfExpiration = (timelive,created) => {
        console.log('created 1 ::', created)
        const dateFormated = new Date(created);
        const today = new Date().getTime();
        if(Number(today) > (Number(dateFormated.getTime()) + Number(timelive))){
          return false
        }else{
          return true
        }
    }
    const [allOffersCopy, setAllOffersCopy] = React.useState(allOffers.filter(m=> validIfExpiration(m.timelive,m.created_at)));
    const [msg,setMsg] = React.useState('');
    const [error, setError] = React.useState(false);
    const [initCancel,setInitCancel] = React.useState(false)
    const [deleteLoading,setDeleteLoading] = React.useState(false)
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('amount');

   
    console.log("allOffersCopy::",allOffersCopy);
    console.log("success tableoffers::",allOffersCopy);


  
    const handleChangeChecked = () => {
        setActionChecked(!actionChecked);
    }
   
    const handleSwitchContent = (item) => {
 
        console.log("Item::",item);
     
        if(item.amount && item.amount > 0 && !initCancel) {
            setSelected(item);
            setShowTableOffers(true);
            setIsOpenModalOfferCrypto(true);
            setOffersSelected(item);
        }
        if(!initCancel || !item.amount || item.amount === 0) {
            setSelected(item);
            setShowTableOffers(true);
            setShowAcceptExchange(true);
        }
        
    }

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
    
   
 

    const handleNavigateAllOffers = (address,id_token,nftImage) => {
        console.log(nftImage);
        push(`/AllOffers?address=${address}&id_token=${id_token}`, {address,id_token,nftImage});
    }

    
    

    const handleChange2 = (e) =>{
        const {name,checked} = e.target;
        let arrTemp = new Array();
        if(arrChecked.length == 0){
            allOffers.map((val,index)=>{
                if(validIfExpiration(val.timelive,val.created_at)){
                    if(name != "allSelected"){
                        if(name == index){
                            arrTemp.push({name:index,check:checked, id : val.id,amount:val.amount ? val.amount: null})
                        }else{
                            arrTemp.push({name:index,check:!checked,  id : val.id,amount:val.amount ? val.amount: null})
                        }
                    }else{
                        arrTemp.push({name:index,check:checked,  id : val.id,amount:val.amount ? val.amount: null})
                    }
                }
            })  
            setArrChecked(arrTemp)   
        }else{
            arrChecked.map((val,index)=> {
                if(validIfExpiration(val.timelive,val.created_at)){
                    if(name != "allSelected"){
                        if(name == index){
                            arrTemp.push({name:index,check:checked,  id : val.id,amount:val.amount ? val.amount: null})
                        }else{
                            arrTemp.push(val)
                        }
                    }else{
                        arrTemp.push({name:index,check:checked,  id : val.id,amount:val.amount ? val.amount: null})
                    }
                }
            })
            setArrChecked(arrTemp);
        }
    }

   


    const handleResetAllOffers = () => {

        let arrTemp = new Array();
      
        allOffersCopy.map((val)=>{
        
            arrChecked.map((arr)=>{
                if(arr.id == val.id && !arr.check){
                    arrTemp.push(val)
                }
           })
        })
        let a = 34;
        if(a == -34124){
            getAllOffers();
        }
     
        setAllOffersCopy(arrTemp);
        setAllOffers(arrTemp)
    }


    const handleTrash = () => {

        if(data && data.provider){
            setMsg('')
            setError(false);
            setDeleteLoading(true);
            setInitCancel(true);
            sign(data.userAccount,data.provider,t("all_offers.cancel_offers_text"),"cancel").then(res => {
                console.log(res)
                setError(false);
                // let requestIDS = []
                // let crypto = []
                // arrChecked.forEach((check) => {
                //     if(check.amount){
                //         crypto.push(check.amount)
                //     }else
                //     if(check.check) {
                //         requestIDS.push(check.id)
                      
                //     }
                // })

                let requestIDS = []
                let crypto = []
 
                arrChecked.forEach((check) => {
                    if(check.amount){
                        if(check.check) {
                            crypto.push(check.id)
                        }
                    }else
                        if(check.check) {
                            requestIDS.push(check.id) 
                    }
                })

                if(requestIDS.length > 0 && crypto.length > 0) {

                    cancelAllByIds(requestIDS).then((success) => {
                        console.log(success)
                        cancelAllCryptoRequestsByIds(crypto).then((success) => {
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
                            setArrChecked([]);
                        })
                    },(error) => {
                        console.log(error)
                        setMsg(error.message)
                        setError(true);
                        setInitCancel(false);
                        setDeleteLoading(false);
                        setArrChecked([]);
                    })
            
                   
                }else
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
                        setArrChecked([]);
                    })
                    
                }else 
                    if(crypto.length > 0){
                        cancelAllCryptoRequestsByIds(crypto).then((success) => {
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
                            setArrChecked([]);
                        })
                        console.log("fasdf");
                }
                
            }).catch(error => {
                console.log(error.message)
                if(error.code == '4001'){
                    setMsg(t("custom_error_metamask.cancel_transaction"));
                }else{
                    setMsg("Error: "+ error.message.substring(0,100));
                }
                setError(true);
                setInitCancel(false);
                setDeleteLoading(false);
                setArrChecked([]);
            })   
        }
        
    }

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
        <Box 
            
            sx={{
                width: '100%',
                '@media screen and (max-width: 600px)': {
                    padding: '0px',
                    overflow: 'auto',
                }
            }}
        >

            {
                    msg !== '' &&
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0px'}}>
                        <Alert severity={error ? "error":"success"} >
                            {msg}
                        </Alert>
                    </Box>
            }
          
            <Box sx={{width:'100%',color:'#ed2891',textAlign:'right',display:'flex',justifyContent:'flex-end', marginBottom:'15px'}}>
                {
                    allOffers.length > 0 &&  
                    <Box onClick={()=>{handleNavigateAllOffers(allOffers[0].to,dataNFTS[0].token_id,dataNFTS[0].thumb_resize)}} sx={{width:'auto',cursor:'pointer',color:'#ed2891',marginRight:'15px'}}
                    >
                        <b>{t("table-section.exchange.view_all_notifications")}</b>
                    </Box>
                }    
                       
            </Box>

                
            <input style={{marginLeft:'20px'}}
                    type="checkbox" 
                    name='allSelected'
                    checked={arrChecked.length == 0 ? false :  arrChecked.filter((val)=> val?.check !== true).length < 1}
                    onChange={(e)=>{handleChange2(e)}}
                />
                 <span>
                {
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
            <TableContainer 
                component={Paper} 
                sx={allOffers.length <= 20 ?{
                    overflow: 'auto',
                    maxHeight:'450px',
                    '@media screen and (max-width: 600px)':{
                        width:'100%',
                        padding: '0px',
                    }
                }:
                {
                    overflowY: 'scroll',
                   
                    '@media screen and (max-width: 600px)':{
                        width:'100%',
                        padding: '0px',
                    }
                }
            }
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
                        address={data.userAccount}
                    />
                <TableBody>
                    { stableSort(allOffersCopy, getComparator(order, orderBy)).map((row, index) =>(
                        index < 20 &&
                        <TableRow
                            key={index}
                            sx={{
                                ':hover':{
                                    backgroundColor:'#f5f5f5'
                                    },
                                '&:last-child td, &:last-child th': { 
                                    border: 0 
                                    } 
                            }}
                        >
                            <TableCell component="th" scope="row" align='left'>
                                {
                                    validIfExpiration(row.timelive,row.created_at) && 
                                    <Box sx={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                        <span hidden>
                                            <input 
                                                type="checkbox" 
                                                defaultChecked={actionChecked} 
                                                onChange={handleChangeChecked} 
                                            />
                                        </span>

                                        {
                                                arrChecked.length!=0 ?
                                                arrChecked.map((val)=>{
                                                    return val.name == index && 
                                                    <>
                                                    <input  
                                                    type="checkbox"
                                                    name={index}
                                                    checked={val.check}
                                                    onChange={(e)=>{handleChange2(e)}}
                                                    />

                                                    </>
                                                })
                                                :
                                                <input 
                                                type="checkbox"
                                                name={index}
                                                onChange={(e)=>{handleChange2(e)}}
                                                />
                                            
                                        }
                                    </Box>
                                }
                               
                            </TableCell>
                            <TableCell align="center"  onClick={() => {handleSwitchContent(row)}} sx={{cursor:'pointer'}}>
                                  <Status status={row.status} timeLive={row.timelive} created_at={row.created_at}/>
                            </TableCell>
                            <TableCell align="center" onClick={() => {handleSwitchContent(row)}} sx={{cursor:'pointer'}}>
                                
                                    {row.offers ? row.offers.length : '---'}
                              
                            </TableCell>
                            <TableCell align="center" onClick={() => {handleSwitchContent(row)}} sx={{cursor:'pointer'}}>
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
                  
                                    {(row.from).substring(0,5)+ '...' +(row.from).substring(38,54)}
                           
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
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{float:'left', margin:'15px 15px'}}>{t("nft-screen.offers_modal_table.approx_text")}</Box>
        </Box>
    );
}
TableOffers.propTypes = {
    setShowAcceptExchange: PropTypes.func,
    setShowTableOffers: PropTypes.func,
    allOffers : PropTypes.array,
    setSelected : PropTypes.func,
    dataNFTS : PropTypes.array,
    data: PropTypes.object,
    setAllOffers : PropTypes.func,
    getAllOffers : PropTypes.func,
    setIsOpenModalOfferCrypto : PropTypes.func,
    setOffersSelected : PropTypes.func,
}


export default TableOffers;