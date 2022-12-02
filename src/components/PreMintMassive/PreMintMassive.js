import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import {useFetch} from './hooks/useFetch';
import {
    CardContent,
    ContentArea,
    ContentForm,
    TitleH2,
    LineDividerV,
    LineDividerH,
    ContentFilter
} from './style';

const ShowCollection = ({content,loading,error}) =>{
    return (
        <React.Fragment>
            {
                loading ?
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'200px'}}>
                    <CircularProgress
                        size={35}
                        sx={{
                            color: '#000'
                        }}
                    />
                </Box>
                :
                <React.Fragment>
                    {
                        !error && content &&
                        'ready!'
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

ShowCollection.propTypes = {
    content: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.any
}

const PreMintMassive = ({
    data,
    titleCollection,
    urlCollections
    })=>{

        const {data:projectData, loading:projectLoading, error:projectError} = useFetch(urlCollections) //collection

        const handleClick = () =>{
            alert("puto!");
        }

    return (
        <Box>
            <Container maxWidth="xl">
                    <br></br>
                    <CardContent>
                        <Box sx={{mb:'10px'}}>  
                            <ContentArea>
                                <ContentForm>
                                    <center>
                                        <TitleH2 onClick={handleClick}>{titleCollection}</TitleH2>
                                    </center>
                                    <Box component='section' sx={{m:'0 auto',width:'90%',minHeight:'200px',maxHeight:'400px'}} >
                                        <ShowCollection  content={projectData} loading={projectLoading} error={projectError}/>
                                    </Box>
                                </ContentForm>
                                <LineDividerV orientation="vertical"  flexItem />
                                <LineDividerH orientation="horizontal"  flexItem />
                                <ContentFilter>
                                    MassiveMint {String(data.userAccount).slice(0,10)+''}
                                </ContentFilter>
                            </ContentArea>
                        </Box>
                    </CardContent>
            </Container>
        </Box>
    )
}

PreMintMassive.propTypes = {
    data: PropTypes.object,
    titleCollection: PropTypes.string,
    urlCollections: PropTypes.string
};


export default PreMintMassive;