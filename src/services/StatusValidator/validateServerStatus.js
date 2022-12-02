//import axios from "axios";

export const validateServerStatus = async() => {
    //let url = process.env.REACT_APP_URL_API;
    return new Promise((resolve,reject) => {
        try {
            resolve(false)
            //axios.get(url+"/dashboard/power-off?domain=cryptoloteria.mx")
            //axios.get("https://api.v.je/dashboard/power-off?domain=cryptoloteria.mx")
            /////.then((result) => {
            ///    console.log('result of validate server',result)
            ///    resolve(result.data.status)
            ///})
            ///.catch(error => { 
            ///    console.log(error) 
            ///    resolve(true) 
            ///})
        } catch (error) {
            reject(error)
        }
    });
}