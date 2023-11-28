import React from "react";
import "./style.css";

import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import List from "../list";
import Total from "../total";

function Basket(props) {
  const cn = bem("Basket");

  return (
    <div className={cn()}>
      <List
        onDeleteFromBasketItem={props.onDeleteFromBasketItem}
        list={props.list}
      />

      <div className={cn("total")}>
        <Total
          totalCount={props.totalCount}
          totalPrice={props.totalPrice}
          variant="short"
        />
      </div>
    </div>
  );
}

Basket.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteFromBasketItem: PropTypes.func,
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default Basket;
