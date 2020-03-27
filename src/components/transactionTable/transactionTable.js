import React from "react";
import "./transactionTable.css";

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

export default TransactionTable;
