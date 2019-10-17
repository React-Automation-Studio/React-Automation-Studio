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
import ViewList from '@material-ui/icons/ViewList';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import Lock from '@material-ui/icons/Lock';
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
      menuSelectedIndex:0,
    }


  }









  componentDidMount() {

  }


  componentWillUnmount() {

  }









  copyAllPvNamesClipboard = ()=> {
    //   console.log('hello');

    let pvnames="";
    for(let pv in this.props.pvs){
      pvnames+=this.props.pvs[pv].pvname.toString()+"\n";
    }
    navigator.clipboard.writeText(pvnames);
    this.props.handleClose();
  }

  copyPvNameClipboard = ()=> {
    //   console.log('hello');
    navigator.clipboard.writeText(this.props.pvs[this.state.menuSelectedIndex].pvname);
    this.props.handleClose();
  }

  copyPvValueClipboard = ()=> {
    //   console.log('hello');
    navigator.clipboard.writeText(this.props.pvs[this.state.menuSelectedIndex].value);
    this.props.handleClose();
  }

  handleMenuItemSelect=(event,index)=>{
    console.log('handleMenuItemSelect',index,this.props.pvs[index]);
    this.setState({menuSelectedIndex:index})

  }
  getListItems = (pvs) => {
    //this.test("test1");
    //this.handleInputValue();
  //  console.log('getListItems')
  //  console.log('pvs',pvs)
    let listItems=[];

    let i=0;


    for (i=0 ; i<(pvs.length);i++){
    //  console.log("pvs: ",i, pvs[i]);
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


          <React.Fragment key={pvs[i].pvname.toString()+i}>
            <MenuItem onClick={(event)=>this.handleMenuItemSelect(event,index)} selected={index === this.state.menuSelectedIndex} >
              <ListItemIcon>
                <React.Fragment>
                  {(icon=='connected')&&<LanConnect style={{color:this.props.theme.palette.primary.main}} />}
                  {(icon=='disconnected')&&<LanDisconnect style={{color:this.props.theme.palette.error.main}} />}
                  {(icon=='locked')&&<Lock style={{color:this.props.theme.palette.error.main}} />}
                </React.Fragment>
              </ListItemIcon>
              <Typography variant="inherit">  {pvs[i].pvname}</Typography>
            </MenuItem>
            <Divider/>
          </React.Fragment>



        )
      }
      else {
        listItems.push(

          <React.Fragment key={pvs[i].pvname.toString()}>
            <MenuItem onClick={(event)=>this.handleMenuItemSelect(event,index)} selected={index === this.state.menuSelectedIndex}>
              <ListItemIcon>
                <React.Fragment>
                {(icon=='connected')&&<LanConnect style={{color:this.props.theme.palette.primary.main}} />}
                {(icon=='disconnected')&&<LanDisconnect style={{color:this.props.theme.palette.error.main}} />}
                {(icon=='locked')&&<Lock style={{color:this.props.theme.palette.error.main}} />}
                </React.Fragment>
                </ListItemIcon>
              <Typography variant="inherit">  {pvs[i].pvname}</Typography>
            </MenuItem>

          </React.Fragment>
        )
      }
    }
  //  console.log(listItems)

    //console.log(DataConnections[0]);
    return listItems;
  }


  render() {
    const {classes}= this.props;







    const  openContextMenu  = this.props.open;

    const pvs=this.props.pvs;
    const pvname=pvs[0].pvname;
    const initialized=pvs[0].initialized;
    const value=pvs[0].value;
    // let shortPvNames=[];
    // for(let pvnames in pvs){
    //   let shortPvName=pvs[pvnames].pvname;
    //   if (shortPvName.includes('pva://')){
    //     shortPvName=shortPvName.replace('pva://','EPICS1 PV: ');
    //   }
    //   else if (shortPvName.includes('loc://')){
    //     shortPvName=shortPvName.replace('loc://','Local Variable: ');
    //   }
    //   else{
    //     shortPvName=shortPvName="Unknown PV: "+pvname;
    //   }
    //   shortPvNames.push(shortPvName);
    // }
    const enableProbe=typeof (this.props.disableProbe)!=='undefined'?false: this.context.enableProbe;
    //console.log('this.context.enableProbe',this.context.enableProbe)
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
                  <MenuItem onClick={this.copyAllPvNamesClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">Copy All PV  Names to Clipboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={this.copyPvNameClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">Copy Selected PV  Name to Clipboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={this.copyPvValueClipboard}>
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <Typography variant="inherit">Copy Selected PV Value to Clipboard</Typography>
                  </MenuItem>

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
