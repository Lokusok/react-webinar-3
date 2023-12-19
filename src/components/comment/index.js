import { useState, useLayoutEffect } from 'react';
import './style.css';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import formatDate from '../../utils/format-date';

import CommentForm from '../comment-form';
import CommentFormWarning from '../comment-form-warning';

function Comment({ comment, ...props }) {
  const cn = bem('Comment');
  const [formDisplayed, setFormDisplayed] = useState(false);

  const values = {
    username: comment.author.profile.name,
    date: formatDate(comment.dateCreate),
    text: comment.text,
  };

  const callbacks = {
    clickDisplay: () => {
      props.setFormPosition(comment._id);
      setFormDisplayed(true);
    },
    clickCancel: () => {
      props.setFormPosition(false);
      setFormDisplayed(false);
    },
  };

  useLayoutEffect(() => {
    setFormDisplayed(props.formPosition === comment._id);
  }, [props.formPosition]);

  return (
    <article style={{ paddingLeft: `${comment.level * 30}px` }} className={cn()}>
      <header className={cn('header')}>
        <h3 className={cn('title')}>{values.username}</h3>
        <span className={cn('date')}>{values.date}</span>
      </header>

      <p className={cn('text')}>
        {values.text}
      </p>

      <footer className={cn('footer')}>
        <button onClick={callbacks.clickDisplay} className={cn('action')}>Ответить</button>
      </footer>

      {
        formDisplayed && (
          <div>
            {
              props.isFormDisplayed ? (
                <CommentForm
                  title="Новый ответ"
                  onSubmit={props.onNewComment}
                  onClickCancel={callbacks.clickCancel}
                  cancelBtn={true}
                  commentId={comment._id}
                />
              ) : <>{props.warningCmp(callbacks.clickCancel)}</>
            }
          </div>
        )
      }
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
};

Comment.defaultProps = {
  setFormPosition: () => {},
  onNewComment: () => {},
  isFormDisplayed: true
};

export default Comment;
