import React from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import "./style.css";
import { plural, formatCurrency } from "../../utils";

function Total(props) {
  const cn = bem("Total");

  const formattedVals = Boolean(props.totalCount) && {
    pluralCount: plural(props.totalCount, {
      one: "товар",
      few: "товара",
      many: "товаров",
    }),
    formattedCurrency: formatCurrency(props.totalPrice, "RUB"),
  };

  return (
    <div className={cn("Total")}>
      {props.variant === "short" && (
        <>
          <div className={cn("bold", { gap: "long" })}>
            <span className={cn("prefix")}>Итого </span>
            <span className={cn("value")}>
              {formattedVals.formattedCurrency}
            </span>
          </div>
        </>
      )}

      {props.variant === "long" && (
        <>
          <span className={cn("prefix")}>В корзине: </span>
          {formattedVals ? (
            <>
              <b>
                {props.totalCount} {formattedVals.pluralCount}
              </b>
              <span className={cn("bold")}> / </span>
              <b>{formattedVals.formattedCurrency}</b>
            </>
          ) : (
            <b>пусто</b>
          )}
        </>
      )}
    </div>
  );
}

Total.propTypes = {
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
  variant: PropTypes.oneOf(["short", "long"]),
};

export default Total;
