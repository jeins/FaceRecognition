import React from 'react';

import { DashboardSection, ButtonStyled } from './styled.components';

const Dashboard = ({
    isVisible,
    onClickRegister,
    onClickDetectFace
}) => (
    <DashboardSection visible={isVisible}>
        <ButtonStyled 
            fullWidth
            variant="contained"
            color="primary"

            onClick={onClickRegister}>
            Daftar Diri
        </ButtonStyled>

        <ButtonStyled 
            fullWidth
            variant="contained"
            color="secondary"

            onClick={onClickDetectFace}>
            Deteksi Muka
        </ButtonStyled>
    </DashboardSection>
);

export default Dashboard;