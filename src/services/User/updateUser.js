import axios from "axios";

export const updateUser =async(params,type = "UPDATE") => {
    const blockchain = process.env.REACT_APP_NETWORK_NAME;
    const domain = process.env.REACT_APP_DOMAIN
    const data = {
        'domain': domain,
        'blockchain_name': blockchain,
        'homepage':'',
        'username': params.username,
        'country': params.country,
        'email': params.email,
        'about':params.about,
        'twitter':params.twitter,
        'facebook':params.facebook,
        'profile_pic_url':params.profilePicURL,
        'telegram':params.telegram,
        'banner_url': params.bannerURL,
        'signature': params.signature,
        'message': params.message,
        'action': 'USER_CREATED',
        'update':  true,
    }
    return axios.put(`${process.env.REACT_APP_URL_API}/user?&domain=${domain}&type=${type}`,data, {
        headers:{
            'Content-Type': 'text/plain;charset=utf-8',
        }
    })
    .then(res=>res.data)
}
