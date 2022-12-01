import React ,{useEffect,Suspense, useState} from 'react';
import { Box ,Typography} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary';
import {useFetch} from 'hooks/useFetch'
import ErrorMessage from 'components/ErrorMessage'
import CuratorCards from './components/CuratorsCards/CuratorCards';
import LoaderCircle from 'components/LoaderCircle';

const Curators = () => {
    const { t } = useTranslation("translate");
    const [urlProfile, setUrlProfile] = useState(`${process.env.REACT_APP_URL_API}/user?domain=${process.env.REACT_APP_DOMAIN}&limit=10000&page=0&search=ALL`)
    let {data, error, loading} = useFetch(urlProfile)
    const {path} = useRouteMatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        setUrlProfile(`${process.env.REACT_APP_URL_API}/user?domain=${process.env.REACT_APP_DOMAIN}&limit=10000&page=0&search=ALL`)
    }, [])

    return (
        <>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            > 
                <Typography 
                    variant="overline" 
                    display="block" 
                    gutterBottom 
                    component='h2'
                    sx={{
                        color:'#000', 
                        fontSize:{sm:'30px',md:'34px',lg:'37px'},
                        textAlign:'center',
                        marginTop:'14px',
                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                        background: 'linear-gradient(110.78deg, #361FD8 10%, #361FD8 10%, #A658D8 67.94%, #A658D8 85.34%, #A658D8 99.57%)',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textTransform: 'uppercase'
                    }}
                >
                  {t("curators.title")}
                </Typography>
               
            </Box>
            <Box display='flex' justifyContent='center' sx={{width:'100%', marginBottom:'1rem'}}>
                <Switch>
                    <Route path={`${path}`}>          
                        <ErrorBoundary fallback={<div>error</div>}>
                            <Suspense fallback={null}>
                                { loading && <LoaderCircle text={t('message_loader.loading')} />}
                                { error && <ErrorMessage error={error.message} />}
                                { data && !error && <CuratorCards content={data} limit={1000} />}
                            </Suspense>
                        </ErrorBoundary>
                    </Route>
                </Switch>
            </Box>
        </>
    );
};


export default Curators;