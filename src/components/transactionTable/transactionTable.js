import React from "react";
import "./transactionTable.css";
import proptype from "prop-types";
import { Spinner } from "../spinner/Spinner";

function TransactionTable({ keys, values, loading, canClick, onClick }) {
  if (!loading) {
    if (!keys || !values) {
      return <div />;
    }
  }

  const getTableItems = item => {
    const returnValue = [];
    for (let i = 0; i < item.length; i++) {
      if (canClick && i === item.length - 1) continue;
      returnValue.push(<td key={i}>{item[i]}</td>);
    }
    return returnValue;
  };

  return (
    <div className="table-cover">
      <div className="transactionTable">
        <table>
          <thead>
            <tr>
              {keys.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <div className="loading">
              <Spinner />
            </div>
          ) : (
            <tbody>
              {values.map((item, index) => (
                <tr
                  key={index}
                  className={canClick ? "hoverable" : ""}
                  onClick={() => {
                    if (canClick && onClick) {
                      onClick(item[item.length - 1]);
                    }
                  }}
                >
                  {getTableItems(item)}
                </tr>
              ))}
              {values.length < 1 && (
                <div className="noData">No data found...</div>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

TransactionTable.propType = {
  keys: proptype.array,
  values: proptype.arrayOf(proptype.array)
};

export default TransactionTable;
