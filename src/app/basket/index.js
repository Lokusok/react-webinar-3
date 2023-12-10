import { memo, useCallback } from "react";

import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import BasketTotal from "../../components/basket-total";

import ModalLayout from "../../layouts/modal-layout";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { getTranslation } from "../../utils";

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeLang: state.languages.active,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            url="/product"
            lang={select.activeLang}
            item={item}
            onRemove={callbacks.removeFromBasket}
          />
        );
      },
      [callbacks.removeFromBasket, select.activelang]
    ),
  };

  const translate = {
    basketTitle: getTranslation("basketTitle", select.activeLang, "Корзина"),
  };

  return (
    <ModalLayout
      lang={select.activeLang}
      title={translate.basketTitle}
      onClose={callbacks.closeModal}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal lang={select.activeLang} sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
