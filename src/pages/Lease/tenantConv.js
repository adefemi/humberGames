import React, { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { axiosHandler } from "../../utils/axiosHandler";
import { LEASE_TEMPLATE_URL, MISC_TEMPLATE_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import { Notification } from "../../components/notification/Notification";

function TenantConv(props) {
  const [leaseId, setLeaseId] = useState(null);
  const [leaseTemplates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.lease) {
      setLeaseId(props.lease.id);
      if (props.lease.templates.length < 1) {
        getTemplate();
      } else {
        setTemplates(
          formatTemplate(
            props.lease.templates,
            props.lease.application,
            props.lease.id
          )
        );
      }
    }
  }, [props.lease]);

  const getTemplate = () => {
    axiosHandler("get", MISC_TEMPLATE_URL).then(res => {
      setTemplates(
        formatTemplate(
          res.data.results.results,
          props.lease.application,
          props.lease.id
        )
      );
    });
  };

  const formatTemplate = (templates, app, lease_id) => {
    const newTemplate = [];
    templates.map(item => {
      if (item.user_reference === "lessor") {
        newTemplate.push({
          lease_id,
          title: item.title,
          content: item.content
            .replace(/lessor/g, `${app.user.first_name} ${app.user.last_name}`)
            .replace(/lesser/g, getPropOwnerDetails(app)),
          user_reference: item.user_reference
        });
      }
      return null;
    });
    return newTemplate;
  };

  const getPropOwnerDetails = application => {
    if (application.unit.property.property_owner) {
      return `${application.unit.property.property_owner.user.first_name} ${application.unit.property.property_owner.user.last_name}`;
    }
    return `${application.unit.property.property_creator.first_name} ${application.unit.property.property_creator.last_name}`;
  };

  const addClause = () => {
    setTemplates([
      ...leaseTemplates,
      { user_reference: "lessor", lease_id: leaseId }
    ]);
  };
  const onChange = (id, e) => {
    const newList = leaseTemplates.map((item, ind) => {
      let ret = item;
      if (id === ind) {
        ret = {
          ...ret,
          [e.target.name]: e.target.value
        };
      }
      return ret;
    });
    setTemplates(newList);
  };

  const removeClause = id => {
    setTemplates(leaseTemplates.filter((_, ind) => id !== ind));
  };

  const Submit = e => {
    e.preventDefault();
    setLoading(true);
    axiosHandler("post", LEASE_TEMPLATE_URL, getToken(), leaseTemplates).then(
      res => {
        Notification.bubble({
          type: "success",
          content: "Covenant updated successfully"
        });
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

  if (!props.lease.id) {
    return <div />;
  }

  return (
    <div className="lease-card covenant">
      <h3>Tenant Covenants</h3>
      {props.mode === 1 &&
        (leaseTemplates.length < 1 ? (
          <p>No Tenant Covenant defined</p>
        ) : (
          leaseTemplates.map((item, id) => (
            <p key={id} className="conv-item">
              <span className="main">{item.title}: </span>
              {item.content}
            </p>
          ))
        ))}
      <form onSubmit={Submit}>
        {props.mode === 0 &&
          leaseTemplates.map((item, id) => (
            <div key={id} className="conv-input_con">
              <div className="remove" onClick={() => removeClause(id)}>
                remove
              </div>
              <input
                type="text"
                name="title"
                value={item.title}
                placeholder="clause"
                onChange={e => onChange(id, e)}
                maxLength={15}
                required
              />
              :
              <textarea
                value={item.content}
                placeholder="context"
                onChange={e => onChange(id, e)}
                name="content"
                maxLength={300}
                required
              />
            </div>
          ))}
        <div className="flex align-center justify-between">
          {props.mode === 0 && (
            <Button
              onClick={addClause}
              color="default"
              className="clause-button"
            >
              Add Clause
            </Button>
          )}
          {props.mode === 0 && leaseTemplates.length > 0 && (
            <Button
              type="submit"
              color="primary"
              loading={loading}
              disabled={loading}
            >
              Update Covenant
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TenantConv;
