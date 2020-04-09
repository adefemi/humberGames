import React from "react";
import "./transactionTable.css";
import proptype from "prop-types";

function TransactionTable({ keys, values }) {
  if (!keys || !values) {
    return <div />;
  }
  return (
    <div className="transactionTable">
      <table>
        <thead>
          <tr>
            {keys.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((item, index) => (
            <tr key={index}>
              {item.map((content, key) => (
                <td key={key}>{content}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TransactionTable.propType = {
  keys: proptype.array,
  values: proptype.arrayOf(proptype.array)
};

export default TransactionTable;
