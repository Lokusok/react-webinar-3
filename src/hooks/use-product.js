import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import getProduct from "../api/product/get-product";

function useProduct(id) {
  const location = useLocation();
  const [data, setData] = useState({
    title: "",
    description: "",
    madeIn: "",
    price: "",
    edition: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductEffect = async () => {
      const { title, description, price, edition, madeIn, category } =
        await getProduct(id);
      setData((prev) => ({
        ...prev,
        title,
        description,
        price,
        edition,
        madeIn: madeIn.title,
        category: category.title,
      }));
      setIsLoading(false);
    };

    setIsLoading(true);
    getProductEffect();
  }, [location.pathname]);

  return { data, isLoading };
}

export default useProduct;
