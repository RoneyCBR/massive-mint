import { useEffect, useState } from 'react'; 
import axios from 'axios';

export const useFetch = (url,nRequest) => {

    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
        
        const fetchData = async ()=>{
            setLoading(true);
            setError(null);
            try{
                await axios.get(url).then((response)=>{
                    const { data, status} = response;
                    setStatus(status);
                    setData(data);
                }).catch((error)=>{
                    setError(error);
                });
                setLoading(false);
            }catch(error){
                setError(error);
                setLoading(false);
            }
        }
        
        if(nRequest && nRequest != null  && nRequest < 3 || nRequest && nRequest != "undefined" && nRequest < 3){
            fetchData();
            return 0;
        }        
        fetchData();
       
      
    },[url,nRequest]);

    return {data, status, loading, error, setLoading};
}

