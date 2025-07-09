/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import AutomationStudioContext from "../SystemComponents/AutomationStudioContext";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ViewList from "@mui/icons-material/ViewList";
import Typography from "@mui/material/Typography";
import Lock from "@mui/icons-material/Lock";
import { useTheme } from "@mui/material/styles";
import {
  Coffee,
  LanConnect,
  LanDisconnect,
  ContentCopy,
} from "mdi-material-ui/";

const ContextMenu = (props) => {
  const [menuSelectedIndex, setMenuSelectedIndex] = useState(0);
  const context = useContext(AutomationStudioContext);
  const theme = useTheme();

  const copyAllPvNamesClipboard = () => {
    let pvnames = "";
    for (let pv in props.pvs) {
      pvnames += props.pvs[pv].pvname.toString() + "\n";
    }
    navigator.clipboard.writeText(pvnames);
    props.handleClose();
  };

  const copyPvNameClipboard = () => {
    if (typeof navigator.clipboard !== "undefined") {
      navigator.clipboard.writeText(
        props.pvs[menuSelectedIndex].pvname
      );
    }
    props.handleClose();
  };

  const copyPvValueClipboard = () => {
    if (typeof navigator.clipboard !== "undefined") {
      navigator.clipboard.writeText(
        props.pvs[menuSelectedIndex].value
      );
    }
    props.handleClose();
  };

  const handleMenuItemSelect = (event, index) => {
    console.log("handleMenuItemSelect", index, props.pvs[index]);
    setMenuSelectedIndex(index);
  };

  const getListItems = (pvs) => {
    let listItems = [];

    let i = 0;
    for (i = 0; i < pvs.length; i++) {
      const index = i;
      let icon = "disconnected";
      if (pvs[i].initialized === true) {
        if (pvs[i].metadata) {
          if (pvs[i].metadata.write_access === false) {
            icon = "locked";
          } else {
            icon = "connected";
          }
        } else {
          icon = "connected";
        }
      } else {
        icon = "disconnected";
      }

      if (i < pvs.length - 1) {
        listItems.push(
          <MenuItem
            key={pvs[i].pvname.toString() + i}
            onClick={(event) => handleMenuItemSelect(event, index)}
            selected={index === menuSelectedIndex}
          >
            <ListItemIcon>
              <React.Fragment>
                {icon == "connected" && (
                  <LanConnect
                    style={{ color: theme.palette.primary.main }}
                  />
                )}
                {icon == "disconnected" && (
                  <LanDisconnect
                    style={{ color: theme.palette.error.main }}
                  />
                )}
                {icon == "locked" && (
                  <Lock
                    style={{ color: theme.palette.error.main }}
                  />
                )}
              </React.Fragment>
            </ListItemIcon>
            <Typography variant="inherit"> {pvs[i].pvname}</Typography>
            <Divider />
          </MenuItem>
        );
      } else {
        listItems.push(
          <MenuItem
            key={pvs[i].pvname.toString() + i}
            onClick={(event) => handleMenuItemSelect(event, index)}
            selected={index === menuSelectedIndex}
          >
            <ListItemIcon>
              <React.Fragment>
                {icon == "connected" && (
                  <LanConnect
                    style={{ color: theme.palette.primary.main }}
                  />
                )}
                {icon == "disconnected" && (
                  <LanDisconnect
                    style={{ color: theme.palette.error.main }}
                  />
                )}
                {icon == "locked" && (
                  <Lock
                    style={{ color: theme.palette.error.main }}
                  />
                )}
              </React.Fragment>
            </ListItemIcon>
            <Typography variant="inherit"> {pvs[i].pvname}</Typography>
          </MenuItem>
        );
      }
    }
    return listItems;
  };

  const openContextMenu = props.open;
  const pvs = props.pvs;
  const enableProbe =
    typeof props.disableProbe !== "undefined"
      ? false
      : context.enableProbe;
  let icon = "disconnected";

  if (pvs.length === 1) {
    if (pvs[0].initialized === true) {
      if (pvs[0].metadata) {
        if (pvs[0].metadata.write_access === false) {
          icon = "locked";
        } else {
          icon = "connected";
        }
      } else {
        icon = "connected";
      }
    } else {
      icon = "disconnected";
    }
  }

  return (
    <Popover
      open={openContextMenu}
      anchorEl={props.anchorEl}
      anchorOrigin={props.anchorOrigin}
      transformOrigin={props.transformOrigin}
      anchorReference={props.anchorReference}
      anchorPosition={props.anchorPosition}
    >
      <Paper>
        <ClickAwayListener onClickAway={props.handleClose}>
          <div>
            {pvs.length === 1 && (
              <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    <React.Fragment>
                      {icon == "connected" && (
                        <LanConnect
                          style={{
                            color: theme.palette.primary.main,
                          }}
                        />
                      )}
                      {icon == "disconnected" && (
                        <LanDisconnect
                          style={{
                            color: theme.palette.error.main,
                          }}
                        />
                      )}
                      {icon == "locked" && (
                        <Lock
                          style={{
                            color: theme.palette.error.main,
                          }}
                        />
                      )}
                    </React.Fragment>
                  </ListItemIcon>
                  <Typography variant="inherit"> {pvs[0].pvname}</Typography>
                </MenuItem>
                <Divider />
                {enableProbe && (
                  <MenuItem
                    onClick={props.handleClose}
                    component={Link}
                    to={{
                      pathname: "/Probe",
                      search: JSON.stringify({
                        pvname: pvs[0].pvname,
                        probeType: props.probeType,
                      }),
                      state: ["sdas"],
                      data: "hello2",
                    }}
                    target="_blank"
                  >
                    <ListItemIcon>
                      <Coffee />
                    </ListItemIcon>
                    <Typography variant="inherit">Probe</Typography>
                  </MenuItem>
                )}

                <Divider />
                {typeof navigator.clipboard !== "undefined" && (
                  <MenuItem onClick={copyPvNameClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">
                      Copy PV Name to Clipboard
                    </Typography>
                  </MenuItem>
                )}

                {typeof navigator.clipboard !== "undefined" && (
                  <MenuItem onClick={copyPvValueClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">
                      Copy PV Value to Clipboard
                    </Typography>
                  </MenuItem>
                )}
              </MenuList>
            )}

            {pvs.length > 1 && (
              <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    <ViewList />
                  </ListItemIcon>
                  <Typography variant="inherit">
                    {" "}
                    {"Process Variables"}
                  </Typography>
                </MenuItem>
                <Divider />
                {getListItems(pvs)}
                <Divider />

                {enableProbe && (
                  <MenuItem
                    onClick={props.handleClose}
                    component={Link}
                    to={{
                      pathname: "/Probe",
                      search: JSON.stringify({
                        pvname: pvs[menuSelectedIndex].pvname,
                        probeType: props.probeType,
                      }),
                      state: ["sdas"],
                      data: "hello2",
                    }}
                    target="_blank"
                  >
                    <ListItemIcon>
                      <Coffee />
                    </ListItemIcon>
                    <Typography variant="inherit">
                      Probe Selected PV
                    </Typography>
                  </MenuItem>
                )}
                <Divider />

                {typeof navigator.clipboard !== "undefined" && (
                  <MenuItem onClick={copyAllPvNamesClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">
                      Copy All PV Names to Clipboard
                    </Typography>
                  </MenuItem>
                )}

                {typeof navigator.clipboard !== "undefined" && (
                  <MenuItem onClick={copyPvNameClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">
                      Copy Selected PV Name to Clipboard
                    </Typography>
                  </MenuItem>
                )}

                {typeof navigator.clipboard !== "undefined" && (
                  <MenuItem onClick={copyPvValueClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">
                      Copy Selected PV Value to Clipboard
                    </Typography>
                  </MenuItem>
                )}
              </MenuList>
            )}
          </div>
        </ClickAwayListener>
      </Paper>
    </Popover>
  );
};

export default ContextMenu;
