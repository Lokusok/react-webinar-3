import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm() {
  const cn = bem("LoginForm");

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Вход</h3>

      <form className={cn('form')}>
        <label className={cn('label')}>
          Логин
          <input className={cn('input')} type="text" />
        </label>

        <label className={cn('label')}>
          Пароль
          <input className={cn('input')} type="password" />
        </label>

        <span className={cn('error')}>Текст ошибки от сервера</span>

        <div>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
