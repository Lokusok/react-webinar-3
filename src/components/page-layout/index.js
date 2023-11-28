import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const PageLayout = React.forwardRef(({ children }, ref) => {
  const cn = bem("PageLayout");

  return (
    <div ref={ref} className={cn()}>
      <div className={cn("center")}>{children}</div>
    </div>
  );
});

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PageLayout);
