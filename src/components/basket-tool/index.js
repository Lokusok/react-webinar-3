import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

import { getTranslation, numberFormat, plural } from "../../utils";

function BasketTool({ sum, amount, onOpen, lang }) {
  const cn = bem("BasketTool");

  const translate = {
    basketLabel: getTranslation("basketLabel", lang, "В корзине:"),
    basketEmpty: getTranslation("basketEmpty", lang, "пусто"),
    basketPopupBtn: getTranslation("basketPopupBtn", lang, "Перейти"),
    pluralProducts: getTranslation("pluralProducts", lang, {
      one: "товар",
      few: "товара",
      many: "товаров",
    }),
  };

  const formattedVals = {
    amount: amount
      ? `${amount} ${plural(amount, translate.pluralProducts)} / ${numberFormat(
          sum,
          lang,
          {
            style: "currency",
            currency: "RUB",
          }
        )}`
      : translate.basketEmpty,
  };

  return (
    <div className={cn()}>
      <span className={cn("label")}>{translate.basketLabel}</span>
      <span className={cn("total")}>{formattedVals.amount}</span>
      <button onClick={onOpen}>{translate.basketPopupBtn}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.oneOf(["ru", "en"]),
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: "ru",
};

export default memo(BasketTool);
