import "./style.css";
import { cn as bem } from "@bem-react/classname";

import PropTypes from "prop-types";

function LanguageSwitcher({ onLanguageChange, activeLang }) {
  const cn = bem("LanguageSwitcher");

  const handlers = {
    handleChange: (e) => {
      onLanguageChange(e.target.value);
    },
  };

  return (
    <div className={cn()}>
      <select value={activeLang} onChange={handlers.handleChange}>
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  onLanguageChange: PropTypes.func.isRequired,
  activeLang: PropTypes.oneOf(["ru", "en"]).isRequired,
};

export default LanguageSwitcher;
