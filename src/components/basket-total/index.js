import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

import { getTranslation, numberFormat } from "../../utils";

function BasketTotal({ sum, lang }) {
  const cn = bem("BasketTotal");

  const translate = {
    resultPriceLabel: getTranslation("resultPriceLabel", lang, "Итого"),
  };

  const formattedVals = {
    price: numberFormat(sum, lang, { style: "currency", currency: "RUB" }),
  };

  return (
    <div className={cn()}>
      <span className={cn("cell")}>{translate.resultPriceLabel}</span>
      <span className={cn("cell")}>{formattedVals.price}</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  lang: PropTypes.oneOf(["ru", "en"]),
};

BasketTotal.defaultProps = {
  sum: 0,
  lang: "ru",
};

export default memo(BasketTotal);
