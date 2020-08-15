import React from 'react';

import { DashboardSection, ButtonStyled } from './styled.components';

import { TEXT } from '../text';

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
            {TEXT.DASHBOARD_BUTTON_REGISTER_USER_DATA}
        </ButtonStyled>

        <ButtonStyled 
            fullWidth
            variant="contained"
            color="secondary"

            onClick={onClickDetectFace}>
            {TEXT.DASHBOARD_BUTTON_REGISTER_USER_IMAGE}
        </ButtonStyled>
    </DashboardSection>
);

export default Dashboard;