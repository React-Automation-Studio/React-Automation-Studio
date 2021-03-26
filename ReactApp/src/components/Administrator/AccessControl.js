import React, { useState } from 'react';
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



const AccessControl = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const allUsers = useAllUsers(
    {
      dbURL: 'mongodb://ADMIN_DATABASE:rasAdminDb:users:Parameters:""'
    });
  const { data: users, writeAccess: usersWriteAccess, initialized: usersInitialized } = allUsers;
  const { userGroups, writeAccess: uagsWriteAccess, initialized: uagsInitialized } = useUAGs({});
  let userGroupKeys = uagsInitialized ? Object.keys(userGroups) : [];
  let usergroup = uagsInitialized ? userGroupKeys[tabValue] : undefined;
  console.log("users", users, usersWriteAccess, usersInitialized)
  console.log("userGroups", userGroups, uagsWriteAccess, uagsWriteAccess)
  return (
    <React.Fragment>

      <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
        {uagsInitialized &&
          <React.Fragment>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}

            >
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
                <Card key={tabValue} style={{ maxHeight: "80vh", overflowY: "scroll", margin: 16 }}>
                  <Grid
                    style={{ marginTop: 0, padding: 8 }}
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

                            <TableCell colSpan={2} align="left">Roles</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">Index</TableCell>
                            <TableCell align="center">Role</TableCell>

                          </TableRow>

                        </TableHead>
                        <TableBody>
                        {userGroups[usergroup].roles?.map((role,index)=>
                          <TableRow>
                            
                            <TableCell align="center">
                             {index}

                              </TableCell>
                              <TableCell align="center">
                             {role}

                              </TableCell>
                            </TableRow>)}
                          </TableBody>
                        </Table>

                      </Grid>
                      <Grid item lg={12} >



                        <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                          <TableHead>
                            <TableRow>

                              <TableCell colSpan={3} align="left">Rules</TableCell>


                            </TableRow>
                            <TableRow>

                              <TableCell align="center">RegEx</TableCell>
                              <TableCell align="center">Read Access</TableCell>
                              <TableCell align="center">Write Access</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {userGroups[usergroup].rules?.map((rule, index) =>
                              <TableRow>

                                <TableCell align="center">{rule.rule?.toString()}</TableCell>
                                <TableCell align="center">
                                  <Checkbox checked={rule.read==true}/>
                                  </TableCell>
                                  <TableCell align="center">
                                  <Checkbox checked={rule.write==true}/>
                                  </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>




                      </Grid>

                      <Grid item lg={12} >



                        <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                          <TableHead>
                            <TableRow>

                              <TableCell colSpan={2} align="left">Usernames</TableCell>


                            </TableRow>
                            <TableRow>

                              <TableCell align="center">Index</TableCell>
                              <TableCell align="center">Username</TableCell>

                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {userGroups[usergroup].usernames?.map((username,index)=>
                          <TableRow>
                            
                            <TableCell align="center">
                             {index}

                              </TableCell>
                              <TableCell align="center">
                             {username}

                              </TableCell>
                            </TableRow>)}
                          </TableBody>
                        </Table>

                      </Grid>

                    </Grid>

                  </Card>
                </Grid>
              </Grid>
            







          </React.Fragment>}


      </div>
    </React.Fragment>




  );
}


AccessControl.propTypes = {

      };

export default AccessControl;
//export default AccessControl;
