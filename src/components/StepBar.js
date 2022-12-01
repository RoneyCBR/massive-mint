import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {Box} from '@mui/material';


const QontoConnector = styled(StepConnector)(({ theme,color}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 8px)',
      right: 'calc(50% + 8px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#000',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#000',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : color,
      borderTopWidth: 3,
      borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#eaeaf0',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#000',
      zIndex: 1,
      fontSize: 18,
      border:'1px solid #000',
      borderRadius: '50%',
      padding:'1px',
      backgroundColor:'#000'
    },
    '& .QontoStepIcon-circle': {
      width: 18,
      height: 18,
      borderRadius: '50%',
      backgroundColor: 'currentColor'
    },
}));
  
function QontoStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
}
  
QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};


const StepBar = ({nStep,steps}) => {
  
    return (
        <Stack sx={{ 
          '@media screen and (max-width: 750px)': {
              width: '100%'
          },
          width: '75%',
          position:'relative'
          }}
          spacing={0}
        >
            <Stepper alternativeLabel  activeStep={nStep} connector={<QontoConnector color={nStep == 0 ? "#eaeaf0" : "#000"}  />}>
                {steps.map((label,index) => (
                    <Step key={label} >
                        <StepLabel StepIconComponent={QontoStepIcon}>
                            <Box className={'n'+index}  sx={{position:'absolute',top:-25,left:-2,width:'100%'}} >
                                {label}
                            </Box>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    )
}

StepBar.propTypes = {
    nStep: PropTypes.number,
    steps: PropTypes.array,
}

export default StepBar;