import StoreModule from "../module";

import { buildTree } from "../../utils";

class CategoriesState extends StoreModule {

  initState() {
    return {
      list: []
    };
  }

  async loadCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const categoriesFetched = (await response.json()).result.items;
    const categories = buildTree(categoriesFetched);

    this.setState({
      ...this.getState(),
      list: categories,
    });
  }
}

export default CategoriesState;
