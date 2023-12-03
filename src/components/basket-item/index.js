import React from "react";
import "./style.css";

import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import { formatCurrency } from "../../utils";

function BasketItem(props) {
  const cn = bem("BasketItem");

  const callbacks = {
    onDelete: () => {
      props.onDelete(props.item);
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
          <span className={cn("stat")}>{props.item.count} шт</span>
        </div>

        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.oneOf(["default", "basket"]),
  }).isRequired,
  onDelete: PropTypes.func,
};

BasketItem.defaultProps = {
  onDelete: () => {},
};

export default BasketItem;
