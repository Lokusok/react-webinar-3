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
