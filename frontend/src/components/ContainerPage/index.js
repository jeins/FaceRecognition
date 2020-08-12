import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { ContainerSection } from './styled.components';

const StaticHeader = (props) => {
  const { children, window } = props;
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const ContainerPage = (props) => (
    <ContainerSection>
      <CssBaseline />
      <StaticHeader {...props}>
        <AppBar>
          <Toolbar>
            {
                props.showBackButton && (
                    <IconButton
                        edge="start" className="BackButton" color="inherit" aria-label="back"
                        onClick={props.onBack}>
                        <ArrowBack />
                    </IconButton>
                )
            }
            <Typography variant="h6" color="inherit">{props.title}</Typography>
          </Toolbar>
        </AppBar>
      </StaticHeader>
      <Toolbar />
      <Container>
        {props.children}
      </Container>
    </ContainerSection>
)

export default ContainerPage;