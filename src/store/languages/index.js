import StoreModule from "../module";

class Languages extends StoreModule {
  initState() {
    return {
      active: "ru",
    };
  }

  setActive(lang) {
    this.setState({
      ...this.getState(),
      active: lang,
    });
  }
}

export default Languages;
