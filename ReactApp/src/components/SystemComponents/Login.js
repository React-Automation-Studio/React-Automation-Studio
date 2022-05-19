import React, { useEffect, useState, useContext, useRef } from 'react';
import AutomationStudioContext from './AutomationStudioContext';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.error.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1) * 3,
  },
}));

const Header = (props) => {
  const classes=useStyles();
  return (
    <React.Fragment>
      {props.title1 && <Typography component="h1" variant="h3">
        {props.title1}
      </Typography>}
      {props.title2 && <Typography component="h1" variant="h3">
        {props.title2}
      </Typography>}
      {props.title3 && <Typography component="h1" variant="h3">
        {props.title3}
      </Typography>}
      {props.image}
      {props.logoIcon && <Avatar className={classes.avatar}>
        {props.logoIcon}
      </Avatar>}
      {props.signInText &&
        <Typography component="h1" variant="h5" style={{ paddingBottom: 16 }}>
          {props.signInText}
        </Typography>}
    </React.Fragment>
  )
}

const Footer = (props) => {
  return (
    <React.Fragment>
      {props.footerString && <Typography style={{ paddingTop: 24 }} align="left" variant="caption">
        {props.footerString}
      </Typography>}
      {props.version && <Typography style={{ paddingTop: 16 }} align="left" variant="caption">
        {props.version}
      </Typography>}
    </React.Fragment>)
}

/**
 * The login component can be fully customized either by using the individual props or by overriding the header and footer portions using the customHeader or customFooter components.
 * The login component and pvServer support multiple login modes. See below to enable login, disable standard login, enable active directory and Google login
 */
