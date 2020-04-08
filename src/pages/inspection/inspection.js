import React, { useContext, useEffect, useState } from "react";
import "./inspection.css";
import inspectSvg from "../../assets/svgs/inspect.svg";
import Input from "../../components/input/Input";
import AppIcon from "../../components/icons/Icon";
import { Select } from "../../components/select/Select";
import {
  FrontEndUrl,
  inspectionSortOptions,
  secondaryColor
} from "../../utils/data";
import TransactionTable from "../../components/transactionTable/transactionTable";
import {
  genericChangeSingle,
  getArrayCount,
  getToken
} from "../../utils/helper";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge/badge";
import { Button } from "../../components/button/Button";
import { axiosHandler } from "../../utils/axiosHandler";
import { INSPECTION_URL } from "../../utils/urls";
import { Notification } from "../../components/notification/Notification";
import { store } from "../../stateManagement/store";
import { rolesState } from "../../stateManagement/reducers/genericReducer";
import { Spinner } from "../../components/spinner/Spinner";
import { setPageTitleAction } from "../../stateManagement/actions";
import moment from "moment";
import { Modal } from "../../components/modal/Modal";
import FormGroup from "../../components/formGroup/formGroup";
import { TextAreaField } from "../../components/textarea/TextAreaField";

function Inspection(props) {
  const [fetching, setFetching] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inspections, setInspections] = useState({});
  const [inspectionData, setInspectionData] = useState({});
  const [activeID, setActiveID] = useState({});
  const {
    state: { userDetails },
    dispatch
  } = useContext(store);
  const [role, setRole] = useState(null);

  const headings = [
    "Property",
    "Date",
    role === "tenant" ? "Agent in charge" : "Prospective Customer",
    "Status",
    "Remark",
    "Action"
  ];

  useEffect(() => {
    dispatch({ type: setPageTitleAction, payload: "Inspections" });
  }, []);

  useEffect(() => {
    if (!userDetails.role) return;
    setRole(userDetails.role.name.toLowerCase());
    getInspections();
  }, [userDetails]);

  const getInspections = () => {
    if (!fetching) {
      setFetching(true);
    }

    axiosHandler("get", INSPECTION_URL, getToken()).then(
      res => {
        setInspections(res.data.results);
        setFetching(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops, an error occurred"
        });
      }
    );
  };

  const getInspectionSchedule = ins => {
    let dateTime = `${ins.inspection_date} ${ins.inspection_time}`;
    dateTime = new Date(dateTime);
    return moment(dateTime).format("DD MMMM, YYYY.  h:m a");
  };

  const getUserInfo = user => {
    return (
      <span>
        {`${user.first_name} ${user.last_name}`} <br />{" "}
        {user.user_profile &&
          `${user.user_profile.country_code}${user.user_profile.phone_number}`}
      </span>
    );
  };

  const getPropertyManage = unit => {
    if (role !== "tenant") {
      return getUserInfo(unit);
    } else {
      if (unit.unit_manager) {
        return getUserInfo(unit.unit_manager);
      } else {
        return getUserInfo(unit.property.property_creator);
      }
    }
  };

  const getValues = () => {
    const retval = [];
    inspections.results.map(item => {
      retval.push([
        <a
          href={
            FrontEndUrl +
            `/explore/${item.application.unit.uuid}_${item.application.unit.id}`
          }
          target="_blank"
        >
          <span className="text-capitalized">{`${item.application.unit.title}, ${item.application.unit.property.title}. ${item.application.unit.property.address_info.address} ${item.application.unit.property.address_info.city}, ${item.application.unit.property.address_info.state}`}</span>
        </a>,
        <span>{getInspectionSchedule(item)}</span>,
        <span className="text-capitalized">
          {getPropertyManage(
            role !== "tenant" ? item.application.user : item.application.unit
          )}
        </span>,
        <span className="text-capitalized">
          <Badge
            status={
              item.status === "pending"
                ? "processing"
                : item.status === "completed"
                ? "success"
                : "error"
            }
          >
            {item.status}
          </Badge>
        </span>,
        <span />,
        role === "tenant" && item.status === "pending" && (
          <Button
            onClick={() => {
              setActiveID(item.id);
              setModalState(true);
            }}
          >
            Update Status
          </Button>
        )
      ]);
      return null;
    });
    return retval;
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    axiosHandler(
      "patch",
      INSPECTION_URL + `/${activeID}`,
      getToken(),
      inspectionData
    ).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Inspection updated successfully"
        });
        getInspections();
        setInspectionData({});
        setModalState(false);
        setLoading(false);
      },
      err => {
        Notification.bubble({
          type: "error",
          content: "Ops!, an error occurred"
        });
        setLoading(false);
      }
    );
  };

  if (fetching) {
    return (
      <>
        <br />
        <Spinner color={secondaryColor} size={15} />
      </>
    );
  }

  return (
    <>
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
      <Modal onClose={() => setModalState(false)} visible={modalState}>
        <form className="inspection-form" onSubmit={onSubmit}>
          <h3>Update Inspection</h3>
          <p>Let us know how your inspection went.</p>
          <br />
          <FormGroup label="Inspection status">
            <Select
              required
              placeholder="--select status--"
              name="status"
              onChange={e =>
                genericChangeSingle(e, setInspectionData, inspectionData)
              }
              optionList={[
                { title: "Completed", value: "completed" },
                { title: "Failed", value: "failed" }
              ]}
            />
          </FormGroup>
          <FormGroup label="Remarks">
            <TextAreaField
              required
              name="remark"
              onChange={e =>
                genericChangeSingle(e, setInspectionData, inspectionData)
              }
              placeholder="tell us about the inspection"
            />
          </FormGroup>
          <Button type="submit" loading={loading} disabled={loading}>
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default Inspection;
