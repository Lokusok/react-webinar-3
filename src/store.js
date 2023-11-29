/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      basket: {
        total: {
          price: 0,
          count: 0,
        },
        items: {},
      },
      list: [],
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Добавление записи в корзину по коду
   * @param code
   */
  addToBasket(item) {
    let addedItem = this.state.basket.items[item.code];

    if (!addedItem) {
      addedItem = {
        ...item,
        count: 1,
        type: "basket",
      };
    } else {
      addedItem.count++;
    }

    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        items: {
          ...this.state.basket.items,
          [item.code]: addedItem,
        },
        total: {
          ...this.state.basket.total,
          price: this.state.basket.total.price + addedItem.price,
          count: this.state.basket.total.count + 1,
        },
      },
    });
  }

  /**
   * Удаление записи из корзины по коду
   * @param code
   */
  deleteFromBasket(item) {
    const needDeleteThisItem = this.state.basket.items[item.code];
    const newState = {
      ...this.state,
      basket: {
        ...this.state.basket,
        total: {
          ...this.state.basket.total,
          price: this.state.basket.total.price - item.price * item.count,
          count: this.state.basket.total.count - item.count,
        },
      },
    };

    delete newState.basket.items[needDeleteThisItem.code];

    this.setState(newState);
  }
}

export default Store;
