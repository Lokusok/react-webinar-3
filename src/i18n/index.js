import * as translations from './translations';

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.lang = config.defaultLang;
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

  setLang(newLang) {
    this.lang = newLang;
    this.services.api.setHeader('X-lang', newLang);
  }
}

export default I18nService;
