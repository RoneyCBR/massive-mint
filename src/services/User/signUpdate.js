import axios from 'axios';
import Web3 from 'web3'


export const signAndUpdate = async(from,username,email,profile_pic_url,banner_url,provider,callback,error) => {
    try {
        let web3 = new Web3(provider);
        const message = "Approve my intention to receive notifications at "+new Date().toLocaleString()
        var hex = ''
        for(var i=0;i<message.length;i++) {
            hex += ''+message.charCodeAt(i).toString(16)
        }
        const hexMessage  = "0x" + hex
        const signature = await web3.eth.personal.sign(hexMessage, from)
        const domain = "www.persea.com"
        const data = {
          'domain': domain,
          'blockchain_name': 'MATIC MUMBAI',
          'home_page':'',
          'username': username,
          'email': email,
          'about':'',
          'twitter':'',
          'profile_pic_url': profile_pic_url,
          'telegram':'',
          'banner_url': banner_url,
          'signature': signature,
          'message': message,
          'action': 'USER_CREATED'
        }
        const url = `${process.env.REACT_APP_URL_API}/user?domain=${process.env.REACT_APP_DOMAIN}`;
        axios.put(url,data).then(async(success) => {
            callback(success)
        })
    } catch (err) {
        error(err.message)
    }
}
