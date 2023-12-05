import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";

import languages from "../../languages.json";

function BasketTool({ sum, amount, onOpen, lang }) {
  const cn = bem("BasketTool");

  const translate = {
    basketLabel:
      lang && languages?.basketLabel
        ? languages.basketLabel[lang]
        : "В корзине:",
    basketEmpty:
      lang && languages?.basketEmpty ? languages.basketEmpty[lang] : "пусто",
    basketPopupBtn:
      lang && languages?.basketPopupBtn
        ? languages.basketPopupBtn[lang]
        : "Перейти",
    pluralProducts:
      lang && languages?.pluralProducts
        ? languages.pluralProducts[lang]
        : { one: "товар", few: "товара", many: "товаров" },
  };

  return (
    <div className={cn()}>
      <span className={cn("label")}>{translate.basketLabel}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(
              amount,
              translate.pluralProducts
            )} / ${numberFormat(sum)} ₽`
          : translate.basketEmpty}
      </span>
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
