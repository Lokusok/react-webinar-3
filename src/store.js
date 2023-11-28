import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      basket: {
        total: 0,
        items: [],
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
  addToBasket(code) {
    const addedItem = this.state.list.find((item) => item.code === code);

    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        items: {
          ...this.state.basket.items,
          [code]: Number.isFinite(this.state.basket.items[code])
            ? this.state.basket.items[code] + 1
            : 1,
        },
        total: this.state.basket.total + addedItem.price,
      },
    });
  }

  /**
   * Удаление записи из корзины по коду
   * @param code
   */
  deleteFromBasket(code) {
    const deletingItem = this.state.list.find((item) => item.code === code);
    const basketDeletingItemCount = this.state.basket.items[deletingItem.code];

    const newState = {
      ...this.state,
      basket: {
        ...this.state.basket,
        total:
          this.state.basket.total -
          deletingItem.price * basketDeletingItemCount,
      },
    };
    delete newState.basket.items[deletingItem.code];

    this.setState(newState);
  }
}

export default Store;
