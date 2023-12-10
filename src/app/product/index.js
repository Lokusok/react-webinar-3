import { useCallback, useEffect } from "react";

import { useParams } from "react-router-dom";

import ProductDescription from "../../components/product-description";
import Loader from "../../components/loader";

import DefaultLayout from "../../layouts/default-layout";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { getTranslation } from "../../utils";

function Product() {
  const params = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    activeLang: state.languages.active,
    product: state.product.data,
    isLoading: state.product.isLoading,
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

  useEffect(() => {
    store.actions.product.load(params.id);
  }, [params.id]);

  return (
    <DefaultLayout title={select.product.title}>
      {select.isLoading && <Loader />}

      {!select.isLoading && (
        <ProductDescription
          product={select.product}
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
