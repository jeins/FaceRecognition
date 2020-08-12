import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const DashboardSection = styled.div`
    padding: 20px;
    display: ${props => props.visible ? 'block' : 'none'};
`;

export const ButtonStyled = styled(Button)`
  ${({ theme }) => `
    margin: ${theme.spacing(3, 0, 2)};
  `}
`;
