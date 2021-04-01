import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useAllUsers from './adminDbHooks/useAllUsers'
import useUAGs from './adminDbHooks/useUAGs'

import Grid from '@material-ui/core/Grid';


import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import useDeleteUser from './adminDbHooks/useDeleteUser';
import useEnableUser from './adminDbHooks/useEnableUser';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const UagRename = (props) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [newName, setNewName] = useState(props.usergroup);
  const allNames = props.allUserGroups;
  const validateUagName = useCallback((name, allNames) => {
    const letterNumber = /^[0-9a-zA-Z_]+$/;
    if ((name.length > 0) && (!allNames.includes(name)) && (name.match(letterNumber))) {

      return true
    }
    else {
      return false
    }
  })
  useEffect(() => {
    setError(validateUagName(newName, allNames) === false)

  }, [newName, allNames])

  return (

    <React.Fragment>
      <IconButton onClick={() => setShow(true)}>
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

              const value = event.target.value

              setNewName(value.toUpperCase())
            }}
            error={error}
          />
        </DialogContent>
        <DialogActions>

          <Button
            disabled={error === true}
            onClick={() => {
              props.updateUagNames(newName)
              setShow(false)

            }}
            color="primary">
            Save
          </Button>
          <Button
            onClick={() => setShow(false)}
            color="primary"
          >
            Cancel
                        </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

