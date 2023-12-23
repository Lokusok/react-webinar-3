import './style.css';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Comment from '../comment';

function CommentsList(props) {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {props.comments.map((comment) => (
          <li key={comment._id}>
            {
              comment.type === 'component' ? comment.component : (
                <Comment
                  formPosition={props.formPosition}
                  setFormPosition={props.setFormPosition}
                  comment={comment}
                  onNewComment={props.onCommentFormSubmit}
                  isFormDisplayed={props.isFormDisplayed}
                  currentUsername={props.currentUsername}
                  maxCommentLevel={props.maxCommentLevel}
                  commentOffsetPer={props.commentOffsetPer}
                  activeLang={props.activeLang}
                />
              )
            }
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
  comments: PropTypes.array.isRequired,
  formPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setFormPosition: PropTypes.func,
  onCommentFormSubmit: PropTypes.func,
  isFormDisplayed: PropTypes.bool,
  warningCmp: PropTypes.node,
  commentFormFooter: PropTypes.node,
  currentUsername: PropTypes.string,
  maxCommentLevel: PropTypes.number,
  commentOffsetPer: PropTypes.number,
  activeLang: PropTypes.string,
};

CommentsList.defaultProps = {
  setFormPosition: () => {},
  onCommentFormSubmit: () => {},
  isFormDisplayed: true,
  maxCommentLevel: 5,
  commentOffsetPer: 30,
};

export default CommentsList;
