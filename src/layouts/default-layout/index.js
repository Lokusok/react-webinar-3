import { useCallback } from "react";

import PropTypes from "prop-types";

import PageLayout from "../page-layout";
import Head from "../../components/head";
import Entities from "../../components/entities";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function DefaultLayout({ title, children }) {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeLang: state.languages.active,
  }));

  const callbacks = {
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    setLanguage: (lang) => {
      store.actions.languages.setActive(lang);
    },
  };

  return (
    <PageLayout>
      <Head
        title={title}
        onLanguageChange={callbacks.setLanguage}
        lang={select.activeLang}
      ></Head>

      <Entities
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.activeLang}
      />

      {children}
    </PageLayout>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default DefaultLayout;
