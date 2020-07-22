import React, { useState, useEffect, useContext, useReducer } from 'react';
import { replaceMacros } from '../SystemComponents/Utils/macroReplacement';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextUpdate from '../BaseComponents/TextUpdate';
import TextInput from '../BaseComponents/TextInput';
import ToggleButton from '../BaseComponents/ToggleButton';
import TextOutput from '../BaseComponents/TextOutput';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import PV from '../SystemComponents/PV';
import { LanDisconnect } from 'mdi-material-ui/'
import useMongoDbWatch from '../SystemComponents/database/MongoDB/useMongoDbWatch'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1) * 0,
    overflowX: 'auto',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 500,
  },
  tableCell: {
    width: "20%"
  },
  tableWrapper: {
    maxHeight: "70vh",
    overflow: 'auto',
  },
  workingButton: {
    color: theme.palette.type === 'dark' ? 'white' : 'black',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  pendingButton: {
    color: theme.palette.type === 'dark' ? 'white' : 'black',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
  obseleteButton: {
    color: theme.palette.type === 'dark' ? 'white' : 'black',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  tableCellWorking: {
    width: "20%",
    backgroundColor: green[500],
  },
  tableCellPending: {
    width: "20%",
    backgroundColor: orange[500],
  },
  tableCellObselete: {
    width: "20%",
    backgroundColor: red[500],
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function compare(a, b) {
  if (a.beam_setup.Frequency > b.beam_setup.Frequency) return 1;
  if (b.beam_setup.Frequency > a.beam_setup.Frequency) return -1;
  return 0;
}
function compareValues(a, b, initialized) {
  //console.log(initialized)
  if (initialized == true) {
    if (a == b) {
      return true
    }
    else {
      if (!(isNaN(a) || isNaN(b))) {
        let afloat = parseFloat(a);
        let bfloat = parseFloat(b);
        if ((afloat == NaN) || (bfloat == NaN)) {
          return false
        }
        else {
          return (afloat == bfloat)
        }
      }
      else {
        return false
      }
    }
  }
  else {
    return false
  }
}
const LoadSave = (props) => {

  // let pv;
  // let DataConnections = [];
  // let sys;
  // let id = 0;
  const systemName = props.macros['$(systemName)'];
  const dbListQueryParameters = { 'query': { "beam_setup.Status": { "$ne": "Delete" } } };
  const Parameters = JSON.stringify(dbListQueryParameters);
  const database = props.database;
  const collection = props.collection;
  const [dbListBroadcastReadDataURL] = useState('mongodb://' + database + ':' + collection + ':' + systemName + '_DATA:Parameters:' + Parameters)
  const [dbListBroadcastReadPvsURL] = useState('mongodb://' + database + ':' + collection + ':' + systemName + '_PVs:Parameters:""')
  const [dbListUpdateOneURL] = useState('mongodb://' + database + ':' + collection + ':' + systemName + '_DATA')
  const [dbListInsertOneURL] = useState('mongodb://' + database + ':' + collection + ':' + systemName + '_DATA')
  const [pvs, setPvs] = useState({});
  const systems = props.systems;
  const [dbList, setDbList] = useState([]);
  const [processVariablesSchemaKeys, setProcessVariablesSchemaKeys] = useState([]);

  const [displayIndex, setDisplayIndex] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [dbListWriteAccess, setDbListWriteAccess] = useState(false);

  const [newValuesLoaded, setNewValuesLoaded] = useState(false);
  const [metadataComponents, setMetadataComponents] = useState([]);
  const [metadataComponentsPVs, setMetadataComponentsPVs] = useState([]);
  const [processVariables, setProcessVariables] = useState({});
  const context = useContext(AutomationStudioContext);
  const [metadataPvs, setMetadataPvs] = useState({});
  //const [dbPVsList, setDbPVsList] = useState({});
  const dbPVsObject=useMongoDbWatch(dbListBroadcastReadPvsURL);
  
  const dbPVsList=dbPVsObject.data;
  const dbDataObject=useMongoDbWatch(dbListBroadcastReadDataURL);
  useEffect(() => {
   

      let data = dbDataObject.data;
      if(data!==null){
      let sortedData = data.sort(compare);
      setDbList(sortedData);
      setDbListWriteAccess(dbDataObject.writeAccess);}
    },[dbDataObject]);

  
  const dbDataAndLiveDataReducer = (state, action) => {
    let newState = {};
    let newProcessVariables;
    switch (action.type) {
      case 'initPvList':
        // console.log("initPvList", action.index)
        return { ...action.data }
      case 'initDbDataList':

        let key;
        let pvValue;
        let newValue;
        let newValueTrigger;
        let initialized;
        let severity;
        let metadata = {};
        for (key in processVariablesSchemaKeys) {
          if (typeof state[processVariablesSchemaKeys[key]] !== 'undefined') {
            if (typeof state[processVariablesSchemaKeys[key]].pvValue !== 'undefined') {
              pvValue = state[processVariablesSchemaKeys[key]].pvValue;
            }
            else {
              pvValue = undefined;
            }
            if (typeof state[processVariablesSchemaKeys[key]].newValue !== 'undefined') {
              newValue = state[processVariablesSchemaKeys[key]].newValue;
            }
            else {
              newValue = undefined;
            }
            if (typeof state[processVariablesSchemaKeys[key]].newValueTrigger !== 'undefined') {
              newValueTrigger = state[processVariablesSchemaKeys[key]].newValueTrigger;
            }
            else {
              newValueTrigger = 0;
            }
            if (typeof state[processVariablesSchemaKeys[key]].initialized !== 'undefined') {
              initialized = state[processVariablesSchemaKeys[key]].initialized;
            }
            else {
              initialized = false;
            }
            if (typeof state[processVariablesSchemaKeys[key]].severity !== 'undefined') {
              severity = state[processVariablesSchemaKeys[key]].severity;
            }
            else {
              severity = 0;
            }
            if (typeof state[processVariablesSchemaKeys[key]].metadata !== 'undefined') {
              metadata = state[processVariablesSchemaKeys[key]].metadata;
            }
            else {
              metadata = {};
            }
          }
          else {
            pvValue = undefined;
            newValue = undefined;
            newValueTrigger = 0;
            initialized = false;
            severity = 0;
            metadata = {};
          }
          let description = processVariables[processVariablesSchemaKeys[key]].description;

          let pvName = processVariables[processVariablesSchemaKeys[key]].pvName;
          let dbValue = dbList[displayIndex].process_variables[processVariablesSchemaKeys[key]].pvValue
          newState[processVariablesSchemaKeys[key]] = { description: description, pvname: pvName, pvValue: pvValue, newValue: newValue, newValueTrigger: newValueTrigger, dbValue: dbValue, metadata: metadata, initialized: initialized, severity: severity }
        }

        return newState

      case 'initDbDataListNoData':
        //   console.log("initDbDataListNoData")

        for (let key in processVariablesSchemaKeys) {
          if (typeof state[processVariablesSchemaKeys[key]] !== 'undefined') {
            newState[processVariablesSchemaKeys[key]] = state[processVariablesSchemaKeys[key]];
            newState[processVariablesSchemaKeys[key]].dbValue = undefined;
            newState[processVariablesSchemaKeys[key]].newValue = undefined;
          }
        }
        return newState


      case 'updatePvData':
        //   console.log("updating:", action.key)
        newState = { ...state };
        //console.log(action.key)
        newState[action.key].initialized = action.pvData.initialized;
        newState[action.key].pvValue = action.pvData.value;
        newState[action.key].severity = action.pvData.severity;
        newState[action.key].metadata = action.pvData.metadata;
        return newState
      case 'changeRowIndex':
        newProcessVariables = dbList[action.index].process_variables;
        newState = { ...state };
        if (processVariablesSchemaKeys[0]) {
          let key;
          for (key in processVariablesSchemaKeys) {
            newState[processVariablesSchemaKeys[key]].dbValue = newProcessVariables[processVariablesSchemaKeys[key]].pvValue;
          }
        }
        setDisplayIndex(action.index);
        return (newState)


      case 'loadSavedValueToNewValues':

        newProcessVariables = dbList[displayIndex].process_variables;
        newState = { ...state };
        if (processVariablesSchemaKeys[0]) {
          let key;
          for (key in processVariablesSchemaKeys) {
            newState[processVariablesSchemaKeys[key]].newValue = newProcessVariables[processVariablesSchemaKeys[key]].pvValue;
          }
        }
        setNewValuesLoaded(true);





        return (newState)

      case 'writeNewValuesToPvValues':

        newProcessVariables = dbList[displayIndex].process_variables;
        newState = { ...state };
        if (processVariablesSchemaKeys[0]) {
          let key;
          for (key in processVariablesSchemaKeys) {
            newState[processVariablesSchemaKeys[key]].pvValue = newState[processVariablesSchemaKeys[key]].newValue;
            newState[processVariablesSchemaKeys[key]].newValueTrigger++
          }
        }




    }

    return (newState)




  }
  const [dbDataAndLiveData, dispatchDbDataAndLiveData] = useReducer(dbDataAndLiveDataReducer, {});


  useEffect(() => {
    if (dbPVsList !== null) {
      console.log(dbPVsList)
      let processVariables = dbPVsList[0].process_variables;
      let newProcessVariablesSchemaKeys = Object.keys(dbPVsList[0].process_variables);
      let metadataComponents = dbPVsList[0].metadata.components;
      // console.log(metadataComponents)
      let oldDbDataAndLiveData = dbDataAndLiveData;
      let newDbDataAndLiveData = {}
      let metadataComponentsPVs = [];
      let component;
      let pvname;
      for (component in metadataComponents) {

        pvname = replaceMacros(metadataComponents[component].props.pv, props.macros)


        metadataComponentsPVs.push({ label: "", initialized: false, pvname: pvname, value: "", metadata: {}, componentProps: metadataComponents[component].props });
      }
      let key;
      for (key in newProcessVariablesSchemaKeys) {
        let description = processVariables[newProcessVariablesSchemaKeys[key]].description;
        let pvName = processVariables[newProcessVariablesSchemaKeys[key]].pvName
        if (oldDbDataAndLiveData[newProcessVariablesSchemaKeys[key]]) {
          if (oldDbDataAndLiveData[newProcessVariablesSchemaKeys[key]].pvname == pvName) {
            newDbDataAndLiveData[newProcessVariablesSchemaKeys[key]] = oldDbDataAndLiveData[newProcessVariablesSchemaKeys[key]];
            newDbDataAndLiveData[newProcessVariablesSchemaKeys[key]].description = description;
          }
        }
        else {
          newDbDataAndLiveData[newProcessVariablesSchemaKeys[key]] = { description: description, pvname: pvName, pvValue: undefined, newValue: undefined, newValueTrigger: 0, dbValue: undefined, metadata: {}, initialized: false, severity: 0 }
        }
      }
      
      setProcessVariablesSchemaKeys(newProcessVariablesSchemaKeys);
      dispatchDbDataAndLiveData({ type: 'initPvList', data: newDbDataAndLiveData });
      setProcessVariables(processVariables);
      setMetadataComponents(metadataComponents);
      setMetadataComponentsPVs(metadataComponentsPVs);
    }
  }, [dbPVsList])

  // useEffect(() => {
  //   if (processVariablesSchemaKeys.length > 0) {
     
  //  //   useMongoDbBroadcastRead(dbListBroadcastReadDataURL);
  //     let socket = context.socket;
  //     let jwt = JSON.parse(localStorage.getItem('jwt'));
  //     if (jwt === null) {
  //       jwt = 'unauthenticated'
  //     }

  //     socket.emit('databaseBroadcastRead', { dbURL: dbListBroadcastReadDataURL, 'clientAuthorisation': jwt }, (data) => {
  //       if (data !== "OK") {
  //         console.log("ackdata", data);
  //       }
       
  //     });
  //   }
  // }, [processVariablesSchemaKeys])

  useEffect(() => {

    if (typeof dbList[0] !== 'undefined') {
      //  console.log("defined")
      if (dbList[0]) {





        dispatchDbDataAndLiveData({ type: 'initDbDataList' });

      }


    }
    else {




      dispatchDbDataAndLiveData({ type: 'initDbDataListNoData' });

    }
  }, [dbList, processVariablesSchemaKeys])
  // useEffect(() => {
   

  //   const handleNewDbDataList = (msg) => {
  //     // console.log("receive handleNewDbDataList")
  //     let item;
  //     let data = JSON.parse(msg.data);
  //     let sortedData = data.sort(compare);
  //     setDbList(sortedData);
  //     setDbListWriteAccess(msg.write_access);


  //   }

  //   let socket = context.socket;
  //   let jwt = JSON.parse(localStorage.getItem('jwt'));
  //   if (jwt === null) {
  //     jwt = 'unauthenticated'
  //   }
  //   // socket.emit('databaseBroadcastRead', { dbURL: dbListBroadcastReadPvsURL, 'clientAuthorisation': jwt }, (data) => {
  //   //   if (data !== "OK") {
  //   //     //   console.log("ackdata", data);
  //   //   }
  //   // });

   
  //   //socket.on('databaseData:' + dbListBroadcastReadDataURL, handleNewDbDataList);
  // }, [])




  // handleOnClick = (index) => () => {


  //   let process_variables = dbList[index].process_variables;

  //   if (processVariablesSchemaKeys[0]) {
  //     let key;
  //     for (key in processVariablesSchemaKeys) {
  //       dbDataAndLiveData[processVariablesSchemaKeys[key]].dbValue = process_variables[processVariablesSchemaKeys[key]].pvValue;
  //     }
  //   }
  //   this.setState({ displayIndex: index, dbDataAndLiveData: dbDataAndLiveData })
  // }
  // handleLoadSelectedValues = () => {
  //   let index = this.state.displayIndex;
  //   let processVariablesSchemaKeys = this.state.processVariablesSchemaKeys;
  //   let dbDataAndLiveData = this.state.dbDataAndLiveData;
  //   let key;
  //   for (key in processVariablesSchemaKeys) {
  //     dbDataAndLiveData[processVariablesSchemaKeys[key]].newValue = dbDataAndLiveData[processVariablesSchemaKeys[key]].dbValue;
  //   }
  //   this.setState({ dbDataAndLiveData: dbDataAndLiveData, newValuesLoaded: true })
  // }
  const handleSavedValues = () => {
    let index = displayIndex;

    let key;
    // console.log("save")
    // console.log(dbList[0])
    let newEntry = {};
    newEntry['process_variables'] = {}
    newEntry['beam_setup'] = {}
    let component;
    //console.log(metadataPvs)
    for (component in metadataComponentsPVs) {
      //console.log(metadataPvs[component])
      let key;
      if (metadataComponentsPVs[component].componentProps.usePvLabel === true) {
        key = metadataComponentsPVs[component].label;
      }
      else {
        key = metadataComponentsPVs[component].componentProps.label;
      }
      newEntry.beam_setup[key] = metadataComponentsPVs[component].value;
    }
    let mydate = new Date();
    let day = mydate.getDate();
    let month = mydate.getMonth() + 1;
    let year = mydate.getFullYear();
    let hour = mydate.getHours();
    let min = mydate.getMinutes();
    let sec = mydate.getSeconds();
    let ms = mydate.getMilliseconds()
    if (hour < 10) {
      hour = '0' + hour;

    }
    else if (ms < 100) {
      ms = '0' + ms;
    }
    let value;
    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    value = day + "-" + month + "-" + year + " " + hour + ':' + min;
    newEntry.beam_setup['DateTime'] = value;
    newEntry.beam_setup['Status'] = "Pending";
    for (key in processVariablesSchemaKeys) {
      newEntry.process_variables[processVariablesSchemaKeys[key]] = { pvName: dbDataAndLiveData[processVariablesSchemaKeys[key]].pvname, pvValue: dbDataAndLiveData[processVariablesSchemaKeys[key]].pvValue };
    }
    // console.log(newEntry)
    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    socket.emit('databaseInsertOne', { dbURL: dbListInsertOneURL, 'newEntry': newEntry, 'clientAuthorisation': jwt }, (data) => {
     
      if (data !== "OK") {
        console.log("Save values unsuccessful")
      }
    });
  }
 
  const handleOnClickWorking = () => {
  
    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    let id = dbList[displayIndex]['_id']['$oid'];
    let newvalues = { '$set': { "beam_setup.Status": "Working" } }
    socket.emit('databaseUpdateOne', { dbURL: dbListUpdateOneURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
      console.log("ackdata", data);
      if (data !== "OK") {
        
        console.log("set status: working  unsuccessful")
      }
    });
  }
  const handleOnClickPending = () => {
    //  console.log('marking row index working', displayIndex);

    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    let id = dbList[displayIndex]['_id']['$oid'];
    let newvalues = { '$set': { "beam_setup.Status": "Pending" } }
    socket.emit('databaseUpdateOne', { dbURL: dbListUpdateOneURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
      console.log("ackdata", data);
      if (data !== "OK") {
       
        console.log("set status: pending  unsuccessful")
      }
    });
  }
  const handleOnClickObselete = () => {

    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    let id = dbList[displayIndex]['_id']['$oid'];
    let newvalues = { '$set': { "beam_setup.Status": "Obselete" } }
    socket.emit('databaseUpdateOne', { dbURL: dbListUpdateOneURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
      console.log("ackdata", data);
      if (data !== "OK") {
        
        console.log("set status: Obselete  unsuccessful")
      }
    });
  }
  const handleOnClickDelete = () => {

    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    let id = dbList[displayIndex]['_id']['$oid'];
    let newvalues = { '$set': { "beam_setup.Status": "Delete" } }
    if (displayIndex >= 1) {
      setDisplayIndex(displayIndex - 1);
    }
    else {
      setDisplayIndex(0);
    }
    socket.emit('databaseUpdateOne', { dbURL: dbListUpdateOneURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
      //console.log("ackdata", data);

      if (data !== "OK") {
        
        console.log("set status: Delete  unsuccessful")
      }
    });
  }



  // const metadataPVsDataConnections = () => {

  //   let DataConnections = [];

  //   let metadataComponents = this.state.metadataComponents;
  //   let item;
  //   for (item in metadataComponents) {
  //     const index = item;
  //     DataConnections.push(
  //       <PV
  //         key={metadataComponents[item].props.pv}
  //         {...metadataComponents[item].props}
  //         pvData=
  //       />
  //     )
  //   }
  //   return DataConnections;
  // }

  const metadataPvsConnections = () => {
    let pvs = [];


    metadataComponentsPVs.map((item, index) => (

      pvs.push(
        <PV

          key={index.toString()}
          //pv={item.pvname}
          {...item.componentProps}
          pvData={(pvData) => setMetadataComponentsPVs(prePvs => {

            let pvs = [...prePvs]

            pvs[index] = { ...pvs[index], ...pvData }

            return pvs

          }
          )}
        />)
    ))



    return pvs
  }


  // multipleDataConnections = () => {
  //   let pv;
  //   let DataConnections = [];
  //   let id = 0;
  //   let pvs = this.state.pvs;
  //   let key;
  //   let pvKeys = Object.keys(pvs)
  //   for (key in pvKeys) {
  //     DataConnections.push(
  //       <DataConnection key={this.state.pvs[pvKeys[key]].pvname + id}
  //         pv={this.state.pvs[pvKeys[key]].pvname}
  //         handleInputValue={this.handleInputValue(pvKeys[key])}
  //         handleMetadata={this.handleMetadata(pvKeys[key])}
  //       />
  //     )
  //   }
  //   return DataConnections;
  // }
  const SystemsDataConnections = () => {
    const pvs = [];
    let id = 0;

    for (
      const key in processVariablesSchemaKeys) {
      const item = processVariablesSchemaKeys[key];
      //  console.log(dbDataAndLiveData[processVariablesSchemaKeys[key]])
      pvs.push(
        <PV
          key={dbDataAndLiveData[item].pvname + id.toString()}
          pv={dbDataAndLiveData[item].pvname}
          //   handleInputValue={this.handleDbListInputValue(item)}
          //   handleMetadata={this.handleDbListMetadata(item)}
          // handleDbListInputValue = (key) => (inputValue, pvname, initialized, severity) => {
          //   let dbDataAndLiveData = this.state.dbDataAndLiveData;
          //   if (initialized) {
          //     dbDataAndLiveData[key].pvValue = inputValue;
          //   }
          //   dbDataAndLiveData[key].initialized = initialized;
          //   dbDataAndLiveData[key].severity = severity;
          //   this.setState({ dbDataAndLiveData: dbDataAndLiveData });
          // }
          // handleDbListMetadata = (key) => (metadata) => {
          //   let dbDataAndLiveData = this.state.dbDataAndLiveData;
          //   dbDataAndLiveData[key].metadata = metadata;
          //   this.setState({ dbDataAndLiveData: dbDataAndLiveData });
          //   pvData={(pvData) => setDbDataAndLiveData(prePvs => {
          //     let pvs = {...prePvs};

          //     pvs[item].pvValue = pvData.value;
          //     pvs[item].initialized = pvData.initialized;
          //     pvs[item].severity = pvData.severity;
          //     pvs[item].metadata = pvData.metadata;
          //   //  console.log(item,pvData)
          //   //  console.log(key,pvData)

          //     return pvs

          //  }
          //   )}
          pvData={(pvData) => dispatchDbDataAndLiveData({ type: 'updatePvData', pvData: pvData, key: item })}
          outputValue={dbDataAndLiveData[item].pvValue}
          newValueTrigger={dbDataAndLiveData[item].newValueTrigger}
        />
      );
      id++;
    }
    return pvs;
  }
  const pvValueTextUpdate = (pv) => {
    const initialized = pv.initialized;
    const pvValue = pv.pvValue;
    const pvName = pv.pvname;
    if (initialized) {
      return pvValue;
    }
    else {
      return (
        <React.Fragment>
          <LanDisconnect style={{ color: props.theme.palette.error.main, verticalAlign: "middle" }} fontSize='small' />   {pvName}
        </React.Fragment>
      );
    }
  }

  const { classes } = props;

  let item;
  let rows = [];
  let process_variables2;
  let disableDeleteButton = true;

  let disableLoadButton = true;
  if (typeof dbList[displayIndex] !== 'undefined') {
    disableLoadButton = false
    if (dbList[displayIndex].beam_setup.Status == "Obselete") {
      disableDeleteButton = false;
    }
    else {
      disableDeleteButton = true;
    }
  }
  else {
    disableLoadButton = true;
  }
  //const dbListWriteAccess = !dbListWriteAccess;
  const dbDataAndLiveDataKeys = Object.keys(dbDataAndLiveData);
  // console.log("this.state.metadataComponentsPVs",metadataComponentsPVs)
  // console.log("metadataComponents",metadataComponents)
  // console.log("metadataPvs",metadataPvs)
  // console.log("dbList",dbList)
  // console.log("dbDataAndLiveDataKeys",dbDataAndLiveDataKeys)
  //console.log(dbDataAndLiveData)
  //console.log(processVariablesSchemaKeys)
  return (
    <React.Fragment>
      {metadataPvsConnections()}
      {SystemsDataConnections()}

      {/* {this.multipleDataConnections()}

        {this.SystemsDataConnections(this.state.displayIndex)}
        {this.metadataPVsDataConnections()} */}
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        style={{ padding: 8 }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Card style={{ padding: 8 }}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
            > {metadataComponents.map((item, index) => (
              <Grid key={index.toString()} item xs={12} sm={12} md={3} lg={2} >
                {item.component == "TextInput" &&
                  <TextInput
                    macros={props.macros}
                    {...item.props}
                  />
                }
                {item.component == "TextOutput" &&
                  <TextOutput
                    macros={props.macros}
                    {...item.props}
                  />}
              </Grid>
            )
            )
              }
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5} >
          <Card>
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {metadataComponentsPVs.map((item, index) =>
                        <TableCell key={index.toString()} align="center">{item.componentProps.usePvLabel === true ? item.label : item.componentProps.label}  {item.componentProps.usePvUnits === true ? '[' + item.units + ']' : typeof item.componentProps.units !== 'undefined' ? '[' + item.componentProps.units + ']' : ""}</TableCell>
                      )}
                      <TableCell align="center">Date </TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dbList.map((row, index) => (
                      <TableRow key={index.toString()} hover role="checkbox"
                        onClick={() => dispatchDbDataAndLiveData({ type: 'changeRowIndex', index: index })}
                        selected={index == displayIndex}>
                        {metadataComponentsPVs.map((item, index) =>
                          <TableCell key={index.toString()} align="center">{row.beam_setup[item.componentProps.usePvLabel === true ? item.label : item.componentProps.label]}  </TableCell>
                        )}
                        <TableCell className={classes.tableCell} component="th" scope="row" align='center'>
                          {row.beam_setup.DateTime}
                        </TableCell>
                        <TableCell className={row.beam_setup.Status == "Working" ? classes.tableCellWorking : row.beam_setup.Status == "Pending" ? classes.tableCellPending : row.beam_setup.Status == "Obselete" ? classes.tableCellObselete : classes.tableCell} component="th" scope="row" align='center'>
                          <span >
                            {row.beam_setup.Status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={7} >
          <Card>
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Device Description</TableCell>
                      <TableCell align="center">Saved Value</TableCell>
                      <TableCell align="center">New Value</TableCell>
                      <TableCell align="center">PV Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dbDataAndLiveDataKeys.map((value, index) => (
                      <TableRow key={index.toString()} hover role="checkbox" >
                        <TableCell className={classes.tableCell} component="th" scope="row" >
                          {dbDataAndLiveData[value].description}
                        </TableCell>
                        <TableCell className={classes.tableCell} style={{ backgroundColor: compareValues(dbDataAndLiveData[value].dbValue, dbDataAndLiveData[value].pvValue, dbDataAndLiveData[value].initialized) ? green[500] : undefined }} align="center">
                          {dbDataAndLiveData[value].dbValue}
                        </TableCell>
                        <TableCell className={classes.tableCell} style={{ backgroundColor: compareValues(dbDataAndLiveData[value].newValue, dbDataAndLiveData[value].pvValue, dbDataAndLiveData[value].initialized) ? green[500] : undefined }} align="center">
                          {dbDataAndLiveData[value].newValue}
                        </TableCell>
                        <TableCell className={classes.tableCell} style={{ backgroundColor: (compareValues(dbDataAndLiveData[value].newValue, dbDataAndLiveData[value].pvValue, dbDataAndLiveData[value].initialized) || compareValues(dbDataAndLiveData[value].dbValue, dbDataAndLiveData[value].pvValue, dbDataAndLiveData[value].initialized)) ? green[500] : undefined }} align="center">
                          {/* {pvValueTextUpdate(dbDataAndLiveData[value])}*/}
                          <TextUpdate pv={dbDataAndLiveData[value].pvname} alarmSensitive={true} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5} >
          <Card>
            <AppBar position="static" color="inherit">
              <Tabs aria-label="simple tabs example" value={tabValue}
                onChange={(event, value) => setTabValue(value)}
              >
                <Tab label="Operator" />
                <Tab label="Advanced" />
              </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.Button}
                    onClick={() => dispatchDbDataAndLiveData({ type: 'loadSavedValueToNewValues' })}
                    disabled={disableLoadButton}
                  >
                    Load New Values
                        </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  {props.useLoadEnable === true &&

                    <PV

                      pv={props.loadEnablePV}
                      macros={props.macros}
                    >
                      {({ initialized, value }) => (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.Button}
                          onClick={() => dispatchDbDataAndLiveData({ type: 'writeNewValuesToPvValues' })}
                          disabled={(!newValuesLoaded) || (initialized == false) || (value != 0)}
                        >
                          Write New Values
                        </Button>
                      )
                      }
                    </PV>
                  }
                  {props.useLoadEnable === false && <Button
                    variant="contained"
                    color="primary"

                    className={classes.Button}
                    onClick={() => dispatchDbDataAndLiveData({ type: 'writeNewValuesToPvValues' })}
                    disabled={(!newValuesLoaded)}
                  >
                    Write New Values
                    </Button>}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.Button}
                    onClick={handleSavedValues}
                  >
                    Save Values
                        </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} >
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  <Button
                    variant="contained"
                    className={classes.workingButton}
                    onClick={handleOnClickWorking}
                    disabled={!dbListWriteAccess}
                  >
                    Working
                        </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  <Button
                    variant="contained"
                    className={classes.pendingButton}
                    onClick={handleOnClickPending}
                    disabled={!dbListWriteAccess}
                  >
                    Pending
                        </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  <Button
                    variant="contained"
                    className={classes.obseleteButton}
                    onClick={handleOnClickObselete}
                    disabled={!dbListWriteAccess}
                  >
                    Obselete
                        </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={handleOnClickDelete}
                    disabled={disableDeleteButton || !dbListWriteAccess}
                  >
                    Delete
                        </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Card>
        </Grid>
        {props.useLoadEnable && <React.Fragment>
          {(typeof props.loadEnablePV !== 'undefined' && props.showLoadEnableButton === true) && <Grid item xs={12} sm={12} md={12} lg={1} >
            {typeof props.loadEnableLabel !== 'undefined' && <h4 style={{ margin: 0 }}>{props.loadEnableLabel}</h4>}
            <Card style={{ padding: 8 }}>
              <ToggleButton pv={props.loadEnablePV} macros={props.macros} custom_selection_strings={["OFF", "ON"]} />
            </Card>
          </Grid>}
        </React.Fragment>
        }
      </Grid>
    </React.Fragment>
  );
}

LoadSave.propTypes = {
  /** if true, when the value of loadEnablePV does not equal 0, then the new values can be loaded into the pv values*/
  useLoadEnable: PropTypes.bool
};
LoadSave.defaultProps = {
  useLoadEnable: false
}

export default withStyles(styles, { withTheme: true })(LoadSave);
