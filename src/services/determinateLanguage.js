export const isEnglish = () => {
    const lang = localStorage.getItem('i18nextLng');
    return lang ? (lang.indexOf('es') != -1) ? false : true : true
}