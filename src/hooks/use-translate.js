import {useEffect, useState, useMemo} from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n, api } = useServices();
  const [lang, setLang] = useState(i18n.lang);

  useEffect(() => {
    i18n.setLang(lang);
    api.setHeader('X-lang', lang);
  }, [lang]);


  const resObj = useMemo(() => ({
    lang,
    setLang,
    t: (text, number) => {
      return i18n.translate(lang, text, number);
    }
  }), [lang]);

  return resObj;
}
