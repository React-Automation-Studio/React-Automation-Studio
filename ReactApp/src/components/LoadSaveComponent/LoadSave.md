
<img src="img/loadSave/loadSave.png" alt="loadSave" width="100%"/> 
*Fig 1. A screenshot of the LoadSave component.*

<img src="img/loadSave/loadSave2.png" alt="loadSave" width="100%"/> 
*Fig 2. A screenshot of the LoadSave component showing the life cycle management buttons.*

Example: 

```js static
import React from 'react';
import LoadSave from 'path to ../LoadSaveComponent/LoadSave';
import TraditionalLayout from ' path to /UI/Layout/ComposedLayouts/TraditionalLayout';
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

```

### Seeding data: 

A Python script to seed a loadSave database example exists in the installation folder under:
loadSaveDbInit/initDB.py
A dockerfile that can run it exists in:
docker/loadSaveDbInit/Dockerfile
This docker file is used by the docker-compose yaml files to build the demo loadSave database.
The script creates two collections within an MongoDb database. One for the data and one for the list of pvs and metadata to save.

Inputs to the script are metadataConfig.json and the process_variables.txt

Configure the metadataConfig.json in the following format for example with your own pvs, TextInput or TextOuput components and props:
``` json static
{
    "components": [
        {
            "component": "TextOutput",
            "props": {
                "pv": "testIOC:rf_frequency",
                "label": "RF Frequency",
                "usePvUnits": true
            }
        },
        {
            "component": "TextInput",
            "props": {
                "pv": "testIOC:energy",
                "label": "Energy",
                "usePvUnits": true
            }
        },
        {
            "component": "TextInput",
            "props": {
                "pv": "testIOC:description",
                "label": "Description"
            }
        }
    ]
}
```    
These components will be displayed at the top of the load save component. And the values of the meta data component will be saved with data.

The process_variables.txt defines the list of process variables to save.

The script uses pv name with the special characters removed and replaced with spaces to key value pairs in the database.

Currently only the script can be used to seed the database, in future the client UI should be able to do this too.

Once the database is seeded PVs and metadata can be removed or added using MongoDB compass.





