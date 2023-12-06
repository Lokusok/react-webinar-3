import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import DefaultLayout from "../../layouts/default-layout";
import Item from "../../components/item";
import List from "../../components/list";
import Pagination from "../../components/pagination";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { getTranslation } from "../../utils";

function Main() {
  const store = useStore();
  const { page = 1 } = useParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    maxPage: state.catalog.maxPage,
    activeLang: state.languages.active,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
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
    title: getTranslation("title", select.activeLang, "Магазин"),
  };

  useEffect(() => {
    callbacks.setActivePage(page);
  }, [page]);

  return (
    <DefaultLayout title={translate.title}>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        minPage={1}
        activePage={Number(page)}
        maxPage={select.maxPage}
      />
    </DefaultLayout>
  );
}

export default memo(Main);
