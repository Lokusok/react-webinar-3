import React, { useState } from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import "./style.css";

import { formatCurrency } from "../../utils";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (code) => {
      props.onAdd(code);
    },

    onDelete: (code) => {
      props.onDelete(code);
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
          <span className={cn("stat", "price")}>
            {formattedVals.formattedCurrency}
          </span>
          {props.item.type === "basket" && (
            <span className={cn("stat", "count")}>{props.item.count} шт</span>
          )}
        </div>

        {props.item.type === "basket" ? (
          <button onClick={() => callbacks.onDelete(props.item)}>
            Удалить
          </button>
        ) : (
          <button onClick={() => callbacks.onAdd(props.item)}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.oneOf([undefined, "basket"]),
  }).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onAdd: () => {},
};

export default React.memo(Item);
