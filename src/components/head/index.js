import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

import LanguageSwitcher from "../language-switcher";

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>

      <LanguageSwitcher />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
