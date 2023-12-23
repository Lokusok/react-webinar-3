import { Link } from 'react-router-dom';

import './style.css';
import PropTypes from 'prop-types';

import { cn as bem } from '@bem-react/classname';

function CommentFormWarning(props) {
  const cn = bem('CommentFormWarning');

  return (
    <>
      <p className={cn()}>
        <Link to={props.loginUrl} state={{ back: window.location.pathname }}>{props.linkText}</Link>
        {props.otherText && <>, {props.otherText}</>}
        { props.variant === 'advanced' && (
          <button onClick={props.onClickCancel} className={cn('cancel')}>Отмена</button>
        )}
      </p>
    </>
  );
};

CommentFormWarning.propTypes = {
  loginUrl: PropTypes.string,
  variant: PropTypes.string,
  onClickCancel: PropTypes.func,
  linkText: PropTypes.string,
  otherText: PropTypes.string,
};

export default CommentFormWarning;
