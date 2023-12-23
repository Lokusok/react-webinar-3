import './style.css';
import React, { useEffect, forwardRef } from "react";

import PropTypes from 'prop-types';

const SubCommentLayout = forwardRef((props, ref) => {
  useEffect(() => {
    if (!ref || !props.scrollTo) return;
    ref.current.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
  }, []);

  return (
    <div ref={ref} style={{ paddingLeft: props.offsetX }}>
      {props.children}
    </div>
  );
});

SubCommentLayout.propTypes = {
  scrollTo: PropTypes.bool,
  children: PropTypes.node,
  offsetX: PropTypes.number,
};

export default SubCommentLayout;
