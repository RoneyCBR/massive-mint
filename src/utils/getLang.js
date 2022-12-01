export const getLang = ()=>{
    const lang = localStorage.getItem('i18nextLng');
    if(lang != 'en'){
        return true;
    }
    else{
        return false;
    }
}
