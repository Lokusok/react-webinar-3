import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

import languages from "../../languages.json";

function BasketTotal({ sum, lang }) {
  const cn = bem("BasketTotal");

  const translate = {
    resultPriceLabel:
      lang && languages?.resultPriceLabel
        ? languages.resultPriceLabel[lang]
        : "Итого",
  };

  return (
    <div className={cn()}>
      <span className={cn("cell")}>{translate.resultPriceLabel}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
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
