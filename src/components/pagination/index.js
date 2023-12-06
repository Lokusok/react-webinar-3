import React from "react";

import { Link } from "react-router-dom";

import "./style.css";

import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

function Pagination({ minPage, activePage, maxPage }) {
  const cn = bem("Pagination");

  if (minPage === maxPage) {
    return <></>;
  }

  return (
    <div className={cn()}>
      <div className={cn("row")}>
        <div className={cn("list")}>
          <div className={cn("item")}>
            <Link
              to={`/catalog/${minPage}`}
              className={cn("link", {
                active: activePage === minPage,
              })}
            >
              {minPage}
            </Link>
          </div>

          <div
            className={cn("main-list", {
              separatedLeft: activePage - minPage >= 3,
              separatedRight: maxPage - activePage >= 3,
            })}
          >
            {activePage === maxPage && (
              <div className={cn("item")}>
                <Link to={`/catalog/${maxPage - 2}`} className={cn("link")}>
                  {maxPage - 2}
                </Link>
              </div>
            )}

            {activePage - 1 > minPage && (
              <div className={cn("item")}>
                <Link to={`/catalog/${activePage - 1}`} className={cn("link")}>
                  {activePage - 1}
                </Link>
              </div>
            )}

            {![minPage, maxPage].includes(activePage) && (
              <div className={cn("item")}>
                <Link
                  to={`/catalog/${activePage}`}
                  className={cn("link", { active: true })}
                >
                  {activePage}
                </Link>
              </div>
            )}

            {activePage + 1 < maxPage && (
              <div className={cn("item")}>
                <Link to={`/catalog/${activePage + 1}`} className={cn("link")}>
                  {activePage + 1}
                </Link>
              </div>
            )}

            {activePage === minPage && (
              <div className={cn("item")}>
                <Link to={`/catalog/${minPage + 2}`} className={cn("link")}>
                  {minPage + 2}
                </Link>
              </div>
            )}
          </div>

          <div className={cn("item")}>
            <Link
              to={`/catalog/${maxPage}`}
              className={cn("link", {
                active: activePage === maxPage,
              })}
            >
              {maxPage}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  minPage: PropTypes.number,
  activePage: PropTypes.number,
  maxPage: PropTypes.number,
};

Pagination.defaultProps = {
  minPage: 1,
};

export default Pagination;
