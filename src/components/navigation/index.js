import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import "./style.css";

import { cn as bem } from "@bem-react/classname";

import { getTranslation } from "../../utils";

function Navigation(props) {
  const cn = bem("Navigation");

  const translate = {
    home: getTranslation("home", props.lang, "Главная"),
  };

  return (
    <nav className={cn()}>
      <ul className={cn("list")}>
        <li className={cn("item")}>
          <Link to="/" className={cn("link")}>
            {translate.home}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  lang: PropTypes.oneOf(["ru", "en"]),
};

export default Navigation;
