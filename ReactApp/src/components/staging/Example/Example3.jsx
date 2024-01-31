import React from "react";
import SideBar from "../../../components/SystemComponents/SideBar";
import TextInput from "../../../components/BaseComponents/TextInput";
const Example3 = () => {
  return (
    <React.Fragment>
      <SideBar />
      <div> Hello World</div>
      <TextInput
        pv="$(device):amplitude"
        macros={{ "$(device)": "testIOC" }}
        usePvLabel={true}
        // prec={3}
        alarmSensitive={true}
        // debug
        // useStringValue
      />
    </React.Fragment>
  );
};

export default Example3;
