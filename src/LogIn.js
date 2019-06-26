import React from 'react';
import AutomationStudioContext from './components/SystemComponents/AutomationStudioContext';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(1) * 3,
    marginRight: theme.spacing(1) * 3,
    [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1) * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1) * 3,
  },
});

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state={'emailAddress' : "",
    'password' : "",
    'Authenticated':false,
    'Authorised':false,
    'AuthorisationFailed':false,
    'AuthenticationFailed':false,

  };
    this.handleChange=this.handleChange.bind(this);
    this.catchReturn=this.catchReturn.bind(this);
    this.handleAuthorization=this.handleAuthorization.bind(this);
    this.handleAuthentication=this.handleAuthentication.bind(this);
    this.handleUnauthorisedDialogClick=this.handleUnauthorisedDialogClick.bind(this);
    this.handleAuthenticationFailedDialogClick=this.handleAuthenticationFailedDialogClick.bind(this);

    this.handleResponse=this.handleResponse.bind(this);
  }

  handleChange = name => event => {
    let value=event.target.value;

    this.setState({
      [name]: value,
    });
  };

  catchReturn = name => event => {
    if(event.key === 'Enter'){
    let value=event.target.value;

    this.setState({
      [name]: value,
    },this.handleSubmitClick());
  }
  };
  handleSubmitClick=()=>{
  //  console.log('button clicked')
  //  console.log('email: ',this.state.emailAddress)
  //  console.log('password: ',this.state.password)
    let socket=this.context.socket;
    let user={email:this.state.emailAddress,password:this.state.password}

    socket.emit('Authorise', {user:{email: this.state.emailAddress,password:this.state.password}});
    //this.login();

  }

  handleResponse=(response) =>{
    console.log(response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


  handleAuthorization(msg){
  //  console.log('authorised',msg)
    if (typeof msg.jwt !== 'undefined'){
    localStorage.setItem('jwt', JSON.stringify(msg.jwt));
   }
   else {
     localStorage.setItem('jwt', JSON.stringify(null));
   }
    this.setState({'AuthorisationFailed':msg.successful!==true});
    if(msg.successful){
      let jwt = JSON.parse(localStorage.getItem('jwt'));
    //  console.log('jwt',jwt);

        let socket=this.context.socket;
      socket.emit('Authenticate', jwt);

    }

  }
  handleUnauthorisedDialogClick()
  {this.setState({'AuthorisationFailed':false});

  }

  handleAuthenticationFailedDialogClick()
  {
    this.setState({'AuthenticationFailed':false});

  }
  handleAuthentication(msg){

    this.setState({'Authenticated':msg.successful,'AuthenticationFailed':msg.successful!==true});


  }
  componentDidMount() {
    let socket=this.context.socket;
    socket.on('authorised',this.handleAuthorization);
    socket.on('authentication',this.handleAuthentication);
  }
  componentWillUnmount(){
      let socket=this.context.socket;
      socket.removeListener('authorised', this.handleAuthorization);
      socket.removeListener('authentication',this.handleAuthentication);
  }

  render(){
  const { classes } = this.props;
  let user = JSON.parse(localStorage.getItem('user'));
  let socket=this.context.socket;
  //console.log(socket)
//  console.log(user)
  return (
    <React.Fragment>

      <Dialog
        open={this.state.AuthorisationFailed}
        TransitionComponent={Transition}
        keepMounted

        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Error!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Invalid email address or password!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleUnauthorisedDialogClick} color="primary">
            Ok
          </Button>

        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.AuthenticationFailed}
        TransitionComponent={Transition}
        keepMounted

        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Error!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Authentication Failed!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAuthenticationFailedDialogClick} color="primary">
            Ok
          </Button>

        </DialogActions>
      </Dialog>



      <main className={classes.main}>

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange('emailAddress')} onKeyPress={this.catchReturn('password')}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange('password')} onKeyPress={this.catchReturn('password')}/>

            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button

              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmitClick}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
      {this.state.Authenticated&&<Redirect to='/' />}
    </React.Fragment>
      );
      }
      }

      LogIn.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      LogIn.contextType=AutomationStudioContext;
      export default withStyles(styles)(LogIn);
