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

    onDelete: () => {
      props.onDelete(props.item);
    },
  };

  const formattedVals = {
    formattedCurrency: formatCurrency(props.item.price, "RUB"),
  };

  const renderElems = {
    button: {
      basket: <button onClick={callbacks.onDelete}>Удалить</button>,
      default: <button onClick={callbacks.onAdd}>Добавить</button>,
    },

    appendedStats: {
      basket: <span className={cn("stat")}>{props.item.count} шт</span>,
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("actions")}>
        <div className={cn("stats")}>
          <span className={cn("stat")}>{formattedVals.formattedCurrency}</span>
          {renderElems.appendedStats[props.item.type]}
        </div>

        {renderElems.button[props.item.type]}
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
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onAdd: () => {},
};

export default React.memo(Item);
