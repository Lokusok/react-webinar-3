import PropTypes from 'prop-types';

import './style.css';
import { cn as bem } from '@bem-react/classname';

function ContentInfo(props) {
  const cn = bem('ContentInfo');

  return (
    <div className={cn()}>
      {props.title}

      {props.children}
    </div>
  );
}

ContentInfo.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default ContentInfo;
