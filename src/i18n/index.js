import * as translations from './translations';

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      lang: config.defaultLang || 'ru',
    };
    this.listeners = new Set();

    // т.к. отдаются во внешнее пользование - биндим контекст
    this.getSnapshot = this.getSnapshot.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.setLang = this.setLang.bind(this);
    this.translate = this.translate.bind(this);
  }

  translate = (lang, text, plural) => {
    let toLang = lang || this.config.lang;

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

  setLang = (newLang) => {
    const toLang = newLang || this.config.lang;
    this.config = {
      ...this.config,
      lang: toLang,
    };
    this.services.api.setHeader('X-lang', newLang);
    this.execListeners();
  }

  getSnapshot = () => {
    return this.config;
  }

  subscribe = (listener) => {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  execListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export default I18nService;
