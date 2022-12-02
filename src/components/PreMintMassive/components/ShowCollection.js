import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CollectionCard from '../components/CollectionCard';

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
                        <CollectionCard content={content} limit={1}/>
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

export default ShowCollection;