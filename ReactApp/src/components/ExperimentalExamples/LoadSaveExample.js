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
        database='LOADSAVE_DATABASE'
        collection='testIOCSystems'
        macros={{ '$(systemName)': 'testIOC' }}
        loadEnablePV={'pva://$(systemName):loadSaveEnable'}
        loadEnableLabel={'System On/Off'}
        showLoadEnableButton={true}
        useLoadEnable={true}
      />
      </div>
    </TraditionalLayout>
  );
}
export default LoadSaveExample;
