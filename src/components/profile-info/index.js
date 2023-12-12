import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileInfo() {
  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Профиль</h3>

      <ul className={cn('list')}>
        <li className={cn('item')}>
          <span className={cn('key')}>Имя:{' '}</span>
          <b className={cn('value')}>User №1</b>
        </li>

        <li className={cn('item')}>
          <span className={cn('key')}>Телефон:{' '}</span>
          <b className={cn('value')}>+70000000001</b>
        </li>

        <li className={cn('item')}>
          <span className={cn('key')}>email:{' '}</span>
          <b className={cn('value')}>test_50@example.com</b>
        </li>
      </ul>
    </div>
  );
}

export default ProfileInfo;
