import React, { useState } from 'react';

import Dashboard from './Dashboard';
import CameraPhoto from './CameraPhoto';
import { MODE_DETECT } from './CameraPhoto/const';
import RegisterForm from './RegisterForm';
import ContainerPage from './ContainerPage';

const DEFAULT_TITLE = 'FaceDetector App';

const App = () => {
    const [title, setTitle] = useState(DEFAULT_TITLE);
    const [showCamera, setShowCamera] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showUserData, setShowUserData] = useState(false);

    const isDashboardVisible = !showCamera && !showRegisterForm && !showUserData;

    const onClickDetectFace = () => {
        setTitle("Deteksi Data");
        setShowCamera(true);
    }

    const onClickRegister = () => {
        setTitle("Daftar Diri");
        setShowRegisterForm(true);
    }

    const onClearPage = () => {
        setTitle(DEFAULT_TITLE);
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