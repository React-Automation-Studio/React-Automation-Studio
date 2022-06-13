import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SideBar from '../../../components/SystemComponents/SideBar';

const styles = theme => ({
  root: {
    padding: 0,
    spacing: 0,
    direction: 'row',
    alignItems: 'stretch',
    justify: "flex-start",
    overflowX: "hidden",
    overflowY: "hidden",
  },
});

class Example3 extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SideBar/>
        <div> Hello World</div>
      </React.Fragment>
    );
  }
}

Example3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(Example3);