const Login = (props) => {
  const classes = useStyles();
  const context = useContext(AutomationStudioContext);
  const loggedIn = context.userData.loggedIn;
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authorisationFailed, setAuthorisationFailed] = useState(false)
  const [authenticationFailed, setAuthenticationFailed] = useState(false)
  const [submit, setSubmit] = useState(false);
  const [loginTabValue, setLoginTabValue] = useState(0);
  const [loginModes, setLoginModes] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const mounted = useRef(true);
  const enableStandardLogin = !(process.env.REACT_APP_DisableStandardLogin === 'true');
  const enableActiveDirectoryLogin = process.env.REACT_APP_EnableActiveDirectoryLogin === 'true';
  const enableGoogleLogin = process.env.REACT_APP_EnableGoogleLogin === 'true';
  const history = useHistory();
  const location =useLocation();

  const responseGoogle = (response) => {
    const token = response.tokenId;

    const options = {
      headers: { 'Content-Type': 'application/json' },
      timeout: props.timeout,
    };
    let body = JSON.stringify({ jwt: token })
    let endpoint = '/api/login/google';
    if (endpoint) {
      axios.post(endpoint, body, options)
        .then(response => {
          const { data } = response;

          if (typeof data.accessToken !== 'undefined') {
            context.setUserTokens(data.accessToken);
          }
          else {
            context.setUserTokens(data.null);
          }
          if (typeof data.refreshTokenConfig !== 'undefined') {
            context.setRefreshTokenConfig(data.refreshTokenConfig);
          }
          else {
            context.setRefreshTokenTimeout(data.null);
          }
          setAuthorisationFailed(data.login !== true);
        }
        )
        .catch(err => {
          let str = err.toString();
          if (!(str.includes("401"))) {
            console.log(str)
            setAuthenticationFailed(true)
          }
          else {
            setAuthorisationFailed(true);
          }
        })
    }
  }

  useEffect(() => {
    let modes = []
    if (enableStandardLogin) {
      modes.push('Standard Login')
    }
    if (enableActiveDirectoryLogin) {
      modes.push('Active Directory')
    }
    setLoginModes(modes);
  }, [enableStandardLogin, enableActiveDirectoryLogin])

  useEffect(() => {
    mounted.current = true;
    if (submit === true) {

      const options = {
        headers: { 'Content-Type': 'application/json' },
        timeout: props.timeout,
      };
      let body = JSON.stringify({ user: { username: username, password: password } })
      let endpoint = loginModes[loginTabValue] === 'Standard Login'
        ? '/api/login/local'
        : loginModes[loginTabValue] === 'Active Directory'
          ? '/api/login/ldap'
          : null
      if (endpoint) {
        axios.post(endpoint, body, options)
          .then(response => {
            const { data } = response;

            if (mounted.current) {
              if (typeof data.accessToken !== 'undefined') {
                context.setUserTokens(data.accessToken);
              }
              else {
                context.setUserTokens(data.null);
              }
              if (typeof data.refreshTokenConfig !== 'undefined') {
                context.setRefreshTokenConfig(data.refreshTokenConfig);
              }
              else {
                context.setRefreshTokenTimeout(data.null);
              }
              setAuthorisationFailed(data.login !== true);
            }
          }
          )
          .catch(err => {
            let str = err.toString();
            console.log(str)
            if (!(str.includes("401"))) {
              console.log(str)
              setAuthenticationFailed(true)
            }
            else {
              setAuthorisationFailed(true);
            }
          })
      }
      setSubmit(false)
      setPassword("")
    }
    return () => mounted.current = false;
   // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [submit]
  )

  useEffect(() => {
    if (loggedIn) {
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
      // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [loggedIn])

  let usernameText = loginModes[loginTabValue] === 'Standard Login'
    ? props.standardLoginUsernameDisplayText
    : loginModes[loginTabValue] === 'Active Directory'
      ? props.activeDirectoryLoginUsernameDisplayText
      : ""

  const adLoginMode=loginModes[loginTabValue] === 'Active Directory';

  return (
    <React.Fragment>
      <Dialog
        open={authorisationFailed}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-Login-title1"
        aria-describedby="alert-Login-slide-description1"
      >
        <DialogTitle id="alert-Login-title1">
          Error!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-Login-slide-description1">
            Invalid username or password!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAuthorisationFailed(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={authenticationFailed}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-Login-title2"
        aria-describedby="alert-Login-slide-description2"
      >
        <DialogTitle id="alert-Login-title2">
          {"Error!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-Login-slide-description2">
            Authentication Failed!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAuthenticationFailed(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <main className={classes.main}>
        <Paper className={classes.paper}>
          {props.customHeader ? props.customHeader : <Header {...props} />}

          {(loginModes.length > 1) && <AppBar position="static" color='inherit' >
            <Tabs value={loginTabValue} onChange={(event, newValue) => setLoginTabValue(newValue)} aria-label="simple tabs example"
              indicatorColor="primary"
              textColor="primary"
            >
              {loginModes.map((item, index) =>
                <Tab label={item} style={{ textTransform: 'capitalize' }} key={index.toString()} />
              )
              }
            </Tabs>
          </AppBar>}
          {(enableStandardLogin || enableActiveDirectoryLogin) && <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label={usernameText}
                id="email" name="email" autoComplete="email" autoFocus onChange={(event) => (setUsername(event.target.value))}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    setUsername(event.target.value)
                    setSubmit(true)
                  }
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label={"Password"}
                type={showPassword ? "text" : "password"}

                autoComplete="current-password"
                onChange={(event) => (setPassword(event.target.value))}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    setPassword(event.target.value)
                    setSubmit(true)
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => (setShowPassword(prev => (!prev)))}

                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => setSubmit(true)}
            >
              Sign in
            </Button>
          </form>}
          {enableGoogleLogin &&
            <div style={{ paddingTop: 24 }}>
              <GoogleLogin
                clientId={process.env.REACT_APP_EnableGoogleLoginId}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={(response) => { console.log("google login failed", response) }}
                cookiePolicy={'single_host_origin'}
              />
            </div>}
          {props.customFooter ? props.customFooter : <Footer {...props} />}
          {enableActiveDirectoryLogin&&adLoginMode&&props.adFooter}
        </Paper>
      </main>
    </React.Fragment>
  );
}

Login.propTypes = {
  /** Title text top row.*/
  title1: PropTypes.string,
  /** Title text middle row.*/
  title2: PropTypes.string,
  /** Title text bottom row.*/
  title3: PropTypes.string,
  /** An image than can be display*/
  image: PropTypes.element,

  /** Login Icon. Must be of type @material-ui/icons/...*/
  logoIcon: PropTypes.element,

  /** Sign in text.*/
  signInText: PropTypes.string,
  /** Footer string.*/
  footerString: PropTypes.string,
  /** custom AD footer.*/
  adFooter: PropTypes.element,
  /** Version.*/
  version: PropTypes.string,
  /** Standard Login Username display string.*/
  standardLoginUsernameDisplayText: PropTypes.string,
  /** Active Directory Login Username display string.*/
  activeDirectoryLoginUsernameDisplayText: PropTypes.string,
  /** Login timeout.*/
  timeout: PropTypes.number,
  /** Custom Header Component overides all the components above the username Textfield*/
  customHeader: PropTypes.element,
  /** Custom Footer Component overides all the components below the sign in buttons*/
  customFooter: PropTypes.element,
};

Login.defaultProps = {
  title1: "React",
  title2: "Automation",
  title3: "Studio",
  logoIcon: <LockOutlinedIcon />,
  signInText: "Sign In",
  standardLoginUsernameDisplayText: "Username",
  activeDirectoryLoginUsernameDisplayText: "Email Address",
  timeout: 15000,
};

export default Login;
