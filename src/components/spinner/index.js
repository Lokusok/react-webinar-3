import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { cn as bem } from '@bem-react/classname';

function Spinner({active, disable, children}) {
  const cn = bem('Spinner');

  if (active) {
    return <div className={cn({ disable })}>{children}</div>
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
  disable: PropTypes.bool,
};

Spinner.defaultProps = {}

export default memo(Spinner);
