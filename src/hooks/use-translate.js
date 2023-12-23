import {useSyncExternalStore} from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();

  const state = useSyncExternalStore(i18n.subscribe, i18n.getSnapshot);

  const resObj = {
    lang: state.lang,
    setLang: i18n.setLang,
    t: (text, number, lang = state.lang) => {
      return i18n.translate(lang, text, number);
    },
  };

  return resObj;
}
