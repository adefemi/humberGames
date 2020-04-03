import React from "react";
import "./inspection.css";
import inspectSvg from "../../assets/svgs/inspect.svg";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import { inspectionSortOptions } from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import { getArrayCount } from "../../utils/helper";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge/badge";
import { Button } from "../../components/button/Button";

function Inspection(props) {
  const headings = [
    "Property",
    "Date",
    "Agent in charge",
    "Status",
    "Remark",
    "Action"
  ];

  const getValues = () => {
    const retval = [];
    getArrayCount(10).map(item => {
      retval.push([
        <Link to="/">
          Unit 51, Adedeji Estate. 21 Adebola Street, Ikoyi, Lagos
        </Link>,
        <span>21 Jan, 2020</span>,
        <span>
          Adewale Ayodeji <br /> 0900393003
        </span>,
        <span>
          <Badge status="processing">Pending</Badge>
        </span>,
        <span />,
        <Button>Update</Button>
      ]);
      return null;
    });
    return retval;
  };
  return (
    <div className="inspection-main">
      <section className="heading-context">
        <img src={inspectSvg} alt="garden" />
        <div className="context">
          <h3>Manage Inspections</h3>
          <p>
            See all your inspections, scheduled, visited, failed, easily and
            seamlessly
          </p>
        </div>
      </section>
      <br />
      <br />
      <div className="flex align-center justify-between">
        <div>
          <div className="lease-search-box">
            <Input
              placeholder="Search properties"
              iconRight={<AppIcon name="search" type="feather" />}
            />
          </div>
        </div>
        <div className="flex align-center props">
          &nbsp;
          <Select
            className="lease-search-box"
            defaultOption={inspectionSortOptions[0]}
            optionList={inspectionSortOptions}
          />
        </div>
      </div>
      <br />
      <br />
      <TransactionTable keys={headings} values={getValues()} />
    </div>
  );
}

export default Inspection;
