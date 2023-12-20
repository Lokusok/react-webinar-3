import { useState } from 'react';
import './style.css';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

function CommentForm(props) {
  const cn = bem('CommentForm');

  const [data, setData] = useState({
    text: '',
  });

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      props.onSubmit(data.text, props.commentId);
      setData({ text: '' });
    },

    onChange: (e) => {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
  };

  return (
    <div className={cn()}>
      <span className={cn('title')}>{props.title}</span>
      <form onSubmit={callbacks.onSubmit} className={cn('form')}>
        <textarea
          required={true}
          onChange={callbacks.onChange}
          value={data.text}
          name="text"
          className={cn('textarea')}
        ></textarea>

        <div className={cn('buttons')}>
          <button className={cn('submit')} type="submit">Отправить</button>
          {
            props.variant === 'advanced' && (
              <button
                onClick={props.onClickCancel}
                className={cn('cancel')}
              >Отменить</button>
            )
          }
        </div>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  cancelBtn: PropTypes.bool,
  onClickCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  commentId: PropTypes.string,
  variant: PropTypes.string,
};

CommentForm.defaultProps = {
  cancelBtn: false,
  onClickCancel: () => {},
};

export default CommentForm;
