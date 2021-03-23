import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useAllUsers from './adminDbHooks/useAllUsers'


import Grid from '@material-ui/core/Grid';


import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useDeleteUser from './adminDbHooks/useDeleteUser';
import useEnableUser from './adminDbHooks/useEnableUser';
const systemName = 'testIOC';




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



const AllUsers = (props) => {

  const classes = useStyles();
  const allUsers = useAllUsers(
    {
      dbURL: 'mongodb://ADMIN_DATABASE:rasAdminDb:users:Parameters:""'
    });
  const { data: users, writeAccess: usersWriteAccess, initialized: usersInitialized } = allUsers;
  const {deleteUser,deleteUserError} =useDeleteUser({});
  const {enableUser,enableUserError} =useEnableUser({});
  console.log(users, usersWriteAccess, usersInitialized)

  return (
    <React.Fragment>

      <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
        <Grid
          style={{ marginTop: 0, padding: 8 }}
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={0}
        >



          <Grid item xs={12} sm={12} md={12} lg={12} >

            <Card style={{maxHeight:"85vh",overflowY:"scroll"}}>

              <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Index</TableCell>
                    <TableCell align="center">Username</TableCell>
                    <TableCell align="center">UAGS</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Given Name</TableCell>
                    <TableCell align="center">Family Name</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                    <TableCell align="center">Office Location</TableCell>
                    <TableCell align="center">Password Last Updated On</TableCell>
                    <TableCell align="center">Account Enabled</TableCell>
                    <TableCell align="center">Manage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersInitialized && <React.Fragment>
                    {users.map((user, index) => (
                      <TableRow key={index.toString()}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">
                          {/* {this.getUAGs(userGroups,user.username)} */}
                        </TableCell>
                        <TableCell align="center">{user.email ? user.email : ""}</TableCell>
                        <TableCell align="center">{user.givenName ? user.givenName : ""}</TableCell>
                        <TableCell align="center">{user.familyName ? user.familyName : ""}</TableCell>
                        <TableCell align="center">{user.phoneNumber ? user.phoneNumber : ""}</TableCell>
                        <TableCell align="center">{user.officeLocation ? user.phoneLocation : ""}</TableCell>
                        <TableCell align="center">{user.pwTimestamp ? user.pwTimeStamp : ""}</TableCell>

                        <TableCell align="center">
                        <Checkbox
                           checked={user.enabled?user.enabled:false}

                    onChange={(event)=>enableUser({id:user['_id']['$oid'],enabled:event.target.checked})}
       
       
      />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={()=>{
                           
                            deleteUser({id:user['_id']['$oid']})}}>
                            <DeleteIcon/>
                          </IconButton>

                        </TableCell>
                        {/* <TableCell align="center">{this.getDateTime(user.timestamp)}</TableCell> */}
                      </TableRow>
                    )
                    )
                    }
                  </React.Fragment>}
                </TableBody>
              </Table>
            </Card>



          </Grid>

        </Grid>




      </div>
    </React.Fragment>




  );
}


AllUsers.propTypes = {

};

export default AllUsers;
//export default AllUsers;
