import React, { useState, useEffect, useCallback, useRef } from "react";
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Basket from "./components/basket";

import Entities from "./components/entities";

import { useModal } from "./hooks/useModal";

import {
  reduceCountOfItems,
  createListWithCountsOfPerItemAndType,
} from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const totalPrice = basket.total;
  const totalCount = reduceCountOfItems(basket.items);
  const basketList = createListWithCountsOfPerItemAndType(
    list,
    basket.items,
    "basket"
  );

  const [isModalOpen, setIsModalOpen, modalWrapperRef, forDisableFocusRef] =
    useModal();

  useEffect(() => {
    if (totalCount === 0) {
      setIsModalOpen(false);
    }
  }, [totalCount]);

  const callbacks = {
    onDeleteFromBasketItem: useCallback(
      (code) => {
        store.deleteFromBasket(code);
      },
      [store]
    ),

    onAddToBasketItem: useCallback(
      (code) => {
        store.addToBasket(code);
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
          totalCount={totalCount}
          onShow={callbacks.showModal}
        />
        <List
          list={list}
          onDeleteFromBasketItem={callbacks.onDeleteFromBasketItem}
          onAddToBasketItem={callbacks.onAddToBasketItem}
        />
      </PageLayout>

      {isModalOpen && (
        <Modal ref={modalWrapperRef} closeModal={callbacks.closeModal}>
          <Basket
            onDeleteFromBasketItem={callbacks.onDeleteFromBasketItem}
            list={basketList}
            totalCount={totalCount}
            totalPrice={totalPrice}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
