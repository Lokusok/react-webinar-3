function formatDate(dateUnix, opts) {
  const dateObj = new Date(dateUnix)
  const options = {
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: 'numeric',
    minute: 'numeric',
    ...opts
  };
  const res = dateObj.toLocaleString('ru', options).replace(/\s*г\./, "")

  return res;
}

export default formatDate;
