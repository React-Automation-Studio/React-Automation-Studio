import React from "react";
import SideBar from "../../../components/SystemComponents/SideBar";
import BitIndicators from "../../../components/BaseComponents/BitIndicators";
const Example3 = () => {
  return (
    <React.Fragment>
      <SideBar />
      <div> Hello World</div>
      <BitIndicators
        bitLabelPlacement="end"
        label="Bits"
        labelPlacement="top"
        macros={{
          "$(device)": "testIOC",
          "$(id)": "2",
        }}
        pv="$(device):test$(id)"
        onColor="yellow"
        offColor="purple"
      />
    </React.Fragment>
  );
};

export default Example3;
