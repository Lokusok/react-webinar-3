import { memo, useState } from "react";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

import languages from "../../languages.json";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  const translate = {
    addToBasketBtn:
      props.lang && languages?.addToBasketBtn
        ? languages.addToBasketBtn[props.lang]
        : "Добавить",
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link to={`/product/${props.item._id}`} className={cn("link")}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate.addToBasketBtn}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  lang: PropTypes.oneOf(["ru", "en"]),
};

Item.defaultProps = {
  onAdd: () => {},
  lang: "ru",
};

export default memo(Item);
