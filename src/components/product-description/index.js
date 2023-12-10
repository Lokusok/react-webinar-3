import React from "react";

import PropTypes from "prop-types";

import "./style.css";

import { cn as bem } from "@bem-react/classname";

import { getTranslation, numberFormat } from "../../utils";

function ProductDescription(props) {
  const cn = bem("ProductDescription");

  const formattedVals = {
    price: numberFormat(props.product.price, props.lang, {
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
        <p className={cn("about")}>{props.product.description}</p>
        <ul className={cn("list")}>
          <li className={cn("descrItem")}>
            {translate.countryMade}:{" "}
            <span className={cn("descrValue")}>
              {props.product.madeIn.title}
            </span>
          </li>
          <li className={cn("descrItem")}>
            {translate.categoryProd}:{" "}
            <span className={cn("descrValue")}>
              {props.product.category.title}
            </span>
          </li>
          <li className={cn("descrItem")}>
            {translate.yearRelease}:{" "}
            <span className={cn("descrValue")}>{props.product.edition}</span>
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
  product: PropTypes.shape({
    description: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
    madeIn: PropTypes.shape({ title: PropTypes.string }),
    category: PropTypes.shape({ title: PropTypes.string }),
  }),
  lang: PropTypes.oneOf(["ru", "en"]),
};

ProductDescription.defaultProps = {
  lang: "ru",
};

export default ProductDescription;
