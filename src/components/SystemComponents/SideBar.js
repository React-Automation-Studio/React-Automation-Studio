import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Home from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SideBar extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };
  this.logout=this.logout.bind(this);
}
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  logout(){
    let socket=this.context.socket;
    socket.emit('disconnect', {"goodebye":"see you later"});
    socket.close()
    localStorage.removeItem('jwt');

  }
  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>

            <ListItem button key={"Home"} component={Link} to="/" >
              <ListItemIcon><Home/></ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>

        </List>
          {process.env.REACT_APP_EnableLogin==='true'&&<React.Fragment>
        <Divider />
        <ListItem button key={"Log Out"} onClick={this.logout} component={Link} to="/LogIn" >
          <ListItemIcon><AccountCircle/></ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
        </React.Fragment>}
      </div>
    );

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}><Menu/></Button>
      {/*}  <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
        <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
        <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>*/}
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {fullList}
          </div>
        </Drawer>
        <Drawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer('bottom', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', false)}
            onKeyDown={this.toggleDrawer('bottom', false)}
          >
            {fullList}
          </div>
        </Drawer>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
SideBar.contextType=AutomationStudioContext;
export default withStyles(styles)(SideBar);
