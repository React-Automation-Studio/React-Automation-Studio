import React, { Component } from 'react';


import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TraditionalLayout from './Layout/ComposedLayouts/TraditionalLayout.js';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HelpIcon from '@material-ui/icons/Help';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
// Styles




const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,



  },
  center: {
    margin: 'auto',

    width: '15%',
    height: '50%'

  },
  Paper: {
    padding: theme.spacing(4),
    height: '100%',



  },
  MainGrid: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),

  },
  MainGridItem: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),


  },
  WhatsNew: {
    maxHeight: '35vh',
    'overflow-y':
      'scroll',
    paddingRight: 8,
    // '&::-webkit-scrollbar': {
    //   width: '0.2em'
    // },
    // '&::-webkit-scrollbar-track': {
    //   boxShadow: theme.palette.type==='light'?'inset 0 0 6px rgba(0,0,0,0.075)':'inset 0 0 6px rgba(255,255,255,0.075)',
    //   webkitBoxShadow: theme.palette.type==='light'?'inset 0 0 6px rgba(0,0,0,0.075)':'inset 0 0 6px rgba(255,255,255,0.075)'
    // },
    // '&::-webkit-scrollbar-thumb': {
    //   backgroundColor: theme.palette.type==='light'?'rgba(0,0,0,.15)':'rgba(255,255,255,.1)',
    //   outline: '1px solid slategrey'
    // }
  },
  Icon: {
    marginRight: theme.spacing(1),
    fontSize: 'inherit',
    //display: 'inline-flex',
    // alignSelf: 'center',
    //verticalAlign:'middle',

  },
  Button: {
    width: '100%',
    height: '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    //  width:'100%',
    //    marginTop:'auto',
    //    marginLeft:'auto',
    //    marginRight:'auto',
    //    marginBottom:'auto',

  },

});





