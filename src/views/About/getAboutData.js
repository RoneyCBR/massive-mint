import sanityClient from 'sanityClient';

const fetchData = ()=>{
    return sanityClient.fetch(`*[_type == "about"] | order(_createdAt desc) {
        english,
        spanish
    }`).then((data) => data)
}

export const fetchAboutData =()=>{
    const termsAndConditionsPromise = fetchData();
    return{
        about: WrapPromise(termsAndConditionsPromise),
    }
}

const WrapPromise = promise =>{
    let status = 'pending';
    let result;
    let suspender = promise.then(
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