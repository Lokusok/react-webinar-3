import './style.css';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

function CommentsLayout({ title, children }) {
  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        {title}
      </div>

      {children}
    </div>
  )
}

CommentsLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
};

export default CommentsLayout;
