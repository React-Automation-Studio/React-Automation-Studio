import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import Apps from '@material-ui/icons/Apps';
import { Coffee,LanConnect,LanDisconnect,ContentCopy } from 'mdi-material-ui/'
const styles = theme => ({

  body1: theme.typography.body1,





  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },


  ConnecedIcon:{
    backgroundColorcolor:theme.palette.primary.main,
  },


});

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    openContextMenu: false,
  }


}









componentDidMount() {

}


componentWillUnmount() {

}











 copyPvNameClipboard = ()=> {
//   console.log('hello');
   navigator.clipboard.writeText(this.props.pvs[0].pvname.replace("pva://",""));
   this.props.handleClose();
 }

 copyPvValueClipboard = ()=> {
//   console.log('hello');
   navigator.clipboard.writeText(this.props.pvs[0].value);
   this.props.handleClose();
 }

render() {
  const {classes}= this.props;







  const  openContextMenu  = this.props.open;

  const pvs=this.props.pvs;
  const pvname=pvs[0].pvname;
  const initialized=pvs[0].initialized;
  const value=pvs[0].value;
    let shortPvName=pvname;
  if (shortPvName.includes('pva://')){
    shortPvName=shortPvName.replace('pva://','EPICS1 PV: ');

  }else if (shortPvName.includes('loc://')){
      shortPvName=shortPvName.replace('loc://','Local Variable: ');
}
  else{
    shortPvName=shortPvName="Unknown PV: "+pvname;


  }
  const enableProbe=typeof (this.props.disableProbe)!=='undefined'?false: this.context.enableProbe;
  //console.log('this.context.enableProbe',this.context.enableProbe)
  return (



      <Popover
        open={openContextMenu}
        anchorEl={this.props.anchorEl}
        anchorOrigin={this.props.anchorOrigin}
        transformOrigin={this.props.transformOrigin}
      >
        <Paper>



          <ClickAwayListener onClickAway={this.props.handleClose}>
          <React.Fragment>
            {pvs.length===1&&            <MenuList>
              <MenuItem>
                <ListItemIcon>
                  {initialized&&<LanConnect style={{color:this.props.theme.palette.primary.main}} />}
                  {(initialized===false)&&<LanDisconnect style={{color:this.props.theme.palette.error.main}} />}
                </ListItemIcon>
                <Typography variant="inherit">  {shortPvName}</Typography>
              </MenuItem>
              <Divider/>
              {enableProbe&&<MenuItem
                onClick={this.props.handleClose}
                component={Link} to={{
                    pathname: "/Probe",
                  search:JSON.stringify({pvname:pvname}),
                    state: ["sdas"],
                    data:"hello2"
                }}
                target="_blank"
                            >

                <ListItemIcon>
                  <Coffee />
                </ListItemIcon>
                <Typography variant="inherit">Probe</Typography>

              </MenuItem>}
              <Divider/>
              <MenuItem onClick={this.copyPvNameClipboard}>
                <ListItemIcon>
                  <ContentCopy />
                </ListItemIcon>
                <Typography variant="inherit">Copy PV Name to Clipboard</Typography>
              </MenuItem>
              <MenuItem onClick={this.copyPvValueClipboard}>
                <ListItemIcon>
                  <ContentCopy />
                </ListItemIcon>
                <Typography variant="inherit">Copy PV Value to Clipboard</Typography>
              </MenuItem>

            </MenuList>}

            {pvs.length>1&&
              <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    {initialized&&<LanConnect style={{color:this.props.theme.palette.primary.main}} />}
                    {(initialized===false)&&<LanDisconnect style={{color:this.props.theme.palette.error.main}} />}
                  </ListItemIcon>
                <Typography variant="inherit">  {shortPvName}</Typography>
                </MenuItem>
                <Divider/>
                <MenuItem
                  onClick={this.props.handleClose}
                  component={Link} to={{
                    pathname: "/Probe",
                    search:JSON.stringify({pvname:pvname}),
                    state: ["sdas"],
                    data:"hello2"
                  }}
                  target="_blank"
                >

                  <ListItemIcon>
                    <Coffee />
                  </ListItemIcon>
                  <Typography variant="inherit">Probe</Typography>

                </MenuItem>
                <Divider/>
                <MenuItem onClick={this.copyPvNameClipboard}>
                  <ListItemIcon>
                    <ContentCopy />
                  </ListItemIcon>
                  <Typography variant="inherit">Copy PV Name to Clipboard</Typography>
                </MenuItem>
                <MenuItem onClick={this.copyPvValueClipboard}>
                  <ListItemIcon>
                    <ContentCopy />
                  </ListItemIcon>
                  <Typography variant="inherit">Copy PV Value to Clipboard</Typography>
                </MenuItem>

              </MenuList>}
              </React.Fragment>
          </ClickAwayListener>
        </Paper>


      </Popover>



  )
}
}

ContextMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

ContextMenu.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(ContextMenu)
