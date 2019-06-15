import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';

import Grid from '@material-ui/core/Grid';
import GraphMultiplePVs from '../BaseComponents/GraphMultiplePVs';
import TextUpdateMultiplePVs from '../BaseComponents/TextUpdateMultiplePVs';
import TextOutput from '../BaseComponents/TextOutput'
import { withStyles } from '@material-ui/core/styles';
import uuid from 'uuid';
const styles = theme => ({
  body1: theme.typography.body1,



});

class ComponentsWithMultiplePVs extends React.Component {
  constructor(props) {
    super(props);
    this.state={}

  }




  render() {
const {classes} =this.props;

    return (

      <div className={classes.body1} style={{padding:24}}>
        <div >
          <h1>
            Examples of components with multiple PVs:
          </h1>
          <h2>
            TextUpdateMultiplePVs:
          </h2>
          <TextUpdateMultiplePVs
            pvs={[
              'pva://testIOC:MTextUpdate1',
              'pva://testIOC:MTextUpdate2',
              'pva://testIOC:MTextUpdate3',
              'pva://testIOC:MTextUpdate4',
              'pva://testIOC:MTextUpdate5'
            ]} usePvLabel={true} macros={this.props['macros']}   />
          <br/>
          <h2>
            GraphMultiplePVs:
          </h2>
          <div style={{width:'800px', height: '400px'}}>
            <GraphMultiplePVs
              pvs={[
                'pva://testIOC:MTextUpdate1',
                'pva://testIOC:MTextUpdate2',
                'pva://testIOC:MTextUpdate3',
                'pva://testIOC:MTextUpdate4',
                'pva://testIOC:MTextUpdate5'

              ]}
                maxLength={256}/>


          </div>



            {/*}  <TextUpdateMultiplePVs  pv='pva://testIOC:MTextUpdate1' macros={this.props['macros']} usePvLabel={true}  />
            <br/>
            <TextUpdateMultiplePVs  pv='pva://testIOC:MTextUpdate2.NAME' macros={this.props['macros']}   />
            <br/>
            <TextUpdateMultiplePVs  pv='pva://testIOC:MTextUpdate2' macros={this.props['macros']} usePvLabel={true}  />
            <br/>
            <TextUpdateMultiplePVs  pv='pva://testIOC:MTextUpdate3.NAME' macros={this.props['macros']}   />
            <br/>
            <TextUpdateMultiplePVs  pv='pva://testIOC:MTextUpdate3' macros={this.props['macros']} usePvLabel={true}  />
            <br/>
          */}



        </div>
      </div>

          );
          }
          }

          ComponentsWithMultiplePVs.contextType=AutomationStudioContext;
export default withStyles(styles)(ComponentsWithMultiplePVs)
