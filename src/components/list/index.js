import React from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import Item from "../item";
import "./style.css";

function List({ list, onDeleteFromBasketItem, onAddToBasketItem }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item
            item={item}
            onDelete={onDeleteFromBasketItem}
            onAdd={onAddToBasketItem}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteFromBasketItem: PropTypes.func,
  onAddToBasketItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteFromBasketItem: () => {},
  onAddToBasketItem: () => {},
};

export default React.memo(List);
