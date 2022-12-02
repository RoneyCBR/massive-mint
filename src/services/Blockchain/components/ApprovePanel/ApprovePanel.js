import { Button, Grid } from '@mui/material';
import React from 'react'
import PropTypes from 'prop-types';

const ApprovePanel = ({handleApprove, handleConfirm,handleCancel, showApprove, showConfirm, labels = { approveText : 'Approve', confirmText : 'Create', cancelText : 'Cancel'}}) => {
    return (
        <div>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{display:'flex',justifyContent:'center',marginTop:'15px'}} >
                { showApprove &&
                    <Button  variant="contained" 
                        onClick={() => handleApprove()}
                        sx={{
                            marginRight:'5px',
                            backgroundColor: '#ed2891', 
                            '&:hover': {
                                backgroundColor: '#F344A1',
                            }
                        }}>
                        { labels.approveText}
                    </Button>
                }
                {showConfirm &&
                <Button  variant="contained" 
                    onClick={() => handleConfirm()}
                    sx={{
                        marginRight:'5px',
                        backgroundColor: '#ed2891', 
                        '&:hover': {
                            backgroundColor: '#F344A1',
                        }
                    }}>
                   { labels.confirmText}
                </Button>
                }
                <Button  variant="contained" 
                    onClick={() => handleCancel()}
                    sx={{
                        marginRight:'5px',
                        backgroundColor: '#ed2891', 
                        '&:hover': {
                            backgroundColor: '#F344A1',
                        }
                    }}>
                   { labels.cancelText}
                </Button>
            </Grid>
        </div>
    );
}
ApprovePanel.propTypes = {
    handleApprove: PropTypes.func,
    handleConfirm: PropTypes.func,
    handleCancel: PropTypes.func,
    showApprove: PropTypes.bool,
    showConfirm :PropTypes.bool,
    labels : PropTypes.object
}

export default ApprovePanel;