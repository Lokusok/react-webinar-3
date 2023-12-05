import React from "react";

import PropTypes from "prop-types";

import "./style.css";

import { cn as bem } from "@bem-react/classname";

import { numberFormat } from "../../utils";

function ProductDescription(props) {
  const cn = bem("ProductDescription");

  const formattedVals = {
    price: numberFormat(props.price, "RU", {
      style: "currency",
      currency: "RUB",
    }),
  };

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <p className={cn("about")}>{props.about}</p>
        <ul className={cn("list")}>
          <li className={cn("descrItem")}>
            Страна производитель:{" "}
            <span className={cn("descrValue")}>{props.madeIn}</span>
          </li>
          <li className={cn("descrItem")}>
            Категория:{" "}
            <span className={cn("descrValue")}>{props.category}</span>
          </li>
          <li className={cn("descrItem")}>
            Год выпуска:{" "}
            <span className={cn("descrValue")}>{props.edition}</span>
          </li>
        </ul>

        <div className={cn("result")}>
          <span className={cn("price")}>Цена: {formattedVals.price}</span>
          <div>{props.addButton}</div>
        </div>
      </div>
    </div>
  );
}

ProductDescription.propTypes = {
  description: PropTypes.string,
  price: PropTypes.number,
  edition: PropTypes.number,
  madeIn: PropTypes.string,
  category: PropTypes.string,
};

export default ProductDescription;
