
import React from 'react';
import { isEnglish } from 'services/determinateLanguage'



const ExchangeCrypto = () => {

    return (
        <>
        {
            isEnglish() ?
            <iframe 
                id='iframe-widget' 
       
                src='https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.011&from=usdt&horizontal=false&lang=en-US&link_id=5e644f65bb9b85&locales=false&logo=true&primaryColor=ed2891&to=maticmainnet&toTheMoon=false' 
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderColor:'#fff'
                }}
            />
            :
            <iframe 
                id='iframe-widget' 
                src='https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.011&from=usdt&horizontal=false&lang=es-ES&link_id=5e644f65bb9b85&locales=false&logo=true&primaryColor=ed2891&to=maticmainnet&toTheMoon=false' 
                style={{
                    fontSize: '12px',
                    width: '80vw',
                    overflow: 'auto',
                    height:'400px',
                    border: 'none',
                    boxShadow: 'none'
                   
                    
                }}
            />
        } 
        </>
    )
}


export default ExchangeCrypto;