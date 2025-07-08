import React, { useState } from 'react';
import useAllUsers from './adminDbHooks/useAllUsers'
import useUAGs from './adminDbHooks/useUAGs'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import useDeleteUser from './adminDbHooks/useDeleteUser';
import useEnableUser from './adminDbHooks/useEnableUser';
import AddUsers from './AddUsers'
import ModifyUser from './ModifyUser'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AllUsers = (props) => {
  const allUsers = useAllUsers(
    {
      dbURL: 'mongodb://ADMIN_DATABASE:rasAdminDb:users:Parameters:""'
    });
  // eslint-disable-next-line no-unused-vars  
  const { data: users, writeAccess: usersWriteAccess, initialized: usersInitialized } = allUsers;
  // eslint-disable-next-line no-unused-vars
  const { userGroups, writeAccess: uagsWriteAccess, initialized: uagsInitialized } = useUAGs({});
  // eslint-disable-next-line no-unused-vars
  const {deleteUser,deleteUserError} =useDeleteUser({});
  // eslint-disable-next-line no-unused-vars
  const {enableUser,enableUserError} =useEnableUser({});
  // eslint-disable-next-line no-unused-vars
  const [currentUserId,setCurrentUserId]=useState(null);
  const [currentUser,setCurrentUser]=useState(null);
  const [showDeleteUserDialog,setShowDeleteUserDialog]=useState(false);
  const getUserUags=(username,userGroups)=>{
    let uags=[]
    if (userGroups){
      let uag;
    for (uag in userGroups){
      if (userGroups[uag].usernames.includes(username)||userGroups[uag].usernames.includes('*')){
        uags.push(uag)
      }
    }
    return uags.toString();
    }
    else{
      return ""
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={showDeleteUserDialog}
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
           {"Are you sure you want to delete the user: "+currentUser+" ?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{ 
            deleteUser(currentUserId)
            setShowDeleteUserDialog(false)}}
            color="primary">
            Yes
          </Button>
          <Button onClick={() => setShowDeleteUserDialog(false)} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
        <Grid
          style={{ marginTop: 0, padding: 8 }}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={0}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} >
            <Card style={{maxHeight:"85vh",overflowY:"scroll"}}>
              <Table stickyHeader size="small" aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={11} align="right"><AddUsers/></TableCell>
                  </TableRow>
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
                    {users.map((user, index) => {
                      let date;
                      if (user.pwTimestamp){
                      date = (new Date(user.pwTimestamp * 1000)).toLocaleString();
                      }
                      else{
                        date=""
                      }
                      return (
                        <TableRow key={index.toString()}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{user.username}</TableCell>
                          <TableCell align="center">
                            {getUserUags(user.username,userGroups)}
                          </TableCell>
                          <TableCell align="center">{user.email ? user.email : ""}</TableCell>
                          <TableCell align="center">{user.givenName ? user.givenName : ""}</TableCell>
                          <TableCell align="center">{user.familyName ? user.familyName : ""}</TableCell>
                          <TableCell align="center">{user.phoneNumber ? user.phoneNumber : ""}</TableCell>
                          <TableCell align="center">{user.officeLocation ? user.officeLocation : ""}</TableCell>
                          <TableCell align="center">{date}</TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={user.enabled?user.enabled:false}
                              onChange={(event)=>enableUser({id:user['_id']['$oid'],enabled:event.target.checked})}/>
                          </TableCell>
                          <TableCell align="center">
                            <ModifyUser user={user}/>
                            <IconButton
                              aria-label="delete"
                              onClick={()=>{
                                setCurrentUser(user.username)
                                setCurrentUserId({id:user['_id']['$oid']})
                                setShowDeleteUserDialog(true)}}
                              size="large">
                              <DeleteIcon/>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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

export default AllUsers;
