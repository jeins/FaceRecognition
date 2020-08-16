import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LoadingOverlay from '../shared/LoadingOverlay';

export const RegisterUserFormSection = styled(LoadingOverlay)`
    padding: 20px;
`;

export const FormStyled = styled.div`
  ${({ theme }) => `
    div {
      margin-top: 15px;
    }
    .CheckBox {
        margin-top: 15px;
    }
  `}
`;

export const ButtonStyled = styled(Button)`
  ${({ theme }) => `
    margin: ${theme.spacing(3, 0, 2)};
  `}
`;

export const FinishDescription = styled(Paper)`
    text-align: center;
`;