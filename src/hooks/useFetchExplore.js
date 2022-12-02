import { useEffect, useState } from 'react'; 
import axios from 'axios';


const instance = axios.create();
instance.defaults.timeout = 500;
const CancelToken = axios.CancelToken;

const MAX_RETRY = 3;
let currentRetry = 0;


export const useFetchExplore = (url) => {

    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const errorHandler = () => {
        if(currentRetry < MAX_RETRY) {
            currentRetry++;
            console.log('Retrying...');
            fetchData();
        } else {
            console.log('Retried several times but still failed');
        }
    }

    let cancel = null;
    const fetchData = async ()=>{
        setLoading(true);
        setError(null);
        try{
            await instance.get(url,{timeout: 500,
                cancelToken: new CancelToken(function executor(c) {
                  cancel = c;
                })
            
            }).then((response)=>{
                const {data, status} = response;
                setStatus(status);
                setData(data);
            }).catch(errorHandler);
            setLoading(false);

        }catch(err){
            setError(err);
            setLoading(false);
        }
    }


   


    useEffect(()=>{

        instance.interceptors.response.use((response) => {
            if (response && response.data && response.data.metrics && response.data.metrics.length) {
                console.log("debug response.data.metrics",response.data.metrics);
                throw new axios.Cancel('Operation canceled by the user.');
            } else {
                return response;
            }
        },(err) => {
            return Promise.reject(err);
        });

    
        fetchData();
      
    },[url,cancel,instance]);

    return {data, status, loading, error, setLoading};
}

