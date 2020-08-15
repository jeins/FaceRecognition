import React, { useState } from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserForm from './UserForm';
import CameraPhoto from '../CameraPhoto';
import { FinishDescription } from './styled.components';

import { MODE_TRAIN } from '../CameraPhoto/const';

import { TEXT } from '../text';

const STEPS = Object.values(TEXT.REGISTER_STEP);

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
                <FinishDescription square elevation={0} >
                    <Typography>{TEXT.REGISTER_STEP_FINISH_DESCRIPTION}</Typography>
                    <Button onClick={onBackToHome} color="primary">
                        {TEXT.REGISTER_STEP_FINISH_BUTTON}
                    </Button>
                </FinishDescription>
            )}
        </div>
    );
}

export default RegisterForm;