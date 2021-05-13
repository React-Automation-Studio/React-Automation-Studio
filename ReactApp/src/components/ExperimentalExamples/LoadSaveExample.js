import React from 'react';
import LoadSave from '../LoadSaveComponent/LoadSave';
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout';
const LoadSaveExample = (props) => {
  return (
    <TraditionalLayout
      title="Load Save Example"
      denseAppBar
      alignTitle="center"
    >
      <div style={{padding:8}}>
      <LoadSave
        host='LOADSAVE_DATABASE'
        database='testIOCSystems'
        macros={{ '$(systemName)': 'testIOC' }}
        loadEnablePV={'$(systemName):loadSaveEnable'}
        loadEnableLabel={'System On/Off'}
        showLoadEnableButton={true}
        useLoadEnable={true}
      />
      </div>
    </TraditionalLayout>
  );
}
export default LoadSaveExample;
