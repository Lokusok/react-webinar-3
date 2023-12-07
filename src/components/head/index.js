import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

import LanguageSwitcher from "../language-switcher";

function Head({ title, onLanguageChange, lang }) {
  return (
    <div className="Head">
      <h1>{title}</h1>

      <LanguageSwitcher onLanguageChange={onLanguageChange} activeLang={lang} />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  onLanguageChange: PropTypes.func.isRequired,
  lang: PropTypes.oneOf(["ru", "en"]).isRequired,
};

Head.defaultProps = {
  lang: "ru",
};

export default memo(Head);
