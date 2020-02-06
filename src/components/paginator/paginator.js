import React from "react";
import ReactPaginate from "react-paginate";
import AppIcon from "../common/icons/Icon";
import "./paginator.css";
import proptypes from "prop-types";

function Paginator(props) {
  return (
    <div className="pagination-main">
      <ReactPaginate
        previousLabel={<AppIcon name="arrowLeft" type="feather" />}
        nextLabel={<AppIcon name="arrowRight" type="feather" />}
        pageCount={props.total}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={e => props.onChange(e.selected + 1)}
        initialPage={props.current - 1}
        disableInitialCallback={true}
        activeClassName="activePage"
      />
    </div>
  );
}

Paginator.defaultProps = {
  total: 10,
  current: 1,
  onChange: () => null
};

Paginator.propType = {
  total: proptypes.number,
  current: proptypes.number,
  onChange: proptypes.func
};

export default Paginator;
