import { Link } from 'react-router-dom';

import './style.css';
import PropTypes from 'prop-types';

import { cn as bem } from '@bem-react/classname';

function CommentFormWarning({ loginUrl, variant, onClickCancel }) {
  const cn = bem('CommentFormWarning');

  return (
    <>
      <p className={cn()}>
        <Link to={loginUrl} state={{ back: window.location.pathname }}>Войдите</Link>, чтобы иметь возможность комментировать.
        { variant === 'advanced' && (
          <button onClick={onClickCancel} className={cn('cancel')}>Отмена</button>
        )}
      </p>
    </>
  );
}

CommentFormWarning.propTypes = {
  loginUrl: PropTypes.string,
  variant: PropTypes.string,
  onClickCancel: PropTypes.func,
};

export default CommentFormWarning;
