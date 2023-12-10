import StoreModule from "../module";
import getProduct from "../../api/product/get-product";

class Product extends StoreModule {
  initState() {
    return {
      data: {},
      isLoading: true,
    };
  }

  async load(id) {
    this.setState({
      ...this.getState(),
      data: {},
      isLoading: true,
    });

    const data = await getProduct(id);

    this.setState({
      data,
      isLoading: false,
    });
  }
}

export default Product;
