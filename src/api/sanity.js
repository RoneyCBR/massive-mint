import sanityClient from 'sanityClient';

export const footer = ()=>{
    return sanityClient.fetch(`*[_type == "footer"] {
        footerList,
        socialNetworks []{
            icon {
                asset->{
                    _id,
                    url
                } ,
            },
            link
        }
    }`).then((data) => data)
}

export const collectionWithNFTPay = ()=>{
    return sanityClient.fetch(`*[_type == "activateCardPayment"] {
        collectionsList
    }`).then((data) => data)
}


/// sanity from jose cuervo

export const layoutWhitetList = () => {
    return sanityClient.fetch(`*[_type == "layoutWhitetList"] {
        background {
            asset -> {
                _id,
                url
            }
        },
        backgroundMobile {
            asset -> {
                _id,
                url
            }
        },
        logo {
            asset -> {
                _id,
                url
            }
        },
        image {
            asset -> {
                _id,
                url
            }
        },
        title,
        description,
        startDate,
        disclamerForm,
        subtitle,
        subtitleDescription,
        codeTitle,
        code,
        disclamer
    }`)
        .then((data) => data)
        .catch((error) => error)
};
