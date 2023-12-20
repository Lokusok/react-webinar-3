import './style.css';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Comment from '../comment';

function CommentsList(props) {
  const cn = bem('CommentsList');

  const values = {
    count: props.comments.length,
  };

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <h3 className={cn('title')}>{props.title} ({values.count})</h3>
      </div>

      <ul className={cn('list')}>
        {props.comments.map((comment) => (
          <li key={comment._id}>
            <Comment
              formPosition={props.formPosition}
              setFormPosition={props.setFormPosition}
              comment={comment}
              onNewComment={props.onCommentFormSubmit}
              isFormDisplayed={props.isFormDisplayed}
              warningCmp={props.warningCmpAdvanced}
              commentForm={props.commentFormComment}
              currentUsername={props.currentUsername}
              maxCommentLevel={props.maxCommentLevel}
              commentOffsetPer={props.commentOffsetPer}
            />
          </li>
        ))}
      </ul>

      {!Boolean(props.formPosition) && (
        props.isFormDisplayed ? (
          <>{props.commentFormFooter}</>
        ) : <>{props.warningCmp}</>
      )}
    </div>
  )
}

CommentsList.propTypes = {
  title: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  formPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setFormPosition: PropTypes.func,
  onCommentFormSubmit: PropTypes.func,
  isFormDisplayed: PropTypes.bool,
  warningCmp: PropTypes.node,
  warningCmpAdvanced: PropTypes.func,
  commentFormFooter: PropTypes.node,
  commentFormComment: PropTypes.func,
  currentUsername: PropTypes.string,
  maxCommentLevel: PropTypes.number,
  commentOffsetPer: PropTypes.number,
};

CommentsList.defaultProps = {
  setFormPosition: () => {},
  onCommentFormSubmit: () => {},
  isFormDisplayed: true,
  maxCommentLevel: 5,
  commentOffsetPer: 30,
};

export default CommentsList;
