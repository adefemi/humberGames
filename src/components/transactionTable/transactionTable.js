import React from "react";
import "./transactionTable.css";
import proptype from "prop-types";
import { Spinner } from "../spinner/Spinner";

function TransactionTable({ keys, values, loading }) {
  if (!keys || !values) {
    return <div />;
  }
  return (
    <div className="transaction_table_main">
      <table className="inner_main">
        <thead className="heading">
          {keys.map((item, index) => (
            <th className="thead" key={index}>
              {item}
            </th>
          ))}
        </thead>
        {!loading && (
          <tbody>
            {values.map((item, index) => (
              <tr className="body" key={index}>
                {item.map((content, key) => (
                  <td className="tbody" key={key}>
                    {content}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {values.length < 1 && !loading && (
        <div className="noData">No data found...</div>
      )}
      {loading && (
        <div className="noData">
          <Spinner color="#c3c3c3" />
        </div>
      )}
    </div>
  );
}

TransactionTable.propType = {
  keys: proptype.array,
  values: proptype.arrayOf(proptype.array)
};

export default TransactionTable;
