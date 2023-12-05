import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Entities from "../../components/entities";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import languages from "../../languages.json";

function Main() {
  const store = useStore();
  const { page = 1 } = useParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    maxPage: state.catalog.maxPage,
    activeLang: state.languages.active,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Обновление активной страницы
    setActivePage: useCallback(
      (page) => {
        if (page) {
          store.actions.catalog.setActivePage(page);
        }
      },
      [page]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            lang={select.activeLang}
            item={item}
            onAdd={callbacks.addToBasket}
          />
        );
      },
      [callbacks.addToBasket, select.activeLang]
    ),
  };

  const translate = {
    title:
      select.activeLang && languages?.title
        ? languages.title[select.activeLang]
        : "Магазин",
  };

  useEffect(() => {
    callbacks.setActivePage(page);
  }, [page]);

  return (
    <PageLayout>
      <Head title={translate.title} />

      <Entities
        lang={select.activeLang}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />

      <Pagination
        minPage={1}
        activePage={Number(page)}
        maxPage={select.maxPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
