import React from "react";

import PropTypes from "prop-types";

import "./style.css";

import { cn as bem } from "@bem-react/classname";

import { getTranslation, numberFormat } from "../../utils";

function ProductDescription(props) {
  const cn = bem("ProductDescription");

  const formattedVals = {
    price: numberFormat(props.price, props.lang, {
      style: "currency",
      currency: "RUB",
    }),
  };

  const translate = {
    countryMade: getTranslation(
      "countryMade",
      props.lang,
      "Страна производитель"
    ),
    categoryProd: getTranslation("categoryProd", props.lang, "Категория"),
    yearRelease: getTranslation("yearRelease", props.lang, "Год выпуска"),
    priceLabel: getTranslation("priceLabel", props.lang, "Цена"),
  };

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <p className={cn("about")}>{props.about}</p>
        <ul className={cn("list")}>
          <li className={cn("descrItem")}>
            {translate.countryMade}:{" "}
            <span className={cn("descrValue")}>{props.madeIn}</span>
          </li>
          <li className={cn("descrItem")}>
            {translate.categoryProd}:{" "}
            <span className={cn("descrValue")}>{props.category}</span>
          </li>
          <li className={cn("descrItem")}>
            {translate.yearRelease}:{" "}
            <span className={cn("descrValue")}>{props.edition}</span>
          </li>
        </ul>

        <div className={cn("result")}>
          <span className={cn("price")}>
            {translate.priceLabel}: {formattedVals.price}
          </span>
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
  lang: PropTypes.oneOf(["ru", "en"]),
};

ProductDescription.defaultProps = {
  lang: "ru",
};

export default ProductDescription;
