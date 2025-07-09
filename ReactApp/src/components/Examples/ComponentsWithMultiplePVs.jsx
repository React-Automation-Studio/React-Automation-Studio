import React, { useContext } from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';

import GraphY from '../BaseComponents/GraphY';
import TextUpdateMultiplePVs from '../BaseComponents/TextUpdateMultiplePVs';

import { useTheme } from '@mui/material/styles';

const ComponentsWithMultiplePVs = (props) => {
  const theme = useTheme();
  const context = useContext(AutomationStudioContext);

  return (
    <div style={{ ...theme.typography.body1, padding: 24 }}>
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
          ]} usePvLabel={true} macros={props['macros']}   />
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
};

export default ComponentsWithMultiplePVs;
