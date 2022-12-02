import axios from "axios";

export const getPositionRequest= async() => {
    return new Promise((resolve,reject) => {
        try {
            axios.get(process.env.REACT_APP_URL_API+"/exchange/crypto?filter=GET_POSITION")
            .then((response) => {
                console.log('Data position::', response.data)
                if(response.data.id) {
                    resolve(response.data.id)
                }
            })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}