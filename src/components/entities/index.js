import React from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import "./style.css";

import Controls from "../controls";
import Total from "../total";

function Entities(props) {
  const cn = bem("Entities");

  return (
    <div className={cn()}>
      <Total
        variant="long"
        totalPrice={props.totalPrice}
        totalCount={props.totalCount}
      />
      <Controls
        onShow={props.onShow}
        isShowDisabled={!Boolean(props.totalCount)}
      />
    </div>
  );
}

Entities.propTypes = {
  onShow: PropTypes.func,
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
};

Entities.defaultProps = {
  onShow: () => {},
};

export default Entities;
