import axios from "axios";


const getNFTOffered = (offers)=>{
    return new Promise((resolve)=>{
        if(offers && offers.length > 0) {
            let url = `${process.env.REACT_APP_URL_API}/nft?address=${process.env.REACT_APP_COLLECTION_ADDRESS}`;
            offers.forEach(tokenID => {
                url+="&token_id="+tokenID
            })
            axios.get(url).then(res=>{
                console.log('user nfts ::',res.data)
                resolve(res.data)
            })
        }
    })
}

export const fetchCardOffered = (address)=>{
    const cardsPromise = getNFTOffered(address);
    return{
        cardsOffered: WrapPromise(cardsPromise),
    }
}

const WrapPromise = promise =>{
    let status = 'pending';
    let result;
    let suspender = Promise.all([promise]).then(
        res=>{
            status = 'success';
            result = res;
        },
        err=>{
            status = 'error';
            result = err;
        }
    )
    return {
        read(){
            if(status === 'pending'){
                throw suspender;
            }else if(status === 'success'){
                return result;
            }else if(status === 'error'){
                throw result;
            }
        }
    }
}