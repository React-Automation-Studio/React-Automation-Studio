/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ViewList from '@material-ui/icons/ViewList';
import Typography from '@material-ui/core/Typography';
import Lock from '@material-ui/icons/Lock';
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
      menuSelectedIndex:0,
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  copyAllPvNamesClipboard = ()=> {
    let pvnames="";
    for(let pv in this.props.pvs){
      pvnames+=this.props.pvs[pv].pvname.toString()+"\n";
    }
    navigator.clipboard.writeText(pvnames);
    this.props.handleClose();
  }

  copyPvNameClipboard = ()=> {
    if (typeof navigator.clipboard !=='undefined' ){
      navigator.clipboard.writeText(this.props.pvs[this.state.menuSelectedIndex].pvname);
    }
    this.props.handleClose();
  }

  copyPvValueClipboard = ()=> {
    if (typeof navigator.clipboard !=='undefined' ){
      navigator.clipboard.writeText(this.props.pvs[this.state.menuSelectedIndex].value);
    }
    this.props.handleClose();
  }

  handleMenuItemSelect=(event,index)=>{
    console.log('handleMenuItemSelect',index,this.props.pvs[index]);
    this.setState({menuSelectedIndex:index})
  }

  getListItems = (pvs) => {
    let listItems=[];

    let i=0;
    for (i=0 ; i<(pvs.length);i++){
      const index=i;
      let icon='disconnected';
      if (pvs[i].initialized===true){
        if(pvs[i].metadata){
          if (pvs[i].metadata.write_access===false){
              icon='locked';
          }
          else{
            icon='connected';
          }
        }
        else{
          icon='connected';
        }
      }
      else{
        icon='disconnected';
      }

      if(i<(pvs.length-1)){
        listItems.push(
            <MenuItem key={pvs[i].pvname.toString()+i} onClick={(event)=>this.handleMenuItemSelect(event,index)} selected={index === this.state.menuSelectedIndex} >
              <ListItemIcon>
                <React.Fragment>
                  {(icon=='connected')&&<LanConnect style={{color:this.props.theme.palette.primary.main}} />}
                  {(icon=='disconnected')&&<LanDisconnect style={{color:this.props.theme.palette.error.main}} />}
                  {(icon=='locked')&&<Lock style={{color:this.props.theme.palette.error.main}} />}
                </React.Fragment>
              </ListItemIcon>
              <Typography variant="inherit">  {pvs[i].pvname}</Typography>
              <Divider/>
            </MenuItem>
        )
      }
      else {
        listItems.push(
            <MenuItem key={pvs[i].pvname.toString()+i} onClick={(event)=>this.handleMenuItemSelect(event,index)} selected={index === this.state.menuSelectedIndex}>
              <ListItemIcon>
                <React.Fragment>
                {(icon=='connected')&&<LanConnect style={{color:this.props.theme.palette.primary.main}} />}
                {(icon=='disconnected')&&<LanDisconnect style={{color:this.props.theme.palette.error.main}} />}
                {(icon=='locked')&&<Lock style={{color:this.props.theme.palette.error.main}} />}
                </React.Fragment>
                </ListItemIcon>
              <Typography variant="inherit">  {pvs[i].pvname}</Typography>
            </MenuItem>
        )
      }
    }
    return listItems;
  }

  render() {
    const  openContextMenu  = this.props.open;

    const pvs=this.props.pvs;
    const enableProbe=typeof (this.props.disableProbe)!=='undefined'?false: this.context.enableProbe;
    let icon='disconnected';

    if (pvs.length===1){
      if (pvs[0].initialized===true){
        if(pvs[0].metadata){
        if (pvs[0].metadata.write_access===false){
            icon='locked';
        }
        else{
          icon='connected';
        }
      }
      else{
        icon='connected';
      }
      }
      else{
        icon='disconnected';
      }
    }
    return (
      <Popover
        open={openContextMenu}
        anchorEl={this.props.anchorEl}
        anchorOrigin={this.props.anchorOrigin}
        transformOrigin={this.props.transformOrigin}
        anchorReference={this.props.anchorReference}
        anchorPosition={this.props.anchorPosition}
      >
        <Paper>
          <ClickAwayListener onClickAway={this.props.handleClose}>
            <div>
              {pvs.length===1&&            <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    <React.Fragment>
                    {(icon=='connected')&&<LanConnect style={{color:this.props.theme.palette.primary.main}} />}
                    {(icon=='disconnected')&&<LanDisconnect style={{color:this.props.theme.palette.error.main}} />}
                    {(icon=='locked')&&<Lock style={{color:this.props.theme.palette.error.main}} />}
                    </React.Fragment>
                  </ListItemIcon>
                  <Typography variant="inherit">  {pvs[0].pvname}</Typography>
                </MenuItem>
                <Divider/>
                {enableProbe&&<MenuItem
                  onClick={this.props.handleClose}
                  component={Link} to={{
                      pathname: "/Probe",
                    search:JSON.stringify({pvname:pvs[0].pvname,probeType:this.props.probeType}),
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
                {typeof navigator.clipboard !=='undefined'&&<MenuItem onClick={this.copyPvNameClipboard}>
                  <ListItemIcon>
                    <ContentCopy />
                  </ListItemIcon>
                  <Typography variant="inherit">Copy PV Name to Clipboard</Typography>
                </MenuItem>}

                {typeof navigator.clipboard !=='undefined'&&<MenuItem onClick={this.copyPvValueClipboard}>
                  <ListItemIcon>
                    <ContentCopy />
                  </ListItemIcon>
                  <Typography variant="inherit">Copy PV Value to Clipboard</Typography>
                </MenuItem>}

              </MenuList>}

              {pvs.length>1&&
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <ViewList  />
                    </ListItemIcon>
                    <Typography variant="inherit">  {"Process Variables"}</Typography>
                  </MenuItem>
                  <Divider/>
                  {this.getListItems(pvs)              }
                  <Divider/>

                  {enableProbe&&<MenuItem
                    onClick={this.props.handleClose}
                    component={Link} to={{
                      pathname: "/Probe",
                      search:JSON.stringify({pvname:pvs[this.state.menuSelectedIndex].pvname,
                      probeType:this.props.probeType}),
                      state: ["sdas"],
                      data:"hello2"
                    }}
                    target="_blank"
                  >
                    <ListItemIcon>
                      <Coffee />
                    </ListItemIcon>
                    <Typography variant="inherit">Probe Selected PV</Typography>
                  </MenuItem>}
                  <Divider/>

                  {typeof navigator.clipboard !=='undefined'&&<MenuItem onClick={this.copyAllPvNamesClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">Copy All PV  Names to Clipboard</Typography>
                  </MenuItem>}

                  {typeof navigator.clipboard !=='undefined'&&<MenuItem onClick={this.copyPvNameClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">Copy Selected PV  Name to Clipboard</Typography>
                  </MenuItem>}

                  {typeof navigator.clipboard !=='undefined'&&  <MenuItem onClick={this.copyPvValueClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">Copy Selected PV Value to Clipboard</Typography>
                  </MenuItem>}
                </MenuList>}
            </div>
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
