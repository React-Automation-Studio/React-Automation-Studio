import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextInput from '../../../components/BaseComponents/TextInput';
import TextOutput from '../../../components/BaseComponents/TextOutput';

import Slider from '../../BaseComponents/Slider';
import GraphY from '../../../components/BaseComponents/GraphY';

import Grid from '@material-ui/core/Grid';

import SideBar from '../../../components/SystemComponents/SideBar';

import lime from '@material-ui/core/colors/lime';
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

class Example2 extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SideBar/>
        <div >
        <Grid
           style={{padding:8}}
           container item
           direction="row"
           justifyContent="center"
           spacing={1}
           alignItems="stretch"
        >
          <Grid item xs={6}  >
            <TextInput
                pv='$(device):amplitude'
                macros={{'$(device)':'testIOC'}}
                usePvLabel={true}
                
                prec={3}
                alarmSensitive={true}
            />
          </Grid>
          <Grid item  xs={6}>
            <TextOutput
              pv='$(device):test3'
              macros={{'$(device)':'testIOC'}}
              usePvLabel={true} 
              prec={3} alarmSensitive={true}
            />
          </Grid>
          <Grid item xs={3}  >
            <TextInput
                pv='$(device):amplitude'
                macros={{'$(device)':'testIOC'}}
                usePvLabel={true}
                
                prec={3}
                alarmSensitive={true}
            />
          </Grid>
          <Grid item  xs={3}>
            <TextOutput
              pv='$(device):test3'
              macros={{'$(device)':'testIOC'}}
              usePvLabel={true} 
              prec={3} alarmSensitive={true}
            />
          </Grid>

          <Grid item xs={3}  >
            <TextInput
                pv='$(device):amplitude'
                macros={{'$(device)':'testIOC'}}
                usePvLabel={true}
                
                prec={3}
                alarmSensitive={true}
            />
          </Grid>
          <Grid item  xs={3}>
            <TextOutput
              pv='$(device):test3'
              macros={{'$(device)':'testIOC'}}
              usePvLabel={true} 
              prec={3} alarmSensitive={true}
            />
          </Grid>

          <Grid item xs={12} >
            <div style={{ height: '50vh', width:'96vw',}}>
              <GraphY  pvs={['testIOC:test4','testIOC:test5'] } legend={['Sine Wave','Amplitude']} lineColor={[this.props.theme.palette.secondary.main,lime['400']]}/>
            </div>
          </Grid>
          <Grid item xs={12}  >
            <Slider
              pv='$(device):amplitude'
              macros={{'$(device)':'testIOC'}}
              usePvMinMax={true}
              min={1000}
              max={500}
              usePvLabel={true}
            />
          </Grid>
        </Grid>
      </div>
      </React.Fragment>
    );
  }
}

Example2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(Example2);
