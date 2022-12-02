import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchDataProvider = (query) => {
    let { slug, author, card, offset, limit, order } = query
    const [isLoading, setIsLoading] = useState(false);
    const [fetchData, setFetchData] = useState([]);
    const addresCollection = process.env.REACT_APP_COLLECTION_ADDRESS
    const url = `${process.env.REACT_APP_URL_API}/nft?offset=${offset}&address=${addresCollection}&slug=${slug}&author=${author}&card=${card}&limit=${limit}&order=${order}`
    useEffect(()=>{
        console.log('from custom hook::', url, query)
        setIsLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        console.log('from resposne::')
        axios.get(url, {
            signal
        })
        .then(response => {
            console.log('from resposne::', response)
            setFetchData(response.data.data);
            setIsLoading(false);
        })
        .catch(error => {
            if(axios.isCancel(error)) {
                console.log('Request canceled', error.message)
                return
            }
            setIsLoading(false);
        })
        return () => controller.abort();
    },[limit])
    return [isLoading, fetchData];
}