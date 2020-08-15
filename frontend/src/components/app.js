import React, { useState } from 'react';

import Dashboard from './Dashboard';
import CameraPhoto from './CameraPhoto';
import { MODE_DETECT } from './CameraPhoto/const';
import RegisterForm from './RegisterForm';
import ContainerPage from './ContainerPage';

import { TEXT } from './text';

const App = () => {
    const [title, setTitle] = useState(TEXT.APP_TITLE);
    const [showCamera, setShowCamera] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showUserData, setShowUserData] = useState(false);

    const isDashboardVisible = !showCamera && !showRegisterForm && !showUserData;

    const onClickDetectFace = () => {
        setTitle(TEXT.DASHBOARD_BUTTON_REGISTER_USER_IMAGE);
        setShowCamera(true);
    }

    const onClickRegister = () => {
        setTitle(TEXT.DASHBOARD_BUTTON_REGISTER_USER_DATA);
        setShowRegisterForm(true);
    }

    const onClearPage = () => {
        setTitle(TEXT.APP_TITLE);
        setShowCamera(false);
        setShowRegisterForm(false);
        setShowUserData(false);
    }

    return (
        <>
            <ContainerPage
                title={title}
                showBackButton={!isDashboardVisible}
                onBack={onClearPage}>
                
                {
                    isDashboardVisible && (
                        <Dashboard
                            isVisible={isDashboardVisible}
                            onClickRegister={onClickRegister}
                            onClickDetectFace={onClickDetectFace} />
                    )
                }

                { showCamera && ( <CameraPhoto mode={MODE_DETECT} /> ) }
                
                { showRegisterForm && ( <RegisterForm onBackToHome={onClearPage} /> ) }
            </ContainerPage>
        </>
    );
};

export default App;