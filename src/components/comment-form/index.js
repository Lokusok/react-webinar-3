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

      if (!data.text.trim().length) {
        return;
      }

      props.onSubmit(data.text);
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
          <button className={cn('submit')} type="submit">{props.submitText}</button>
          {
            props.variant === 'advanced' && (
              <button
                type="button"
                onClick={props.onClickCancel}
                className={cn('cancel')}
              >{props.cancelText}</button>
            )
          }
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  title: PropTypes.string,
  onClickCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  variant: PropTypes.string,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
};

CommentForm.defaultProps = {
  cancelBtn: false,
  onClickCancel: () => {},
};

export default CommentForm;