class MainDashboard extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = { redirectToLoginPage: false }
  }

  logout() {
    localStorage.removeItem('jwt');

  }
  componentDidMount() {
    //  console.log('MainDashboard mounted')
  }
  render() {


    const { classes } = this.props;
    const paperElevation = this.props.theme.palette.paperElevation;
    const buttonVariant = "contained";
    const typographyProps = {
      color: "primary",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
      },
      variant: "h5"
    };

    const styleguideURL = window.location.protocol + "//" + window.location.hostname + ':6060/';
    return (
      <TraditionalLayout
        title="React Automation Studio"
        denseAppBar
        alignTitle="center"
      >



        <Grid className={classes.MainGrid} container direction="row" item justify="center" spacing={2} alignItems="stretch" >


          <Grid item lg={4} sm={6} xs={12} className={classes.MainGridItem} >

            <Paper className={classes.Paper} elevation={paperElevation}>
              <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                <Grid item lg={6} sm={12} xs={12}>
                  <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                    <Grid item lg={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
                      <Typography {...typographyProps}><PhoneAndroidIcon className={classes.Icon} />Mobile Demos</Typography>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/MobileDemo1" color="primary" variant={buttonVariant}>  Mobile Demo 1 </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/MobileDemo2" color="primary" variant={buttonVariant}>  Mobile Demo 2 </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/EpicsDemos" color="primary" variant={buttonVariant}>  Epics Demos </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/Test3D" color="primary" variant={buttonVariant}>  3D Demos </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </Paper>
          </Grid>

          <Grid item lg={4} sm={6} xs={12} className={classes.MainGridItem}>

            <Paper className={classes.Paper} elevation={paperElevation}>
              <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                <Grid item lg={6} sm={12} xs={12}>
                  <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                    <Grid item lg={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
                      <Typography {...typographyProps}><DesktopWindowsIcon className={classes.Icon} />  Desktop Demos</Typography>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/TableControlSystem" color="primary" variant={buttonVariant}> Table Control Demo</Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}  >
                      <Button fullWidth className={classes.button} component={Link} to="/BeamlineControlSystem" color="primary" variant={buttonVariant}> Beam Line Control Demo </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/MobileDemo1" color="primary" variant={buttonVariant}>  Mobile Demo 1 </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/MobileDemo2" color="primary" variant={buttonVariant}>  Mobile Demo 2 </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/EpicsDemos" color="primary" variant={buttonVariant}>  Epics Demos </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/Test3D" color="primary" variant={buttonVariant}>  3D Demos </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item lg={4} sm={6} xs={12} className={classes.MainGridItem} >

            <Paper className={classes.Paper} elevation={paperElevation}>
              <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                <Grid item lg={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
                  <Typography {...typographyProps}><NewReleasesIcon className={classes.Icon} /> Whats New</Typography>
                </Grid>
                <Grid item lg={12} sm={12} xs={12}  >
                  <Typography className={classes.WhatsNew} component='div'>
                  V3.0.0 Wednesday 12 May 2021
<br />
<br />
Improvements and new features:
  <br />
  <ul>
    <li>New web based administration</li>
    <li>Nginx now serves the stactic files, performs the transport layer security and load balancing</li>
    <li>AlarmHandler now supports Signal notifications, improvements to the user interface</li>
    <li>Simplification of enviroment variables</li>
    <li>Improvement of security features, with move from Access tokens, to short lived Access tokens with Refresh tokens</li>
    <li>External Authentication via Active Directory or Google Authentication</li>
    <li>Removal of the requirement for the '' prefix for EPICS process variables</li>
    <li>improvement of the MongoDb hooks</li>
    <li>Component updates:
    <ul>
        <li>GraphY is now based on Plotly</li>
        <li>GraphXY is now based on Plotly</li>
    </ul>
    </li>
    <li>Package updates</li>
    <li>Minor Bug Fixes</li>
   
  </ul>
Breaking changes:
<ul>
    <li>Removal of the old file based administration</li>
    <li>Enviroment variable names have been simplified</li>
    <li>GraphY and GraphXY backround now defaults to the theme.palette.background.default value</li>
    
</ul>


<br />
                    V2.2.0 Wednesday 20 January 2021
<br />
Improvements and new features:
  <br />
                    <ul>
                      <li>AlarmHandler now supports email notifications</li>
                      <li>New Components:
                        <ul>
                          <li>New ArrayContainer</li>
                          <li>New LightPanel</li>
                        </ul>
                      </li>
                      <li>Upgraded to Socket.IO 3.1.0</li>
                      <li>Upgraded pvServer to Flask-SocketIO 5.0.1</li>
                      <li>Package updates</li>

                    </ul>
                  V2.1.0 Tuesday 20 October 2020
                  <br />
                  Improvements and new features:
                    <br />
                    <ul>
                      <li>Added Epics Archiver Viewer component</li>
                      <li>Package updates</li>
                    </ul>

                  V2.0.1 Tuesday 29 September 2020
                  <br />
                  Improvements and new features:
                    <br />
                    <ul>
                      <li>Added logging to pvServer</li>
                      <li>Minor bug fix to pvServer</li>
                    </ul>

                  V2.0.0 Wednesday 5 August 2020
                    <br />

                    Improvements and new features:
                    <br />
                    <ul>
                      <li>Updated to React Hooks based  components</li>
                      <li>Introduction of new RasAppCore component, the logic in App.js is replaced by this component</li>
                      <li>Created the new component Widget that is the base component for all Widgets.</li>
                      <li>PV component substitutes old DataConnection component.</li>
                      <li>Dynamic connection: When useMetadata props is false some fields, such as min, max, prec, alarm and units, are read from external PVs or an additional connection with those fields is established. By default useMetadata prop is false.</li>
                      <li>New Layout with new themes.</li>
                      <li>All buttons can receive and icon.</li>
                      <li>All components extending MUI components can pass MUI props to the MUI components through a special prop (it changes based on the component).</li>
                      <li>All components can have a tooltip.</li>
                      <li>Widget base components now accept macros in the label and units</li>
                      <li>Integration with MongoDb database with the addition of Mongodb hooks to setup a watch, and perform an update and insert a MongoDb document.</li>
                      <li>Update of all demos to Hooks based components</li>
                      <li>Update of all beam line components to Hooks based components, with new documentation</li>
                      <li>Create new experimental sections to hose previews of new components</li>
                      <li>Preview Components
                        <ul>
                          <li>
                            Preview release of the Alarm Handler server and client UI
                          </li>
                          <li>
                            Preview release of the Load/Save client UI
                          </li>
                        </ul>
                      </li>


                      <li> Deprecated Components: These components will be removed in future releases                  <br />
                        <ul>
                          <li>
                            SimpleSlider -> Use Slider
                          </li>
                          <li>
                            ActionFanoutButton -> Use ActionButton
                          </li>
                          <li>
                            SwitchComponent -> Use Switch
                          </li>
                        </ul>
                      </li>
                      <li>
                        Removed Component:

                      <ul>
                          <li>
                            GraphMultiplePVs
                        </li>
                        </ul>
                      </li>
                      <li>
                        Breaking Changes:

                      <ul>
                          <li>
                            routes.js was renamed Routes.js and now contains extra logic to enable dynamic or isolated routes based on the use role.
                        </li>
                          <li>
                            If you added extra logic to the App.js you will to adapt to the new RasAppCore component.
                        </li>
                        </ul>
                      </li>
                      <li>Packages updated in both RAS and RAS-Example-Project-1</li>

                    </ul>



                  </Typography>
                </Grid>

              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={4} sm={6} xs={12} className={classes.MainGridItem} >

            <Paper className={classes.Paper} elevation={paperElevation}>
              <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                <Grid item lg={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
                  <Typography {...typographyProps}><EditIcon className={classes.Icon} /> Staging</Typography>
                </Grid>
                <Grid item lg={6} sm={12} xs={12}>

                  <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/Staging" color="primary" variant={buttonVariant}>  Staging </Button>
                    </Grid>
                  </Grid>
                </Grid>



              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={4} sm={6} xs={12} className={classes.MainGridItem} >

            <Paper className={classes.Paper} elevation={paperElevation} style={{ textAlign: 'center' }}>
              <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                <Grid item lg={12} sm={12} xs={12}>
                  <Typography {...typographyProps}>  <VisibilityIcon className={classes.Icon} /> Preview</Typography>
                </Grid>
                <Grid item lg={6} sm={12} xs={12}>
                  <Grid container direction="row" item justify="center" spacing={4} alignItems="center">

                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/AlarmHandlerDemo" color="primary" variant={buttonVariant}>  Alarm Handler Demo </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
                      <Button fullWidth className={classes.button} component={Link} to="/VaultDemo" color="primary" variant={buttonVariant}>  Vault Demo </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12} >
                      <Button fullWidth className={classes.button} component={Link} to="/LoadSaveExample" color="primary" variant={buttonVariant}> LoadSave Example </Button>
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12} >
                      <Button fullWidth className={classes.button} component={Link} to="/ArchiverDataViewerDemo" color="primary" variant={buttonVariant}> Archiver Data Viewer Demo </Button>
                    </Grid>


                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={4} sm={6} xs={12} className={classes.MainGridItem} >

            <Paper className={classes.Paper} elevation={paperElevation}>
              <Grid container direction="row" item justify="center" spacing={4} alignItems="center">
                <Grid item lg={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
                  <Typography {...typographyProps}><HelpIcon className={classes.Icon} /> Help</Typography>
                </Grid>
                <Grid item lg={6} sm={12} xs={12}>

                  <Button fullWidth className={classes.button} target="_blank" href={styleguideURL} color="default" variant={buttonVariant}> Help and Style Guide </Button>

                </Grid>

              </Grid>
            </Paper>
          </Grid>






        </Grid>





       
      </TraditionalLayout >
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(MainDashboard));
