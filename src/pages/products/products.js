import "./product.css";
import React, { useContext, useEffect, useState } from "react";
import { store } from "../../stateManagement/store";
import { setPageTitleAction } from "../../stateManagement/actions";
import { Card } from "../../components/card/Card";
import qs from "querystring";
import { axiosHandler } from "../../utils/axiosHandler";
import {
  errorHandler,
  genericChangeSingle,
  getClientId,
  getToken,
} from "../../utils/helper";
import { PRODUCTS_URL } from "../../utils/urls";
import { Spinner } from "../../components/spinner/Spinner";
import { Notification } from "../../components/notification/Notification";
import Badge from "../../components/Badge/badge";
import moment from "moment";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { Button } from "../../components/button/Button";
import TransactionTable from "../../components/transactionTable/transactionTable";
import Pagination from "../../components/Pagination/pagination";
import { cleanParameters } from "../campaign/campaign";
import { primaryColor, statusMode } from "../../utils/data";

function Products(props) {
  const { dispatch } = useContext(store);
  const [products, setProducts] = useState({});
  const [productCounts, setProductCounts] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState(null);

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Products" });
  }, []);

  useEffect(() => {
    let extra = `page=${currentPage}`;
    extra += `&${qs.stringify(
      cleanParameters({ ...queryParams, keyword: search })
    )}`;
    getProducts(extra);
  }, [search, queryParams, currentPage]);

  const getProducts = (extra = "") => {
    if (!fetching) {
      setFetching(true);
    }
    axiosHandler({
      method: "get",
      clientID: getClientId(),
      token: getToken(),
      url: PRODUCTS_URL,
    }).then(
      (res) => {
        setProducts(res.data);
        setProductCounts(res.data.data.length);
        setFetching(false);
      },
      (err) => {
        Notification.bubble({
          type: "error",
          content: errorHandler(err),
        });
      }
    );
  };

  const headings = ["id", "Name", "Amount", "Description", "created at", ""];

  const formatProducts = () => {
    if (!products.data) return [];
    const result = [];
    products.data.map((item) => {
      result.push([
        <span>
          {item.id.substring(0, 10)}
          {item.id.length > 10 && "..."}
        </span>,
        <span>{item.name}</span>,
        <span>{item.amount}</span>,
        <span>
          {item.description.substring(0, 50)}
          {item.description.length > 50 && "..."}
        </span>,

        moment(new Date(item.created_at)).fromNow(),
        <div>
          <span
            className="link"
            onClick={() => props.history.push(`/product/${item.id}`)}
          >
            View
          </span>
        </div>,
      ]);
      return null;
    });
    return result;
  };

  return (
    <div className="dashboard">
      <div className="computes product-card">
        <Card heading="Total Products">
          <div className="contentCard">
            <br />
            <center>
              {fetching ? <Spinner color={primaryColor} /> : productCounts}
            </center>
            <br />
          </div>
        </Card>
      </div>
      <br />
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search products"
              iconRight={<AppIcon name="search" type="feather" />}
              debounce
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex align-center props">
          &nbsp;
          {/* <Select
            className="lease-search-box"
            defaultOption={statusModeCampaign[0]}
            optionList={statusModeCampaign}
            name="status"
            onChange={(e) =>
              genericChangeSingle(e, setQueryParams, queryParams)
            }
          /> */}
          &nbsp; &nbsp; &nbsp;
          <Button onClick={() => props.history.push("/products/new")}>
            Add New
          </Button>
        </div>
      </div>
      <br />
      <br />

      <TransactionTable
        keys={headings}
        loading={fetching}
        values={formatProducts()}
      />
      <br />
      {!fetching && (
        <Pagination
          counter={products.limit}
          total={products.total}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
      <br />
    </div>
  );
}

export default Products;
