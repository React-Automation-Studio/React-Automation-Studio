import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


import Grid from '@material-ui/core/Grid';



import SideBar from '../SystemComponents/SideBar';
import Settings from '../SystemComponents/Settings';
import AppBar from '@material-ui/core/AppBar';

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

import Toolbar from '@material-ui/core/Toolbar';

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
const systemName = 'testIOC';




const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



class AddUsers extends React.Component {
  constructor(props) {
    super(props);


    let database = this.props.database;
    let collection = this.props.collection;

    let dbListBroadcastReadUsersURL = 'mongodb://' + database + ':' + collection + ':' + 'users' + ':Parameters:""';

    this.state = {

      dbListBroadcastReadUsersURL: dbListBroadcastReadUsersURL,
      tabValue: 0,
      users: [],
      username: "",

      usernameHelperText: "Enter a username",
      usernameError: false,
      password: "",
      passwordHelperText: "Minimum length 12 characters",
      confirmPassword: "",
      email: "",
      giveName: "",
      familyName: "",
      phoneNumber: "",
      officeLocation: ""




    }

    this.handleNewDbUsersList = this.handleNewDbUsersList.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange = (name) => (event) => {
    console.log(name, event.target.value)
    this.setState({ [name]: event.target.value })


  }
  handleOnClickAddUser=()=>{
    // let socket = this.context.socket;
    // let jwt = JSON.parse(localStorage.getItem('jwt'));
    // if (jwt === null) {
    //   jwt = 'unauthenticated'
    // }
    // let newEntry = {
    //   '_id':this.state.username,
    //   username:this.state.username,
    //   password:this.state.password,
    //   email:this.state.email,
    //   giveName:this.state.giveName,
    //   familyName:this.state.familyName,
    //   phoneNumber:this.state.phoneNumber,
    //   officeLocation:this.state.officeLocation
    // };
    // socket.emit('databaseInsertOne', { dbURL: this.state.dbListInsertOneURL, 'newEntry': newEntry, 'clientAuthorisation': jwt }, (data) => {
    //   console.log("ackdata", data);
    //   if (data == "OK") {
    //     socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadUsersURL, 'clientAuthorisation': jwt }, (data) => {

    //       if (data !== "OK") {
    //         console.log("ackdata", data);
    //       }
    //     });
    //   } else {
    //     console.log("Save values unsuccessful")
    //   }

    //   // data will be 'woot'
    // });
  }
  handleNewDbUsersList = (msg) => {
    let data = JSON.parse(msg.data);
    this.setState({ users: data })
    console.log(data)
  }
  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };
  getDateTime = (timestamp) => {
    let date = new Date(parseFloat(timestamp))
    console.log(timestamp, date)
    return date.toUTCString()
  }
  componentDidMount() {
    let socket = this.context.socket;



    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    console.log(this.state.dbListBroadcastReadUsersURL)
    socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadUsersURL, 'clientAuthorisation': jwt }, (data) => {

      if (data !== "OK") {
        console.log("ackdata", data);
      }
    });
    socket.on('databaseData:' + this.state.dbListBroadcastReadUsersURL, this.handleNewDbUsersList);
  }

  render() {
    //      console.log("state: ",this.state);
    //console.log('displayHarps',this.state.displayHarps)
    //console.log(this.context.userData)
    console.log(this.state.password, this.state.confirmPassword)
    const { classes } = this.props;
    const topTabValue = this.state.topTabValue;
    const sideTabValue = this.state.sideTabValue;
    const users = this.state.users;
    let passwordError;

    if (this.state.password.length < 12) {
      passwordError = true;
    }
    else {
      passwordError = false;
    }
    let confirmPasswordError;
    let confirmPasswordHelperText;

    if (this.state.password == this.state.confirmPassword) {
      confirmPasswordError = false;
      confirmPasswordHelperText = "Passwords match"
    }
    else {
      confirmPasswordError = true;
      confirmPasswordHelperText = "Passwords do not match"
    }
    let addUserDisable = ((this.state.username.length > 0) && (confirmPasswordError == false) && (passwordError == false)) ? false : true;
    return (
      <React.Fragment>

        <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
          <Grid
            style={{ marginTop: 8, padding: 8 }}
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={0}
          >



            <Grid item xs={12} sm={12} md={6} lg={4} >
              <Typography> New User</Typography>
              <Card style={{ padding: 8 }}>
                <Grid
                  style={{ padding: 8 }}
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12}  >
                    <TextField
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      required
                      label="Username"
                      onChange={this.handleChange("username")}
                      variant="outlined"
                      fullWidth
                      helperText={this.state.usernameHelperText}
                      error={this.state.usernameError}
                    />
                  </Grid>

                  <Grid item xs={12}  >
                    <TextField
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      required
                      type="password"
                      label="Password"
                      onChange={this.handleChange("password")}
                      variant="outlined"
                      fullWidth
                      helperText={this.state.passwordHelperText}
                      error={passwordError}
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      required
                      type="password"
                      label="Confirm Password"
                      onChange={this.handleChange("confirmPassword")}
                      helperText={confirmPasswordHelperText}
                      error={confirmPasswordError}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      inputProps={{
                        autoComplete: 'off'
                      }}

                      label="Email"
                      onChange={this.handleChange("email")}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      label="Given Name"
                      onChange={this.handleChange("givenName")}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      label="Family Name"
                      onChange={this.handleChange("familyName")}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      label="Phone Number"
                      onChange={this.handleChange("phoneNumber")}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      label="Office Location "
                      onChange={this.handleChange("officeLocation")}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <Button variant="contained" color="primary" disabled={addUserDisable} onClick={this.handleOnClickAddUser}>
                      Add User
                    </Button>
                  </Grid>
                </Grid>

              </Card>

            </Grid>
          </Grid>



        </div>
      </React.Fragment>




    );
  }
}

AddUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};
AddUsers.contextType = AutomationStudioContext;
export default withStyles(styles)(AddUsers);
//export default AddUsers;
