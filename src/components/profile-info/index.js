import PropTypes from 'prop-types';

import { cn as bem } from '@bem-react/classname';
import './style.css';

import ContentInfo from '../content-info';

function ProfileInfo({ title, info }) {
  const cn = bem('ProfileInfo');

  return (
    <ContentInfo title={<h3 className={cn('title')}>{title}</h3>}>
      <ul className={cn('list')}>
        <li className={cn('item')}>
          <span className={cn('key')}>Имя:{' '}</span>
          <b className={cn('value')}>{info.name}</b>
        </li>

        <li className={cn('item')}>
          <span className={cn('key')}>Телефон:{' '}</span>
          <b className={cn('value')}>{info.phone}</b>
        </li>

        <li className={cn('item')}>
          <span className={cn('key')}>email:{' '}</span>
          <b className={cn('value')}>{info.email}</b>
        </li>
      </ul>
    </ContentInfo>
  );
}

ProfileInfo.propTypes = {
  title: PropTypes.string,
  info: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default ProfileInfo;
