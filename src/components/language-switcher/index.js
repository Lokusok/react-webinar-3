import "./style.css";
import { cn as bem } from "@bem-react/classname";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function LanguageSwitcher() {
  const cn = bem("LanguageSwitcher");
  const store = useStore();
  const activeLang = useSelector((state) => state.languages.active);

  const callbacks = {
    setLanguage: (lang) => {
      store.actions.languages.setActive(lang);
    },
  };

  const handlers = {
    handleChange: (e) => {
      callbacks.setLanguage(e.target.value);
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

export default LanguageSwitcher;
