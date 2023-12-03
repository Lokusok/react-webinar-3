import React from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";

import "./style.css";

function List({ list, elemForRender }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn("item")}>
          {elemForRender(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  elemForRender: () => PropTypes.node,
};

export default React.memo(List);
