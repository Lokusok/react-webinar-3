import { Link } from 'react-router-dom';

import './style.css';
import PropTypes from 'prop-types';

import { cn as bem } from '@bem-react/classname';

function LoginStatus(props) {
  const cn = bem('LoginStatus');

  if (props.isAuthorized) {
    return (
      <div className={cn()}>
        <Link to="/profile">{props.username}</Link>
        <button onClick={props.onClickExit}>Выход</button>
      </div>
    )
  }

  return (
    <div className={cn()}>
      <button onClick={props.onClickLogin}>Вход</button>
    </div>
  )
}

LoginStatus.propTypes = {
  isAuthorized: PropTypes.bool,
  onClickLogin: PropTypes.func,
  onClickExit: PropTypes.func,
  username: PropTypes.string,
};

export default LoginStatus;
