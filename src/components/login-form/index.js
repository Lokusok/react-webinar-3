import { useState } from 'react';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

import ContentInfo from '../content-info';

function LoginForm(props) {
  const cn = bem("LoginForm");
  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      props.onSubmit(data.login.trim(), data.password.trim());
    },
    onChange: (e) => {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    },
  }

  return (
    <ContentInfo title={<h3 className={cn('title')}>{props.title}</h3>}>
      <form onSubmit={callbacks.onSubmit} className={cn('form')}>
        <label className={cn('label')}>
          Логин
          <input
            onChange={callbacks.onChange}
            value={data['login']}
            className={cn('input')}
            name='login'
            type="text"
          />
        </label>

        <label className={cn('label')}>
          Пароль
          <input
            onChange={callbacks.onChange}
            value={data['password']}
            className={cn('input')}
            name='password'
            type="password"
          />
        </label>

        {
          Boolean(props.error) && (
            <span className={cn('error')}>{props.error}</span>
          )
        }

        <div>
          <button type="submit">Войти</button>
        </div>
      </form>
    </ContentInfo>
  )
}

LoginForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  error: PropTypes.string,
};

export default LoginForm;
