import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';

import GraphY from '../BaseComponents/GraphY';
import TextUpdateMultiplePVs from '../BaseComponents/TextUpdateMultiplePVs';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  body1: theme.typography.body1,
});

class ComponentsWithMultiplePVs extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  render() {
    const {classes} = this.props;

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
              'testIOC:MTextUpdate1',
              'testIOC:MTextUpdate2',
              'testIOC:MTextUpdate3',
              'testIOC:MTextUpdate4',
              'testIOC:MTextUpdate5'
            ]} usePvLabel={true} macros={this.props['macros']}   />
          <br/>
          <h2>
            GraphY:
          </h2>
          <div style={{width:'800px', height: '400px'}}>
            <GraphY
              pvs={[
                'testIOC:MTextUpdate1',
                'testIOC:MTextUpdate2',
                'testIOC:MTextUpdate3',
                'testIOC:MTextUpdate4',
                'testIOC:MTextUpdate5'
              ]}
              maxLength={256}/>
          </div>
        </div>
      </div>
    );
  }
}

ComponentsWithMultiplePVs.contextType=AutomationStudioContext;

export default withStyles(styles)(ComponentsWithMultiplePVs)
