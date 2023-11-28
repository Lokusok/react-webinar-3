import React from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import "./style.css";

function Controls(props) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <button
        className={cn("action")}
        onClick={props.onShow}
        disabled={props.isShowDisabled}
      >
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onShow: PropTypes.func,
  isShowDisabled: PropTypes.bool,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