const UagDelete = (props) => {
  const [show, setShow] = useState(false);
  return (

    <React.Fragment>
      <IconButton onClick={() => setShow(true)}>
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
           {"Are you sure you want to delete UAG: "+props.usergroup}
         </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button
            
            onClick={() => {
              props.deleteUAG(props.usergroup)
              setShow(false)

            }}
            color="primary">
           Yes
          </Button>
          <Button
            onClick={() => setShow(false)}
            color="primary"
          >
            No
                        </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}


const AccessControl = (props) => {
  const [nonEditableUserGroups] = useState(["ADMIN", "DEFAULT"])
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
        new RegExp(pattern)
        // setEditModeError(false)
        return true;
      }
      else {
        return false;
      }
    }

    catch (e) {

      return false;

    }

  }, [])
  const validateUsername = useCallback((username) => {
    if (username.length > 0) {
      return true;

    }
    else {
      return false;
    }

  }, [])
  const validateRole = useCallback((role) => {
    if (role.length > 0) {
      return true;

    }
    else {
      return false;
    }

  }, [])
  const classes = useStyles();
  const allUsers = useAllUsers(
    {
      dbURL: 'mongodb://ADMIN_DATABASE:rasAdminDb:users:Parameters:""'
    });
  const { data: users, writeAccess: usersWriteAccess, initialized: usersInitialized } = allUsers;
  const { userGroups, writeAccess: uagsWriteAccess, initialized: uagsInitialized, updateUAGs, updateUAGsError, updateUAGsOk: saveOk } = useUAGs({});
  console.log("saveOk", saveOk, "safeOkLatched", saveOkLatched)
  useEffect(() => {


    setSaveOkLatched(saveOk)

  }, [saveOk])
  const [modifiedUserGroups, setModifiedUserGroups] = useState({});
  useEffect(() => {
    if (editMode === false) {

      const newUserGroups = JSON.parse(JSON.stringify(userGroups));
      setModifiedUserGroups(newUserGroups)
    }
    else if (clear === true) {
      setSave(false)
      setEditMode(false)
      setClear(false)
    }
    else if (save === true) {
      updateUAGs({ UAGs: modifiedUserGroups })
      setSave(false)
    }
    else if (saveOkLatched === true) {
      setEditMode(false)
      setSaveOkLatched(false)
      setSave(false)
      setClear(false)
    }


  }, [userGroups, editMode, save, clear, saveOkLatched])

  let userGroupKeys = uagsInitialized ? Object.keys(modifiedUserGroups) : [];
  let usergroup = uagsInitialized ? userGroupKeys[tabValue] : undefined;
  //console.log("users", users, usersWriteAccess, usersInitialized)
  console.log("userGroups", userGroups)
  console.log("modifiedUserGroups", modifiedUserGroups)
  useEffect(() => {
    const newErrors = [];
    if (modifiedUserGroups) {
      const modifiedUserGroupsKeys = Object.keys(modifiedUserGroups)
      modifiedUserGroupsKeys.forEach(usergroup => {
        const rules = modifiedUserGroups[usergroup].rules;
        rules.forEach((item, index) => {

          if (validateRegex(item.rule) === false) {
            const ErrorId = "UAG: " + usergroup + ":Rules:" + index + ": RegEx Error";
            newErrors.push(ErrorId)
          }

        })
        const usernames = modifiedUserGroups[usergroup].usernames;
        usernames.forEach((item, index) => {

          if (validateUsername(item) === false) {
            const ErrorId = "UAG: " + usergroup + ":Username:" + index + ": Invalid";
            newErrors.push(ErrorId)
          }

        })
        const roles = modifiedUserGroups[usergroup].roles;
        if (roles) {
          roles.forEach((item, index) => {

            if (validateRole(item) === false) {
              const ErrorId = "UAG: " + usergroup + ":Role:" + index + ": Invalid";
              newErrors.push(ErrorId)
            }

          })
        }
      });
    }

    setEditModeErrors(newErrors)
  }, [modifiedUserGroups])

  return (
    <div >

      <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
        <Dialog
          open={showDiscardChanges}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-Login-title2"
          aria-describedby="alert-Login-slide-description2"
        >
          <DialogTitle id="alert-Login-title2">
            {"Caution!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-Login-slide-description2">
              {"Are you sure you want to discard all changes?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setClear(true)
              setShowDiscardChanges(false)
            }}
              color="primary">
              Yes
          </Button>
            <Button onClick={() => setShowDiscardChanges(false)} color="primary">
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
          <DialogTitle id="alert-Login-title2">
            {"Caution!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-Login-slide-description2">
              {"Are you sure you want to committ all changes?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setSave(true)
              setShowSaveChanges(false)
            }}
              color="primary">
              Yes
          </Button>
            <Button onClick={() => setShowSaveChanges(false)} color="primary">
              No
          </Button>
          </DialogActions>
        </Dialog>
        {uagsInitialized &&
          <div style={{ paddingTop: 16 }}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}

            >
              <Grid item lg={2}></Grid>
              <Grid item lg={6} style={{ textAlign: 'right' }}>

                {editMode === false && <IconButton onClick={() => setEditMode(true)}>
                  <EditIcon />
                </IconButton>}
                {editMode === true && <IconButton onClick={() => setModifiedUserGroups(prev => {
                  const newUserGroups = { ...prev }
                  const newUserGroupsKeys = Object.keys(newUserGroups)
                  let newName = "NEW"
                  let index = 1;
                  if (newUserGroupsKeys.includes(newName)) {
                    newName = "NEW" + index;
                    while (newUserGroupsKeys.includes(newName)) {
                      index++;
                      newName = "NEW" + index;
                    }

                  }
                  newUserGroups[newName] =
                  {
                    "usernames": [],
                    "roles": [],
                    "rules": []
                  }
                  return newUserGroups

                })
               } >
                  <AddIcon />
                </IconButton>}
                {editMode === true && <IconButton disabled={
                editModeErrors.length > 0
              }
                onClick={() => setShowSaveChanges(true)}>
                <SaveIcon />
              </IconButton>}
              {editMode === true && <IconButton onClick={() => setShowDiscardChanges(true)}>
                <ClearIcon />
              </IconButton>}

            </Grid>
            <Grid item lg={4}></Grid>
            <Grid item lg={2}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={(event, value) => setTabValue(value)}
                aria-label="Vertical tabs example"
              //  className={classes.tabs}
              >
                {userGroupKeys.map((usergroup, index) => (
                  <Tab label={usergroup} key={index.toString()} />


                ))
                }

              </Tabs>
            </Grid>
            <Grid item lg={6}>

              <Card key={tabValue} style={{ maxHeight: "80vh", overflowY: "scroll", marginBottom: 16, marginRight: 16, marginLeft: 16 }}>
                <Grid
                  style={{ marginTop: 0, paddingRight: 8, paddingLeft: 8, paddingBottom: 8, paddingTop: 0 }}
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >

                  <Grid item lg={12} >



                    <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                      <TableHead>

                        <TableRow>

                          <TableCell colSpan={1} align="left">UAG</TableCell>
                          <TableCell colSpan={1} align="right">{
                          (editMode === true && (!nonEditableUserGroups.includes(usergroup))) && 
                       
                            <UagDelete 
                            usergroup={usergroup}
                            deleteUAG={
                              (usergroupToDelete)=>{setModifiedUserGroups(prev => {
                                const newUserGroups = { ...prev}
                                delete newUserGroups[usergroupToDelete]
    
                             
                              const newUserGroupsKeys=Object.keys(newUserGroups);
                              if (tabValue===newUserGroupsKeys.length){
                                if (tabValue>1){
                                  setTabValue(prev=>prev-1)
                                }
                                else{
                                  setTabValue(0)
                                }
                              }
                              return newUserGroups
                            })
                              
                              
                            }}
                            />}
                          </TableCell>

                        </TableRow>


                      </TableHead>
                      <TableBody>

                        <TableRow>



                          <TableCell colSpan={2} align="left">
                            {usergroup}


                            {(editMode === true && (!nonEditableUserGroups.includes(usergroup))) && <UagRename
                              usergroup={usergroup}
                              allUserGroups={userGroupKeys}
                              updateUagNames={(newName) => {
                                setModifiedUserGroups(prev => {
                                  const prevUsergroup = { ...prev[usergroup] }

                                  const newUserGroups = { ...prev, [newName]: prevUsergroup }
                                  delete newUserGroups[usergroup]

                                  return newUserGroups
                                })
                              }
                              }
                            />}


                          </TableCell>


                        </TableRow>
                      </TableBody>
                    </Table>

                  </Grid>
                  <Grid item lg={12} >



                    <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                      <TableHead>

                        <TableRow>

                          <TableCell colSpan={1} align="left">Roles</TableCell>
                          <TableCell colSpan={1} align="right">
                            {editMode === true && <IconButton onClick={() =>
                              setModifiedUserGroups(prev => {
                                const newUserGroups = { ...prev }
                                if (newUserGroups[usergroup].roles) {
                                  newUserGroups[usergroup].roles.push("")
                                } else {
                                  newUserGroups[usergroup].roles = []
                                  newUserGroups[usergroup].roles.push("")
                                }

                                return newUserGroups
                              }
                              )
                            }>
                              <AddIcon />
                            </IconButton>}

                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Index</TableCell>
                          <TableCell align="center">Role</TableCell>

                        </TableRow>

                      </TableHead>
                      <TableBody>
                        {modifiedUserGroups[usergroup].roles?.map((role, index) =>
                          <TableRow>

                            <TableCell align="center">
                              {index}

                            </TableCell>

                            <TableCell align="center">
                            <div style={{display:"flex",direction:"row"}}>
                              <TextField
                                value={role}
                                fullWidth
                                disabled={editMode === false}
                                onChange={(event) => {

                                  const value = event.target.value

                                  setModifiedUserGroups(prev => {
                                    const newUserGroups = { ...prev }
                                    newUserGroups[usergroup].roles[index] = value
                                    return newUserGroups
                                  })
                                }}
                                error={validateRole(role) === false}
                              />
                              {editMode === true && <IconButton onClick={() =>
                                setModifiedUserGroups(prev => {
                                  const newUserGroups = { ...prev }
                                  newUserGroups[usergroup].roles.splice(index, 1)
                                  return newUserGroups
                                }
                                )
                              }>
                                <DeleteIcon />
                              </IconButton>}

</div>
                            </TableCell>


                          </TableRow>)}
                      </TableBody>
                    </Table>

                  </Grid>
                  <Grid item lg={12} >



                    <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                      <TableHead>
                        <TableRow>

                          <TableCell colSpan={2} align="left">Rules</TableCell>
                          <TableCell colSpan={1} align="right">
                            {editMode === true && <IconButton onClick={() =>
                              setModifiedUserGroups(prev => {
                                const newUserGroups = { ...prev }
                                newUserGroups[usergroup].rules.push({ rule: "", read: false, write: false })
                                return newUserGroups
                              }
                              )
                            }>
                              <AddIcon />
                            </IconButton>}

                          </TableCell>

                        </TableRow>
                        <TableRow>

                          <TableCell align="center">RegEx</TableCell>
                          <TableCell align="center">Read Access</TableCell>
                          <TableCell align="center">Write Access</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {modifiedUserGroups[usergroup].rules?.map((rule, index) => {
                          const stringValue = rule.rule?.toString();

                          return (<TableRow>

                            <TableCell align="center">
                            <div style={{display:"flex",direction:"row"}}>
                              <TextField
                                fullWidth
                                value={stringValue}
                                disabled={editMode === false}
                                onChange={(event) => {

                                  const value = event.target.value

                                  setModifiedUserGroups(prev => {
                                    const newUserGroups = { ...prev }
                                    newUserGroups[usergroup].rules[index].rule = value
                                    return newUserGroups
                                  })
                                }}
                                error={validateRegex(stringValue) === false}
                              />
                              {editMode === true && <IconButton onClick={() =>
                                setModifiedUserGroups(prev => {
                                  const newUserGroups = { ...prev }
                                  newUserGroups[usergroup].rules.splice(index, 1)
                                  return newUserGroups
                                }
                                )
                              }>
                                <DeleteIcon />
                              </IconButton>}

</div>
                            </TableCell>
                            <TableCell align="center">
                              <Checkbox
                                checked={rule.read == true}
                                disabled={editMode === false}
                                onChange={(event) => {

                                  const checked = event.target.checked

                                  setModifiedUserGroups(prev => {
                                    const newUserGroups = { ...prev }
                                    newUserGroups[usergroup].rules[index].read = checked
                                    return newUserGroups
                                  })
                                }}

                              />
                            </TableCell>
                            <TableCell align="center">
                              <Checkbox
                                checked={rule.write == true}
                                disabled={editMode === false}
                                onChange={(event) => {

                                  const checked = event.target.checked

                                  setModifiedUserGroups(prev => {
                                    const newUserGroups = { ...prev }
                                    newUserGroups[usergroup].rules[index].write = checked
                                    return newUserGroups
                                  })
                                }}
                              />
                            </TableCell>
                          </TableRow>)
                        }
                        )}
                      </TableBody>
                    </Table>




                  </Grid>

                  <Grid item lg={12} >



                    <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                      <TableHead>
                        <TableRow>

                          <TableCell colSpan={1} align="left">Usernames</TableCell>
                          <TableCell colSpan={1} align="right">
                            {editMode === true && <IconButton onClick={() =>
                              setModifiedUserGroups(prev => {
                                const newUserGroups = { ...prev }
                                newUserGroups[usergroup].usernames.push("")
                                return newUserGroups
                              }
                              )
                            }>
                              <AddIcon />
                            </IconButton>}

                          </TableCell>


                        </TableRow>
                        <TableRow>

                          <TableCell align="center">Index</TableCell>
                          <TableCell align="center">Username</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {modifiedUserGroups[usergroup].usernames?.map((username, index) =>
                          <TableRow>

                            <TableCell align="center">
                              {index}

                            </TableCell>
                            <TableCell align="center">
                              <div style={{display:"flex",direction:"row"}}>
                              <TextField
                                fullWidth
                                value={username}
                                disabled={editMode === false}
                                onChange={(event) => {

                                  const value = event.target.value

                                  setModifiedUserGroups(prev => {
                                    const newUserGroups = { ...prev }
                                    newUserGroups[usergroup].usernames[index] = value
                                    return newUserGroups
                                  })
                                }}
                                error={validateUsername(username) === false}
                              />
                              {editMode === true && <IconButton onClick={() =>
                                setModifiedUserGroups(prev => {
                                  const newUserGroups = { ...prev }
                                  newUserGroups[usergroup].usernames.splice(index, 1)
                                  return newUserGroups
                                }
                                )
                              }>
                                <DeleteIcon />
                              </IconButton>}
                              </div>


                            </TableCell>
                          </TableRow>)}
                      </TableBody>
                    </Table>

                  </Grid>

                </Grid>

              </Card>
            </Grid>
            </Grid>








          </div>}


    </div>
    </div >




  );
}


AccessControl.propTypes = {

};

export default AccessControl;
//export default AccessControl;
