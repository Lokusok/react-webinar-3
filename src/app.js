import React, { useEffect, useCallback, useMemo } from "react";
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Basket from "./components/basket";

import Entities from "./components/entities";

import { useModal } from "./hooks/useModal";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const totalPrice = basket.total.price;
  const totalUniqueCount = Object.keys(basket.items).length;

  const basketList = useMemo(
    () =>
      Object.entries(basket.items).map(([_, item]) => {
        return item;
      }),
    [basket]
  );

  const [isModalOpen, setIsModalOpen, modalWrapperRef, forDisableFocusRef] =
    useModal();

  useEffect(() => {
    if (totalUniqueCount === 0) {
      setIsModalOpen(false);
    }
  }, [totalUniqueCount]);

  const callbacks = {
    onDeleteFromBasketItem: useCallback(
      (item) => {
        store.deleteFromBasket(item);
      },
      [store]
    ),

    onAddToBasketItem: useCallback(
      (item) => {
        store.addToBasket(item);
      },
      [store]
    ),

    showModal: () => {
      setIsModalOpen(true);
    },

    closeModal: () => {
      setIsModalOpen(false);
    },
  };

  return (
    <>
      <PageLayout ref={forDisableFocusRef}>
        <Head title="Магазин" />
        <Entities
          totalPrice={totalPrice}
          totalCount={totalUniqueCount}
          onShow={callbacks.showModal}
        />
        <List
          list={list}
          elemForRender={(itemData) => (
            <Item item={itemData} onAdd={callbacks.onAddToBasketItem} />
          )}
        />
      </PageLayout>

      {isModalOpen && (
        <Modal ref={modalWrapperRef} closeModal={callbacks.closeModal}>
          <Basket
            onDeleteFromBasketItem={callbacks.onDeleteFromBasketItem}
            list={basketList}
            totalCount={totalUniqueCount}
            totalPrice={totalPrice}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
