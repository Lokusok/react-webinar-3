import * as translations from './translations';

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.lang = 'ru';
  }

  translate(lang, text, plural) {
    let toLang = lang ? lang : this.lang;

    let result = translations[toLang] && (text in translations[toLang])
      ? translations[toLang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(toLang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  setLang(langObj) {
    this.lang = langObj;
  }

  // get t() {
  //   return (text, number, lang) => this.translate(this.lang, text, number)
  // }
}

export default I18nService;
