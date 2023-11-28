import React from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import "./style.css";

import Head from "../head";

const Modal = React.forwardRef((props, ref) => {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div ref={ref} className={cn("inner")}>
        <div className={cn("content")}>
          <Head title="Корзина">
            <button onClick={props.closeModal}>Закрыть</button>
          </Head>

          <div className={cn("children")}>{props.children}</div>
        </div>
      </div>
    </div>
  );
});

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  closeModal: () => {},
};

export default Modal;
