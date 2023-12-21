/**
 * Форматирование unix-метки в читабельный формат
 * @param dateUnix {Number} Метка времени
 * @param opts {Object} Объект настроек
 * @param lang {String} Язык (ru/en)
 * @returns {string} Читабельный формат
*/
function formatDate(dateUnix, opts, lang = 'ru') {
  const dateObj = new Date(dateUnix)
  const options = {
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: 'numeric',
    minute: 'numeric',
    ...opts
  };
  const res = dateObj.toLocaleString(lang, options).replace(/\s*г\./, "")

  return res;
}

export default formatDate;
