import { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Entities from "../../components/entities";
import ProductDescription from "../../components/product-description";
import Loader from "../../components/loader";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import getProduct from "../../api/product/get-product";

import languages from "../../languages.json";

function Product() {
  const params = useParams();
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({
    title: "",
    description: "",
    madeIn: "",
    price: "",
    edition: "",
    category: "",
  });

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeLang: state.languages.active,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  useEffect(() => {
    const getProductEffect = async () => {
      const {
        result: { title, description, price, edition, madeIn, category },
      } = await getProduct(params.id);
      setInfo((prev) => ({
        ...prev,
        title,
        description,
        price,
        edition,
        madeIn: madeIn.title,
        category: category.title,
      }));
      setLoading(false);
    };

    setLoading(true);
    getProductEffect();
  }, []);

  const translate = {
    addToBasketBtn:
      select.activeLang && languages?.addToBasketBtn
        ? languages.addToBasketBtn[select.activeLang]
        : "Добавить",
  };

  return (
    <PageLayout>
      <Head title={info.title} />
      <Entities
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.activeLang}
      />
      {loading && <Loader />}

      {!loading && (
        <ProductDescription
          about={info.description}
          price={info.price}
          edition={info.edition}
          madeIn={info.madeIn}
          category={info.category}
          addButton={
            <button onClick={() => callbacks.addToBasket(params.id)}>
              {translate.addToBasketBtn}
            </button>
          }
        />
      )}
    </PageLayout>
  );
}

export default Product;
