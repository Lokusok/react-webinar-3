import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      activePage: 1,
      limit: 10,
      maxPage: 1,
    };
  }

  setActivePage(page) {
    this.setState({
      ...this.getState(),
      activePage: page,
    });
  }

  async load(signal) {
    const { activePage, limit } = this.getState();
    const skip = (activePage - 1) * limit;

    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
      { signal }
    );
    const json = await response.json();
    const maxPage = Math.ceil(json.result.count / limit);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        maxPage,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
