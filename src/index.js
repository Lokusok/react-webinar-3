import React from "react";
import { createRoot } from "react-dom/client";
import { generateCode } from "./utils.js";
import App from "./app.js";
import Store from "./store.js";

const list = [
  {
    code: generateCode(),
    title: "Название товара",
    price: 100.0,
    type: "default",
  },
  {
    code: generateCode(),
    title: "Книга про React",
    price: 770,
    type: "default",
  },
  { code: generateCode(), title: "Конфета", price: 33, type: "default" },
  { code: generateCode(), title: "Трактор", price: 7955320, type: "default" },
  {
    code: generateCode(),
    title: "Телефон iPhone XIXV",
    price: 120000,
    type: "default",
  },
  {
    code: generateCode(),
    title: "Карандаши цветные",
    price: 111,
    type: "default",
  },
  { code: generateCode(), title: "Товар сюрприз", price: 0, type: "default" },
];

const store = new Store({
  list,
});

const root = createRoot(document.getElementById("root"));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
