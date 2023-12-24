import { memo } from 'react';
import './style.css';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import formatDate from '../../utils/format-date';

function Comment({ comment, ...props }) {
  const cn = bem('Comment');

  const values = {
    username: comment.author.profile.name,
    date: formatDate(comment.dateCreate, {}, props.activeLang),
    text: comment.text,
  };

  const callbacks = {
    clickDisplay: () => {
      props.setFormPosition(comment._id);
    },
    clickCancel: () => {
      props.setFormPosition(false);
    },
  };

  const options = {
    commentOffset: Math.min(
      comment.level * props.commentOffsetPer,
      props.maxCommentLevel * props.commentOffsetPer
    ),
  };

  return (
    <article style={{ paddingLeft: options.commentOffset }} className={cn()}>
      <header className={cn('header')}>
        <h3 className={cn('title', { current: values.username === props.currentUsername })}>{values.username}</h3>
        <span className={cn('date')}>{values.date}</span>
      </header>

      <p className={cn('text')}>
        {values.text}
      </p>

      <footer className={cn('footer')}>
        <button onClick={callbacks.clickDisplay} className={cn('action')}>
          {props.t('comments.answer')}
        </button>
      </footer>
    </article>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  formPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setFormPosition: PropTypes.func,
  onNewComment: PropTypes.func,
  isFormDisplayed: PropTypes.bool,
  warningCmp: PropTypes.func,
  currentUsername: PropTypes.string,
  commentOffsetPer: PropTypes.number,
  activeLang: PropTypes.string,
  t: PropTypes.func,
};

Comment.defaultProps = {
  setFormPosition: () => {},
  onNewComment: () => {},
  isFormDisplayed: true,
};

export default memo(Comment);
