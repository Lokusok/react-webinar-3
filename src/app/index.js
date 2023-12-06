import { useEffect } from "react";

import { Route, Routes, useLocation, useParams } from "react-router-dom";

import Main from "./main";
import Basket from "./basket";
import Product from "./product";

import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const location = useLocation();

  const select = useSelector((state) => ({
    activeModal: state.modals.name,
    activePage: state.catalog.activePage,
  }));

  useEffect(() => {
    const controller = new AbortController();
    store.actions.catalog.load(controller.signal);

    return () => controller.abort();
  }, [select.activePage]);

  useEffect(() => {
    store.actions.modals.close();
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog/:page?" element={<Main />} />
        <Route path="/product/:id?" element={<Product />} />
      </Routes>

      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
