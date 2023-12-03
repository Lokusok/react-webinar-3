import React, { useState } from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import "./style.css";

import { formatCurrency } from "../../utils";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: () => {
      props.onAdd(props.item);
    },
  };

  const formattedVals = {
    formattedCurrency: formatCurrency(props.item.price, "RUB"),
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("actions")}>
        <div className={cn("stats")}>
          <span className={cn("stat")}>{formattedVals.formattedCurrency}</span>
        </div>

        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.oneOf(["default", "basket"]),
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
