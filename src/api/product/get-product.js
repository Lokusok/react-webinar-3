export default async function getProduct(id) {
  const response = await fetch(
    `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
  );
  const json = await response.json();

  return json;
}
