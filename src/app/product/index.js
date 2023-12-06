import { useCallback } from "react";

import { useParams } from "react-router-dom";

import ProductDescription from "../../components/product-description";
import Loader from "../../components/loader";

import DefaultLayout from "../../layouts/default-layout";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import useProduct from "../../hooks/use-product";

import { getTranslation } from "../../utils";

function Product() {
  const params = useParams();
  const store = useStore();
  const { data, isLoading } = useProduct(params.id);

  const select = useSelector((state) => ({
    activeLang: state.languages.active,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  const translate = {
    addToBasketBtn: getTranslation(
      "addToBasketBtn",
      select.activeLang,
      "Добавить"
    ),
  };

  return (
    <DefaultLayout title={data.title}>
      {isLoading && <Loader />}

      {!isLoading && (
        <ProductDescription
          about={data.description}
          price={data.price}
          edition={data.edition}
          madeIn={data.madeIn}
          category={data.category}
          addButton={
            <button onClick={() => callbacks.addToBasket(params.id)}>
              {translate.addToBasketBtn}
            </button>
          }
          lang={select.activeLang}
        />
      )}
    </DefaultLayout>
  );
}

export default Product;
