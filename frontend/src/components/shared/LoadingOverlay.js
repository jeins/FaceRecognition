import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const LOADER_WIDTH = 50;
const LOADER_HEIGHT = 50;

const loadingStyle = {
  pointerEvents: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  filter: 'blur(2px) brightness(0.95)',
  WebkitFilter: 'blur(2px) brightness(0.95)',
};

const notLoadingStyle = {};

const LoadingOverlay = ({
  loading,
  message,
  children,
}) => (!loading ? children : (
  <div>
    <div style={loading ? loadingStyle : notLoadingStyle}>
      {children}
    </div>
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{
        // expect parent to have non-static position!
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: `-${LOADER_WIDTH / 2}px -${LOADER_HEIGHT / 2}px`,
      }}>
        <CircularProgress style={{
          margin: '0px'
        }} innerStyle={{
          width: `${LOADER_WIDTH}px`,
          height: `${LOADER_HEIGHT}px`
        }} />
      </div>
      <div style={{
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        top: '60%',
      }}>
        {message}
      </div>
    </div>
  </div>
));

LoadingOverlay.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.string,
  children: PropTypes.node,
};

LoadingOverlay.defaultProps = {
  loading: false,
  message: null,
  children: null,
};

export default LoadingOverlay;
