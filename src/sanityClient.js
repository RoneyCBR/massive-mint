import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "8z1w12hg",
    dataset: "production",
    apiVersion: '2022-09-27',
    useCdn: true
})