import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

import LoginStatus from "../../containers/login-status";

function Head({title, children}) {
  return (
    <div className='Head'>
      <div className='Head-outer'>
        <LoginStatus />
      </div>

      <div className='Head-row'>
        <div className='Head-place'>
          <h1>{title}</h1>
        </div>
        <div className='Head-place'>{children}</div>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
