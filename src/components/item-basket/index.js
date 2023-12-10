import { memo } from "react";
import { Link } from "react-router-dom";

import { cn as bem } from "@bem-react/classname";

import PropTypes from "prop-types";

import "./style.css";
import { getTranslation, numberFormat } from "../../utils";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id),
  };

  const translate = {
    removeFromBasketBtn: getTranslation(
      "removeFromBasketBtn",
      props.lang,
      "Удалить"
    ),
  };

  const formattedVals = {
    price: numberFormat(props.item.price, props.lang, {
      style: "currency",
      currency: "RUB",
    }),
    amount: numberFormat(props.item.amount || 0),
    url: `${props.url}/${props.item._id}`,
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link to={formattedVals.url} className={cn("link")}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{formattedVals.price}</div>
        <div className={cn("cell")}>{formattedVals.amount} шт</div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>
            {translate.removeFromBasketBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
  lang: PropTypes.oneOf(["ru", "en"]),
  url: PropTypes.isRequired,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  lang: "ru",
};

export default memo(ItemBasket);
