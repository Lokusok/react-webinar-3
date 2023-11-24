import React from 'react';
import './styles.css';

import plural from 'plural-ru';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                {item.selectCount === 0 ? (
                  <div className="Item-title">{item.title}</div>
                ) : (
                  <div className="Item-title">
                    {`${item.title} | Выделяли ${plural(
                      item.selectCount,
                      '%d раз',
                      '%d раза',
                      '%d раз'
                    )}`}
                  </div>
                )}
                <div className="Item-actions">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      store.deleteItem(item.code);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
