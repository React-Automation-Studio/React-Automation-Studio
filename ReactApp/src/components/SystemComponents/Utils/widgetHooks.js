import React, { useState } from "react";
import ContextMenu from "../ContextMenu";

const useContextMenu = (pvs, readOnly, disableProbe) => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const [contextPVs, setContextPVs] = useState([]);

  let contextMenu;
  if (openContextMenu) {
    contextMenu = (
      <ContextMenu
        disableProbe={disableProbe}
        open={openContextMenu}
        pvs={contextPVs}
        handleClose={() => setOpenContextMenu(false)}
        anchorReference="anchorPosition"
        anchorPosition={{ top: yPos, left: xPos }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        probeType={readOnly ? "readOnly" : undefined}
      />
    );
  }

  const getContextPVs = (pvs) => {
    let newContextPVs = [];
    pvs.forEach((item) => newContextPVs.push(...item.PVs));
    return newContextPVs;
  };

  const handleToggleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setXPos(event.clientX - 2);
    setYPos(event.clientY - 4);
    setOpenContextMenu(!openContextMenu);
    setContextPVs(getContextPVs(pvs));
  };

  return [contextMenu, handleToggleContextMenu];
};

export { useContextMenu };
