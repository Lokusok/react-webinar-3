import './style.css';

import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function CommentsTitle({ children, count }) {
  const cn = bem('CommentsTitle');

  return (
    <h3 className={cn()}>
      {children} {Number.isFinite(count) && <>({count})</>}
    </h3>
  );
}

CommentsTitle.propTypes = {
  children: PropTypes.string.isRequired,
  count: PropTypes.number,
};

export default CommentsTitle;