import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import useSelector from '../../hooks/use-selector';

function AuthOnly({ children, loginUrl }) {
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    sessionWaiting: state.session.waiting,
    token: state.session.auth.token,
  }));

  useEffect(() => {
    if (!select.token && !select.sessionWaiting) {
      navigate(loginUrl, { replace: true });
    }
  }, [select.token, select.sessionWaiting]);

  return (
    <>
      {children}
    </>
  );
}

AuthOnly.propTypes = {
  children: PropTypes.node.isRequired,
  loginUrl: PropTypes.string.isRequired,
};

export default AuthOnly;

