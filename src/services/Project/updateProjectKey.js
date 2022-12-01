import axios from "axios";

export const updateProjectKey =async(project_key,new_project_key,message,signature) => {
    const blockchain = process.env.REACT_APP_NETWORK_NAME;
    const domain = process.env.REACT_APP_DOMAIN
    let data = {
        project_key : project_key,
        new_project_key : new_project_key,
        message : message,
        signature : signature,
        domain : domain,
        blockchain_name : blockchain
    }
    return axios.put(`${process.env.REACT_APP_URL_API}/project?domain=${process.env.REACT_APP_DOMAIN}`,data,{
        headers:{
            'Content-Type': 'text/plain;charset=utf-8',
        }
    })
    .then(res=>res.data)
}