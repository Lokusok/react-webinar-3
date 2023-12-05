import { memo, useCallback } from "react";
import { Link } from "react-router-dom";

import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";

import PropTypes from "prop-types";
import "./style.css";

import languages from "../../languages.json";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  const translate = {
    removeFromBasketBtn:
      props.lang && languages?.removeFromBasketBtn
        ? languages.removeFromBasketBtn[props.lang]
        : "Удалить",
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn("title")}>
        <Link to={`/product/${props.item._id}`} className={cn("link")}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} шт
        </div>
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
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  lang: "ru",
};

export default memo(ItemBasket);
