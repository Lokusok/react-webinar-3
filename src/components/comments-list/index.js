import './style.css';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Comment from '../comment';
import CommentForm from '../comment-form';
import CommentFormWarning from '../comment-form-warning';

function CommentsList(props) {
  const cn = bem('CommentsList');

  const values = {
    count: props.comments.length,
  };

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <h3 className={cn('title')}>Комментарии ({values.count})</h3>
      </div>

      <ul className={cn('list')}>
        {/* {JSON.stringify(props.comments)} */}
        {props.comments.map((comment) => (
          <li key={comment._id}>
            <Comment
              formPosition={props.formPosition}
              setFormPosition={props.setFormPosition}
              comment={comment}
              onNewComment={props.onCommentFormSubmit}
              isFormDisplayed={props.isFormDisplayed}
              warningCmp={props.warningCmpAdvanced}
            />
          </li>
        ))}
      </ul>

      {!Boolean(props.formPosition) && (
        props.isFormDisplayed ? (
          <CommentForm
            onSubmit={props.onCommentFormSubmit}
            title="Новый комментарий"
          />
        ) : <>{props.warningCmp}</>
      )}
    </div>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  formPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setFormPosition: PropTypes.func,
  onCommentFormSubmit: PropTypes.func,
  isFormDisplayed: PropTypes.bool,
  warningCmp: PropTypes.node,
  warningCmpAdvanced: PropTypes.func,
};

CommentsList.defaultProps = {
  setFormPosition: () => {},
  onCommentFormSubmit: () => {},
  isFormDisplayed: true,
};

export default CommentsList;
