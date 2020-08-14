import React, { useState } from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UserForm from './UserForm';
import CameraPhoto from '../CameraPhoto';

import { MODE_TRAIN } from '../CameraPhoto/const';

const STEPS = ["Input User Data", "Add User Image"];

const RegisterForm = ({ onBackToHome }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [userId, setUserId] = useState(null);
  
    const onRegisterSuccess = ({ id }) => {
        setUserId(id);
        goNextStep();
    };

    const onStepDone = () => goNextStep();

    const goNextStep = () => setActiveStep((nextStep) => nextStep + 1);

    return (
        <div>
            <Stepper activeStep={activeStep} orientation="vertical">
                {STEPS.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                        
                        { index === 0 && (<UserForm onRegisterSuccess={onRegisterSuccess} />)}
                        { index === 1 && (<CameraPhoto userId={userId} mode={MODE_TRAIN} onStepDone={onStepDone} />)}

                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === STEPS.length && (
                <Paper square elevation={0} >
                <Typography>Pendaftaran diri telah selesai.</Typography>
                <Button onClick={onBackToHome} >
                    Selesai
                </Button>
                </Paper>
            )}
        </div>
    );
}

export default RegisterForm;