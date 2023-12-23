import {memo, useMemo} from 'react';
import Select from '../../components/select';
import useTranslate from '../../hooks/use-translate';

function LocaleSelect() {
  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  const {lang, setLang} = useTranslate();

  return (
    <Select onChange={setLang} value={lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
