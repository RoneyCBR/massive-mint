
import React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Box} from '@mui/material';


const Status  = ({status,timeLive,created_at}) =>{
    const { t } = useTranslation("translate");
   
    const msFormat = (ms, date) => {

        if(date > 0){
            const dateFormated = date * 1000;
            console.log('Created date ::',date)
            const msFormated = dateFormated + Number(ms)
            const currentTime = Date.now();
            console.log('Current time ::',currentTime)
            const intervalTime = msFormated - currentTime;
            if (intervalTime > 0) {
                console.log('msFormated ::', msFormated)
                console.log('intervalTime ::', intervalTime)
                const hours = Math.trunc( intervalTime / 3_600_000 );
                const minutes = Math.trunc(  (intervalTime - (hours*3_600_000))  / 60000);
                const seconds = Math.trunc( (intervalTime - ( (hours*3_600_000) + ( minutes * 60000) )) / 1000);
                return `${hours}h ${minutes}m ${seconds}s`;
            } else {
                return "Expired"
            }
        }else{
            console.log('date ::', date)
            console.log('ms::', ms)
            const dateFormated = new Date(date).getTime();
            console.log('Created date ::',date)
            const msFormated = dateFormated + Number(ms)
            const currentTime = Date.now();
            console.log('Current time ::',currentTime)
            const intervalTime = msFormated - currentTime;
            if (intervalTime > 0) {
                console.log('msFormated ::', msFormated)
                console.log('intervalTime ::', intervalTime)
                const hours = Math.trunc( intervalTime / 3_600_000 );
                const minutes = Math.trunc(  (intervalTime - (hours*3_600_000))  / 60000);
                const seconds = Math.trunc( (intervalTime - ( (hours*3_600_000) + ( minutes * 60000) )) / 1000);
                return `${hours}h ${minutes}m ${seconds}s`;
            } else {
                return "Expired"
            }
        }
    }
   
    return (
        <Box sx={{width:'100%',display:'flex',justifyContent:'center',padding:'3px',fontSize:'12px'}}>  
     
            {status === 1 &&(
                <Box style={{color:'#28a745',display:'flex',justifyContent:'center'}}>
                    {t("profile.activities_table.status_text.accepted")}
                </Box>
            )}
            {status === 2 &&(
                <Box style={{color:'#dc3545',display:'flex',justifyContent:'center'}}>
                    {t("profile.activities_table.status_text.rejected")}
                </Box>
            )}
            {status === 0 &&(
                <Box style={{color:'#6c757d',display:'flex',justifyContent:'center'}}>
                    {t("profile.activities_table.status_text.inactive")}
                </Box>
            )}
            
            {status == 4 && status != 'rejected' && status != 'pending' && (
                <Box sx={{color:'#007bff',display:'flex',justifyContent:'center'}}>
           
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                        {msFormat(timeLive,created_at) != "Expired" ? 
                        <Box >
                            <Box>{t("nft-screen.history_movement_table.status_column_expires")}</Box>
                            <Box>{msFormat(timeLive,created_at)}</Box>
                            
                        </Box>
                        :
                        t("nft-screen.history_movement_table.status_expired_text")}
                    </Box>
                </Box>                  
            )}

       

        </Box>
    )
};


Status.propTypes = {
  status: PropTypes.string,
  timeLive: PropTypes.number,
  created_at: PropTypes.number
};

export default Status ;
