import React from "react";

import { Link } from "react-router-dom";

import "./style.css";

import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import BasketTool from "../basket-tool";

import languages from "../../languages.json";

function Entities(props) {
  const cn = bem("Entities");

  return (
    <div className={cn()}>
      <Link to="/" className={cn("link")}>
        {languages.home[props.lang]}
      </Link>
      <BasketTool
        lang={props.lang}
        onOpen={props.onOpen}
        sum={props.sum}
        amount={props.amount}
      />
    </div>
  );
}

Entities.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.oneOf(["ru", "en"]),
};

Entities.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: "ru",
};

export default Entities;
