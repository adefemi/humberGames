import React, { useEffect, useState } from "react";
import { Select } from "../../components/select/Select";
import { axiosHandler } from "../../utils/axiosHandler";
import { UNIT_TYPE_LOOK_UP } from "../../utils/urls";

function UnitTypeModel(props) {
  const [unitTypeList, setUnitTypeList] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    axiosHandler("get", UNIT_TYPE_LOOK_UP).then(res => {
      let typeList = res.data.results.results.map(item => {
        return {
          title: item.title,
          value: item
        };
      });
      setUnitTypeList(typeList);
      setFetching(false);
    });
  }, []);
  return (
    <Select
      placeholder={fetching ? "Loading unit types" : "--select property type--"}
      name="unit_type_id"
      onChange={props.onChange}
      optionList={unitTypeList}
      required={props.required}
    />
  );
}

export default UnitTypeModel;
