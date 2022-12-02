import axios from "axios";

export const saveUser =async(params) => {
    const blockchain = process.env.REACT_APP_NETWORK_NAME;
    const domain = process.env.REACT_APP_DOMAIN
    const data = {
        'domain': domain,
        'blockchain_name': blockchain,
        'homepage':'',
        'username': params.address,
        'email': params.email,
        'about':'',
        'twitter':'',
        'facebook':'',
        'profile_pic_url':'',
        'telegram':'',
        'banner_url': '',
        'signature': params.signature,
        'message': params.message,
        'action': 'USER_CREATED'
    }
    return axios.post(process.env.REACT_APP_URL_API+`/user?domain=${process.env.REACT_APP_DOMAIN}`,data,{
        headers:{
            'Content-Type': 'text/plain;charset=utf-8',
        }
    })
    .then(res=>res.data)
}