import React, { useCallback, useEffect, useState } from "react";

import useUAGs from "./adminDbHooks/useUAGs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ArrowUp, ArrowDown } from "mdi-material-ui/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UagRename = (props) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [newName, setNewName] = useState(props.usergroup);
  const allNames = props.allUserGroups;
  const validateUagName = useCallback((name, allNames) => {
    const letterNumber = /^[0-9a-zA-Z_]+$/;
    if (
      name.length > 0 &&
      !allNames.includes(name) &&
      name.match(letterNumber)
    ) {
      return true;
    } else {
      return false;
    }
  }, []);
  useEffect(() => {
    setError(validateUagName(newName, allNames) === false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newName, allNames]);

  return (
    <React.Fragment>
      <IconButton onClick={() => setShow(true)} size="large">
        <EditIcon />
      </IconButton>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-Login-title2"
        aria-describedby="alert-Login-slide-description2"
      >
        <DialogTitle id="alert-Login-title2">
          {"Rename UAG: " + props.usergroup}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={newName}
            onChange={(event) => {
              const value = event.target.value;

              setNewName(value.toUpperCase());
            }}
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={error === true}
            onClick={() => {
              props.updateUagNames(newName);
              setShow(false);
            }}
            color="primary"
          >
            Save
          </Button>
          <Button onClick={() => setShow(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const UagDelete = (props) => {
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <IconButton onClick={() => setShow(true)} size="large">
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-Login-title2"
        aria-describedby="alert-Login-slide-description2"
      >
        <DialogTitle id="alert-Login-title2">
          {"Delete UAG: " + props.usergroup}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Are you sure you want to delete UAG: " + props.usergroup}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.deleteUAG(props.usergroup);
              setShow(false);
            }}
            color="primary"
          >
            Yes
          </Button>
          <Button onClick={() => setShow(false)} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const AccessControl = (props) => {
  const [showRolesHelp, setShowRolesHelp] = useState(false);
  const [showRulesHelp, setShowRulesHelp] = useState(false);
  const [showUagHelp, setShowUagHelp] = useState(false);
  const [rolesHelpAnchorEl, setRolesHelpAnchorEl] = React.useState(null);
  const [rulesHelpAnchorEl, setRulesHelpAnchorEl] = React.useState(null);
  const [uagHelpAnchorEl, setUagHelpAnchorEl] = React.useState(null);
  const [nonEditableUserGroups] = useState(["ADMIN", "DEFAULT"]);
  const [editMode, setEditMode] = useState(false);
  const [editModeErrors, setEditModeErrors] = useState(false);
  const [save, setSave] = useState(false);
  const [saveOkLatched, setSaveOkLatched] = useState(false);
  const [showDiscardChanges, setShowDiscardChanges] = useState(false);
  const [showSaveChanges, setShowSaveChanges] = useState(false);
  const [clear, setClear] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const validateRegex = useCallback((pattern) => {
    try {
      if (pattern.length > 0) {
        new RegExp(pattern);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }, []);

  const validateUsername = useCallback((username) => {
    if (username.length > 0) {
      return true;
    } else {
      return false;
    }
  }, []);

  const validateRole = useCallback((role) => {
    if (role.length > 0) {
      return true;
    } else {
      return false;
    }
  }, []);

  const {
    userGroups,
    initialized: uagsInitialized,
    updateUAGs,
    updateUAGsOk: saveOk,
  } = useUAGs({});
  useEffect(() => {
    setSaveOkLatched(saveOk);
  }, [saveOk]);

  const [modifiedUserGroups, setModifiedUserGroups] = useState({});

  useEffect(() => {
    if (uagsInitialized) {
      if (editMode === false) {
        const newUserGroups = JSON.parse(JSON.stringify(userGroups));

        setModifiedUserGroups(newUserGroups);
      } else if (clear === true) {
        setSave(false);
        setEditMode(false);
        setClear(false);
      } else if (save === true) {
        updateUAGs({ UAGs: modifiedUserGroups });
        setSave(false);
      } else if (saveOkLatched === true) {
        setEditMode(false);
        setSaveOkLatched(false);
        setSave(false);
        setClear(false);
      }
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [uagsInitialized, userGroups, editMode, save, clear, saveOkLatched]);
  let userGroupKeys = uagsInitialized ? Object.keys(modifiedUserGroups) : [];
  let usergroup = uagsInitialized
    ? userGroupKeys[tabValue]
      ? userGroupKeys[tabValue]
      : undefined
    : undefined;

  useEffect(() => {
    const newErrors = [];
    if (modifiedUserGroups) {
      const modifiedUserGroupsKeys = Object.keys(modifiedUserGroups);
      modifiedUserGroupsKeys.forEach((usergroup) => {
        const rules = modifiedUserGroups[usergroup].rules;
        rules.forEach((item, index) => {
          if (validateRegex(item.rule) === false) {
            const ErrorId =
              "UAG: " + usergroup + ":Rules:" + index + ": RegEx Error";
            newErrors.push(ErrorId);
          }
        });
        const usernames = modifiedUserGroups[usergroup].usernames;
        usernames.forEach((item, index) => {
          if (validateUsername(item) === false) {
            const ErrorId =
              "UAG: " + usergroup + ":Username:" + index + ": Invalid";
            newErrors.push(ErrorId);
          }
        });
        const roles = modifiedUserGroups[usergroup].roles;
        if (roles) {
          roles.forEach((item, index) => {
            if (validateRole(item) === false) {
              const ErrorId =
                "UAG: " + usergroup + ":Role:" + index + ": Invalid";
              newErrors.push(ErrorId);
            }
          });
        }
      });
    }

    setEditModeErrors(newErrors);
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [modifiedUserGroups]);

  return (
    <div>
      <Popover
        anchorEl={uagHelpAnchorEl}
        open={showUagHelp}
        onClose={() => {
          setShowUagHelp(false);
          setUagHelpAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          p={4}
          style={{
            maxWidth: 600,
            maxHeight: 800,
            overflowY: "scroll",
            textAlign: "justify",
          }}
        >
          <Typography variant="body2" component="div">
            Access rights can be controlled by the User Access Groups (UAGS).
            Access is controlled through rules by defining PV access using
            regular expressions in the same way that the EPICS Gateway access is
            defined
            <br />
            <br />
            The order in which the UAGs and rules are defined are important.
            <br />
            <br />
            The first UAG rule with the lowest priority applied is the DEFAULT
            UAG, all users will get this. The final access group rules to be
            applied are the ADMIN. ADMIN has the highest priority and rules
            defined in previous UAGs will overridden. All other UAG rules are
            applied from top to bottom as displayed on the tab. You can change
            the order of any of the groups except the DEFAULT and ADMIN.
            <br />
            <br />
            For example in the DEFAULT UAG, the rules disable write access and
            enable read access for all process variables and usernames because
            the username is set to: *
            <br />
            <br />
            And the ADMIN UAG, the rules enable write access and read access for
            all the admin usernames.
            <br />
            <br />
            In the pvServer, the read and write access of the rules in the UAG
            are applied if the username is defined in the UAG and the following
            match function is satisfied:
            <br />
            <br />
            match=re.search(rule,pv)
            <br />
            <br />
            If the match is true, then the rule is applied.
            <br />
            <br />
            In theory, all regular expression searches allowed by Python regex
            can be used although this has not been tested. More examples are
            available at:
            <br />
            <a
              style={{ color: "inherit" }}
              href="https://www.w3schools.com/python/python_regex.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.w3schools.com/python/python_regex.asp
            </a>
            <br />
            <br />
            In the two examples below the ENGINEERS UAG, with roles as
            'engineers' and user name user1 get read and write access to every
            pv, whilst the OPERATORS UAG, with roles as operators and username
            operator1 only gets read access for all pvs and write access for the
            two setpoint pvs. In this way the same user interface can be used
            for different roles and the operators will have different rights to
            the engineers.
            {[
              {
                ENGINEERS: {
                  usernames: ["user1"],
                  roles: ["engineer"],
                  rules: [
                    { rule: "[0-9].*", read: true, write: true },
                    { rule: "[a-z].*", read: true, write: true },
                    { rule: "[A-Z].*", read: true, write: true },
                  ],
                },
              },
              {
                OPERATORS: {
                  usernames: ["operator1"],
                  roles: ["operator"],
                  rules: [
                    { rule: "[0-9].*", read: true, write: false },
                    { rule: "[a-z].*", read: true, write: false },
                    { rule: "[A-Z].*", read: true, write: false },
                    { rule: "System1:SetPoint", read: true, write: true },
                    { rule: "System2:Setpoint", read: true, write: true },
                  ],
                },
              },
            ].map((userGroups, index1) => {
              const userGroupKeys = Object.keys(userGroups);
              return userGroupKeys.map((usergroup, index2) => (
                <Grid
                  key={index1.toString() + ":" + index2.toString()}
                  style={{
                    marginTop: 0,
                    paddingRight: 8,
                    paddingLeft: 8,
                    paddingBottom: 8,
                    paddingTop: 0,
                  }}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      aria-label="sticky table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={1} align="left">
                            UAG
                          </TableCell>
                          <TableCell colSpan={1} align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={2} align="left">
                            {userGroupKeys[index2]}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      aria-label="sticky table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={1} align="left">
                            Roles
                          </TableCell>
                          <TableCell colSpan={1} align="right"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Index</TableCell>
                          <TableCell align="center">Role</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userGroups[usergroup].roles?.map((role, index) => (
                          <TableRow key={index.toString()}>
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">
                              <div
                                style={{ display: "flex", direction: "row" }}
                              >
                                <TextField
                                  value={role}
                                  fullWidth
                                  disabled={true}
                                  error={validateRole(role) === false}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      aria-label="sticky table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2} align="left">
                            Rules
                          </TableCell>
                          <TableCell colSpan={1} align="right"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">RegEx</TableCell>
                          <TableCell align="center">Read Access</TableCell>
                          <TableCell align="center">Write Access</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userGroups[usergroup].rules?.map((rule, index) => {
                          const stringValue = rule.rule?.toString();
                          return (
                            <TableRow key={index.toString()}>
                              <TableCell align="center">
                                <div
                                  style={{ display: "flex", direction: "row" }}
                                >
                                  <TextField
                                    fullWidth
                                    value={stringValue}
                                    disabled={true}
                                    error={validateRegex(stringValue) === false}
                                  />
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <Checkbox
                                  checked={rule.read === true}
                                  disabled={true}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Checkbox
                                  checked={rule.write === true}
                                  disabled={true}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      aria-label="sticky table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={1} align="left">
                            Usernames
                          </TableCell>
                          <TableCell colSpan={1} align="right"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Index</TableCell>
                          <TableCell align="center">Username</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userGroups[usergroup].usernames?.map(
                          (username, index) => (
                            <TableRow key={index.toString()}>
                              <TableCell align="center">{index}</TableCell>
                              <TableCell align="center">
                                <div
                                  style={{ display: "flex", direction: "row" }}
                                >
                                  <TextField
                                    fullWidth
                                    value={username}
                                    disabled={true}
                                    error={validateUsername(username) === false}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              ));
            })}
            See the styleguide for more examples.
          </Typography>
        </Box>
      </Popover>
      <Popover
        anchorEl={rolesHelpAnchorEl}
        open={showRolesHelp}
        onClose={() => {
          setShowRolesHelp(false);
          setRolesHelpAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          p={4}
          style={{ maxWidth: 600, overflowY: "scroll", textAlign: "justify" }}
        >
          <Typography variant="body2" component="div">
            Assign roles to a User Access Groups. This enables portions of your
            app to isolated from other users.
            <br />
            <br />
            For the ADMIN UAG, valid roles are 'admin' for normal admin
            permissions and 'alarmAdmin' for the AlarmHandler permissions.
            <br />
            <br />
            See the styleguide on how the protected routes components use the
            role and roles array prop to protect the route.
          </Typography>
        </Box>
      </Popover>
      <Popover
        anchorEl={rulesHelpAnchorEl}
        open={showRulesHelp}
        onClose={() => {
          setShowRulesHelp(false);
          setRulesHelpAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          p={4}
          style={{
            maxWidth: 600,
            maxHeight: 600,
            overflowY: "scroll",
            textAlign: "justify",
          }}
        >
          <Typography variant="body2" component="div">
            Access rights can be controlled through rules by defining PV access
            using regular expressions in the same way that the EPICS Gateway
            access is defined
            <br />
            <br />
            The order in which the user access groups and rules are defined are
            important.
            <br />
            <br />
            The first rule applied is the DEFAULT, all user will get this. The
            final access group rules to be applied are the ADMIN.
            <br />
            <br />
            For example in the DEFAULT UAG, the rules disable write access and
            enable read access for all usernames and process variables.
            <br />
            <br />
            And the ADMIN UAG, the rules enable write access and read access for
            all the admin usernames.
            <br />
            <br />
            In the pvServer, the read and write access of the rules in the UAG
            is applied if the username is defined in the UAG and the following
            match function is satisfied:
            <br />
            <br />
            match=re.search(rule,pv)
            <br />
            <br />
            If the match is true, then the rule is applied.
            <br />
            <br />
            In theory, all regular expression searches allowed by Python regex
            can be used although this has not been tested. More examples are
            available at:
            <br />
            <a
              style={{ color: "inherit" }}
              href="https://www.w3schools.com/python/python_regex.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.w3schools.com/python/python_regex.asp
            </a>
            <br />
            <br />
            Example RegEx rules:
            <br />
            <br />
          </Typography>
          <Table
            stickyHeader
            size="small"
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">RegEx</TableCell>
                <TableCell align="center">Read Access</TableCell>
                <TableCell align="center">Write Access</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { rule: "[0-9].*", read: true, write: false },
                { rule: "[a-z].*", read: true, write: false },
                { rule: "[A-Z].*", read: true, write: false },
                { rule: "^testIOC", read: true, write: false },
                { rule: "^testIOC:FC", read: true, write: true },
              ].map((rules, index) => (
                <TableRow key={index.toString()}>
                  <TableCell align="center">
                    <div style={{ display: "flex", direction: "row" }}>
                      <TextField fullWidth value={rules.rule} disabled={true} />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={rules.read === true} disabled={true} />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={rules.write === true} disabled={true} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          In the example above, the first, second, and third rule enables read
          access and disables write access for all PV names starting with
          integer, lowercase and uppercase letters respectively. The fourth rule
          enables read access and disables write access for all PV names
          starting with testIOC. The fifth rule enables read and write access
          for all PV names starting with testIOC:FC. This then implies that this
          UAG would able to control an write to all faraday cup pvs (FC) on the
          testIOC.
          <br />
          <br />
          <br />
          <br />
        </Box>
      </Popover>
      <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <Dialog
          open={showDiscardChanges}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-Login-title2"
          aria-describedby="alert-Login-slide-description2"
        >
          <DialogTitle id="alert-Login-title2">{"Caution!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-Login-slide-description2">
              {"Are you sure you want to discard all changes?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setClear(true);
                setShowDiscardChanges(false);
              }}
              color="primary"
            >
              Yes
            </Button>
            <Button
              onClick={() => setShowDiscardChanges(false)}
              color="primary"
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showSaveChanges}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-Login-title2"
          aria-describedby="alert-Login-slide-description2"
        >
          <DialogTitle id="alert-Login-title2">{"Caution!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-Login-slide-description2">
              {"Are you sure you want to committ all changes?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setSave(true);
                setShowSaveChanges(false);
              }}
              color="primary"
            >
              Yes
            </Button>
            <Button onClick={() => setShowSaveChanges(false)} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
        {uagsInitialized && (
          <div style={{ paddingTop: 16 }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item lg={2}></Grid>
              <Grid item lg={6} style={{ textAlign: "right" }}>
                {editMode === false && (
                  <IconButton onClick={() => setEditMode(true)} size="large">
                    <EditIcon />
                  </IconButton>
                )}
                {editMode === true && (
                  <IconButton
                    onClick={() =>
                      setModifiedUserGroups((prev) => {
                        const { DEFAULT, ADMIN, ...rest } = { ...prev };
                        const restKeys = Object.keys(rest);
                        let newName = "NEW";
                        let index = 1;
                        if (restKeys.includes(newName)) {
                          newName = "NEW" + index;
                          while (restKeys.includes(newName)) {
                            index++;
                            newName = "NEW" + index;
                          }
                        }
                        rest[newName] = {
                          usernames: [],
                          roles: [],
                          rules: [],
                        };
                        const newUserGroups = { DEFAULT, ...rest, ADMIN };
                        return newUserGroups;
                      })
                    }
                    size="large"
                  >
                    <AddIcon />
                  </IconButton>
                )}
                {editMode === true && (
                  <IconButton
                    disabled={editModeErrors.length > 0}
                    onClick={() => setShowSaveChanges(true)}
                    size="large"
                  >
                    <SaveIcon />
                  </IconButton>
                )}
                {editMode === true && (
                  <IconButton
                    onClick={() => setShowDiscardChanges(true)}
                    size="large"
                  >
                    <ClearIcon />
                  </IconButton>
                )}
                <IconButton
                  onClick={(event) => {
                    setUagHelpAnchorEl(event.currentTarget);
                    setShowUagHelp(true);
                  }}
                  size="large"
                >
                  <HelpIcon />
                </IconButton>
              </Grid>
              <Grid item lg={4}></Grid>
              <Grid item md={3} lg={2}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={tabValue}
                  onChange={(event, value) => setTabValue(value)}
                  aria-label="Vertical tabs example"
                >
                  {userGroupKeys.map((usergroup, index) => (
                    <Tab
                      label={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            verticalAlign: "middle",
                          }}
                        >
                          <div
                            style={{
                              flexGrow: 1,
                              minWidth: "100px",
                              margin: "auto",
                            }}
                          >
                            {" "}
                            {usergroup}
                          </div>
                          {editMode === true &&
                            !(
                              usergroup === "ADMIN" || usergroup === "DEFAULT"
                            ) && (
                              <div>
                                {index > 1 && (
                                  <IconButton
                                    onClick={() => {
                                      setModifiedUserGroups((prev) => {
                                        const { DEFAULT, ADMIN, ...rest } = {
                                          ...prev,
                                        };
                                        let restKeys = Object.keys(rest);
                                        const index =
                                          restKeys.indexOf(usergroup);
                                        if (index > 0) {
                                          var temp = restKeys[index - 1];
                                          restKeys[index - 1] = restKeys[index];
                                          restKeys[index] = temp;
                                        }
                                        const newUserGroups = {};
                                        newUserGroups["DEFAULT"] = DEFAULT;
                                        restKeys.forEach((key, index) => {
                                          newUserGroups[key] = rest[key];
                                        });
                                        newUserGroups["ADMIN"] = ADMIN;
                                        return newUserGroups;
                                      });
                                    }}
                                    style={{
                                      marginTop: 0,
                                      marginBottom: 0,
                                      position: "absolute",
                                      top: "50%",
                                      transform: "translate(0, -50%)",
                                    }}
                                    size="large"
                                  >
                                    <ArrowUp />
                                  </IconButton>
                                )}
                                {index < userGroupKeys.length - 2 && (
                                  <IconButton
                                    style={{
                                      marginTop: 0,
                                      marginBottom: 0,
                                      marginLeft: 24,
                                      position: "absolute",
                                      top: "50%",
                                      transform: "translate(0, -50%)",
                                    }}
                                    onClick={() => {
                                      setModifiedUserGroups((prev) => {
                                        const { DEFAULT, ADMIN, ...rest } = {
                                          ...prev,
                                        };
                                        let restKeys = Object.keys(rest);
                                        const index =
                                          restKeys.indexOf(usergroup);
                                        if (index < restKeys.length - 1) {
                                          var temp = restKeys[index + 1];
                                          restKeys[index + 1] = restKeys[index];
                                          restKeys[index] = temp;
                                        }
                                        const newUserGroups = {};
                                        newUserGroups["DEFAULT"] = DEFAULT;
                                        restKeys.forEach((key, index) => {
                                          newUserGroups[key] = rest[key];
                                        });
                                        newUserGroups["ADMIN"] = ADMIN;
                                        return newUserGroups;
                                      });
                                    }}
                                    size="large"
                                  >
                                    <ArrowDown />
                                  </IconButton>
                                )}
                              </div>
                            )}
                        </div>
                      }
                      key={index.toString()}
                      component={"div"}
                    ></Tab>
                  ))}
                </Tabs>
              </Grid>
              {usergroup !== undefined && (
                <Grid item md={5} lg={6}>
                  <Card
                    key={tabValue}
                    style={{
                      maxHeight: "80vh",
                      overflowY: "scroll",
                      marginBottom: 16,
                      marginRight: 16,
                      marginLeft: 16,
                    }}
                  >
                    <Grid
                      style={{
                        marginTop: 0,
                        paddingRight: 8,
                        paddingLeft: 8,
                        paddingBottom: 8,
                        paddingTop: 0,
                      }}
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Grid item lg={12}>
                        <Table
                          stickyHeader
                          size="small"
                          aria-label="sticky table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={1} align="left">
                                UAG
                              </TableCell>
                              <TableCell colSpan={1} align="right">
                                {editMode === true &&
                                  !nonEditableUserGroups.includes(
                                    usergroup
                                  ) && (
                                    <UagDelete
                                      usergroup={usergroup}
                                      deleteUAG={(usergroupToDelete) => {
                                        setModifiedUserGroups((prev) => {
                                          const newUserGroups = { ...prev };
                                          delete newUserGroups[
                                            usergroupToDelete
                                          ];
                                          const newUserGroupsKeys =
                                            Object.keys(newUserGroups);
                                          if (
                                            tabValue ===
                                            newUserGroupsKeys.length
                                          ) {
                                            if (tabValue > 1) {
                                              setTabValue((prev) => prev - 1);
                                            } else {
                                              setTabValue(0);
                                            }
                                          }
                                          return newUserGroups;
                                        });
                                      }}
                                    />
                                  )}
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={2} align="left">
                                {usergroup}
                                {editMode === true &&
                                  !nonEditableUserGroups.includes(
                                    usergroup
                                  ) && (
                                    <UagRename
                                      usergroup={usergroup}
                                      allUserGroups={userGroupKeys}
                                      updateUagNames={(newName) => {
                                        setModifiedUserGroups((prev) => {
                                          const prevUsergroups = { ...prev };
                                          const prevUsergroupKeys =
                                            Object.keys(prevUsergroups);
                                          // const keyIndex=prevUsergroupKeys.indexOf(usergroup)
                                          const newUserGroups = {};
                                          prevUsergroupKeys.forEach(
                                            (key, index) => {
                                              if (key === usergroup) {
                                                newUserGroups[newName] =
                                                  prevUsergroups[key];
                                              } else {
                                                newUserGroups[key] =
                                                  prevUsergroups[key];
                                              }
                                            }
                                          );
                                          return newUserGroups;
                                        });
                                      }}
                                    />
                                  )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item lg={12}>
                        <Table
                          stickyHeader
                          size="small"
                          aria-label="sticky table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={1} align="left">
                                Roles
                              </TableCell>
                              <TableCell colSpan={1} align="right">
                                <IconButton
                                  onClick={(event) => {
                                    setRolesHelpAnchorEl(event.currentTarget);
                                    setShowRolesHelp(true);
                                  }}
                                  size="large"
                                >
                                  <HelpIcon />
                                </IconButton>
                                {editMode === true && (
                                  <IconButton
                                    onClick={() =>
                                      setModifiedUserGroups((prev) => {
                                        const newUserGroups = { ...prev };
                                        if (newUserGroups[usergroup].roles) {
                                          newUserGroups[usergroup].roles.push(
                                            ""
                                          );
                                        } else {
                                          newUserGroups[usergroup].roles = [];
                                          newUserGroups[usergroup].roles.push(
                                            ""
                                          );
                                        }
                                        return newUserGroups;
                                      })
                                    }
                                    size="large"
                                  >
                                    <AddIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="center">Index</TableCell>
                              <TableCell align="center">Role</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {modifiedUserGroups[usergroup]?.roles?.map(
                              (role, index) => (
                                <TableRow key={index.toString()}>
                                  <TableCell align="center">{index}</TableCell>
                                  <TableCell align="center">
                                    <div
                                      style={{
                                        display: "flex",
                                        direction: "row",
                                      }}
                                    >
                                      <TextField
                                        value={role}
                                        fullWidth
                                        disabled={editMode === false}
                                        onChange={(event) => {
                                          const value = event.target.value;
                                          setModifiedUserGroups((prev) => {
                                            const newUserGroups = { ...prev };
                                            newUserGroups[usergroup].roles[
                                              index
                                            ] = value;
                                            return newUserGroups;
                                          });
                                        }}
                                        error={validateRole(role) === false}
                                      />
                                      {editMode === true && (
                                        <IconButton
                                          onClick={() =>
                                            setModifiedUserGroups((prev) => {
                                              const newUserGroups = { ...prev };
                                              newUserGroups[
                                                usergroup
                                              ].roles.splice(index, 1);
                                              return newUserGroups;
                                            })
                                          }
                                          size="large"
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item lg={12}>
                        <Table
                          stickyHeader
                          size="small"
                          aria-label="sticky table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={2} align="left">
                                Rules
                              </TableCell>
                              <TableCell colSpan={1} align="right">
                                <IconButton
                                  onClick={(event) => {
                                    setRulesHelpAnchorEl(event.currentTarget);
                                    setShowRulesHelp(true);
                                  }}
                                  size="large"
                                >
                                  <HelpIcon />
                                </IconButton>
                                {editMode === true && (
                                  <IconButton
                                    onClick={() =>
                                      setModifiedUserGroups((prev) => {
                                        const newUserGroups = { ...prev };
                                        newUserGroups[usergroup].rules.push({
                                          rule: "",
                                          read: false,
                                          write: false,
                                        });
                                        return newUserGroups;
                                      })
                                    }
                                    size="large"
                                  >
                                    <AddIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="center">RegEx</TableCell>
                              <TableCell align="center">Read Access</TableCell>
                              <TableCell align="center">Write Access</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {modifiedUserGroups[usergroup].rules?.map(
                              (rule, index) => {
                                const stringValue = rule.rule?.toString();
                                return (
                                  <TableRow key={index.toString()}>
                                    <TableCell align="center">
                                      <div
                                        style={{
                                          display: "flex",
                                          direction: "row",
                                        }}
                                      >
                                        <TextField
                                          fullWidth
                                          value={stringValue}
                                          disabled={editMode === false}
                                          onChange={(event) => {
                                            const value = event.target.value;

                                            setModifiedUserGroups((prev) => {
                                              const newUserGroups = { ...prev };
                                              newUserGroups[usergroup].rules[
                                                index
                                              ].rule = value;
                                              return newUserGroups;
                                            });
                                          }}
                                          error={
                                            validateRegex(stringValue) === false
                                          }
                                        />
                                        {editMode === true && (
                                          <IconButton
                                            onClick={() =>
                                              setModifiedUserGroups((prev) => {
                                                const newUserGroups = {
                                                  ...prev,
                                                };
                                                newUserGroups[
                                                  usergroup
                                                ].rules.splice(index, 1);
                                                return newUserGroups;
                                              })
                                            }
                                            size="large"
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        )}
                                      </div>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Checkbox
                                        checked={rule.read === true}
                                        disabled={editMode === false}
                                        onChange={(event) => {
                                          const checked = event.target.checked;

                                          setModifiedUserGroups((prev) => {
                                            const newUserGroups = { ...prev };
                                            newUserGroups[usergroup].rules[
                                              index
                                            ].read = checked;
                                            return newUserGroups;
                                          });
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <Checkbox
                                        checked={rule.write === true}
                                        disabled={editMode === false}
                                        onChange={(event) => {
                                          const checked = event.target.checked;

                                          setModifiedUserGroups((prev) => {
                                            const newUserGroups = { ...prev };
                                            newUserGroups[usergroup].rules[
                                              index
                                            ].write = checked;
                                            return newUserGroups;
                                          });
                                        }}
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item lg={12}>
                        <Table
                          stickyHeader
                          size="small"
                          aria-label="sticky table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={1} align="left">
                                Usernames
                              </TableCell>
                              <TableCell colSpan={1} align="right">
                                {editMode === true && (
                                  <IconButton
                                    onClick={() =>
                                      setModifiedUserGroups((prev) => {
                                        const newUserGroups = { ...prev };
                                        newUserGroups[usergroup].usernames.push(
                                          ""
                                        );
                                        return newUserGroups;
                                      })
                                    }
                                    size="large"
                                  >
                                    <AddIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="center">Index</TableCell>
                              <TableCell align="center">Username</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {modifiedUserGroups[usergroup].usernames?.map(
                              (username, index) => (
                                <TableRow key={index.toString()}>
                                  <TableCell align="center">{index}</TableCell>
                                  <TableCell align="center">
                                    <div
                                      style={{
                                        display: "flex",
                                        direction: "row",
                                      }}
                                    >
                                      <TextField
                                        fullWidth
                                        value={username}
                                        disabled={editMode === false}
                                        onChange={(event) => {
                                          const value = event.target.value;

                                          setModifiedUserGroups((prev) => {
                                            const newUserGroups = { ...prev };
                                            newUserGroups[usergroup].usernames[
                                              index
                                            ] = value;
                                            return newUserGroups;
                                          });
                                        }}
                                        error={
                                          validateUsername(username) === false
                                        }
                                      />
                                      {editMode === true && (
                                        <IconButton
                                          onClick={() =>
                                            setModifiedUserGroups((prev) => {
                                              const newUserGroups = { ...prev };
                                              newUserGroups[
                                                usergroup
                                              ].usernames.splice(index, 1);
                                              return newUserGroups;
                                            })
                                          }
                                          size="large"
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};


export default AccessControl;
