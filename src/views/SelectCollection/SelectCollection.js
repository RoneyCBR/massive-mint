import React, { useContext, useEffect } from 'react'
import { Box, Button } from '@mui/material';
import { useLocation ,Link} from 'react-router-dom'
import { useFetch } from 'hooks/useFetch';
import { Context } from 'hooks/WalletContext';
import { CollectionCard } from './components';
import LoaderCollection from 'components/LoaderCollection';
import ErrorMessage from 'components/ErrorMessage';
import { useTranslation } from 'react-i18next';


const SelectCollection = () => {
    const { t } = useTranslation("translate");
    const {data}=useContext(Context)
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const address = query.get('address')
    const project = `${process.env.REACT_APP_URL_API}/project?domain=${process.env.REACT_APP_DOMAIN}&key_name=CREATOR&key_val=${address}&page=0&limit=30&order=created`
    const {data:projectData, loading, error} = useFetch(project)



    useEffect(()=>{
        if(!address || address == 'undefined' || address && !data.userAccount){
            window.location.href = '/';
        }
    },[])

    return (
        <>
            <Box component='section' sx={{marginBottom:'2rem'}}>
                <Box 
                    component='h1' 
                    sx={{
                        fontSize:'30px',
                        textAlign:'center',
                        color:'#fff'
                    }}
                >
                    {t('select_collection_view.select_collection')}
                </Box>
                {loading && <LoaderCollection />}
                {!loading && error && <ErrorMessage error={error} />}
                {!loading && !error && projectData && <CollectionCard content={projectData} showBtnAll={false} limit={50}/>}
                {
                    !loading && projectData && projectData.length === 0 || projectData == null || projectData == "" &&
                    <>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        sx={{
                            marginTop:'2rem',
                            color:'#fff'
                        }}
                    >
                        <h1>{t("select_collection_view.collection_empty_text")}</h1>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        sx={{
                            marginTop:'2rem',
                        }}
                    >
                        <Button component={Link} to='/create/create-collection'>{t("select_collection_view.create_collection_btn")}</Button>
                    </Box>
                    </>
                }
            </Box>
        </>
       
    )
}

export default SelectCollection
