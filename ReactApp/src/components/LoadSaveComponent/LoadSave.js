import React, { useState, useEffect, useReducer } from 'react';
import { replaceMacros } from '../SystemComponents/Utils/macroReplacement';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextUpdate from '../BaseComponents/TextUpdate';
import TextInput from '../BaseComponents/TextInput';
import ToggleButton from '../BaseComponents/ToggleButton';
import TextOutput from '../BaseComponents/TextOutput';
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
import Paper from '@material-ui/core/Paper';
import PV from '../SystemComponents/PV';
import useMongoDbWatch from '../SystemComponents/database/MongoDB/useMongoDbWatch'
import useMongoDbUpdateOne from '../SystemComponents/database/MongoDB/useMongoDbUpdateOne';
import useMongoDbInsertOne from '../SystemComponents/database/MongoDB/useMongoDbInsertOne';
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
  tableCellDescription: {
    width: "30%"
  },
  tableCellValues: {
    width: "20%"
  },
  tableCellUnits: {
    width: "10%",
  
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
function compare(a, b) {
  if (a.beam_setup.Frequency > b.beam_setup.Frequency) return 1;
  if (b.beam_setup.Frequency > a.beam_setup.Frequency) return -1;
  return 0;
}
function compareValues(a, b, initialized) {
  if (initialized === true) {
    
    // eslint-disable-next-line eqeqeq 
    if (a == b) {
      return true
    }
    else {
      // eslint-disable-next-line use-isnan 
      if (!(isNaN(a) || isNaN(b))) {
        let afloat = parseFloat(a);
        let bfloat = parseFloat(b);
         // eslint-disable-next-line use-isnan 
        if ((isNaN(afloat)) || (isNaN(bfloat))) {
          return false
        }
        else {
          // eslint-disable-next-line eqeqeq 
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
/**
* This is a preview LoadSave component. This component is built on a React Automation Studio based front end that connects 
* to MongoDB database that contains the saved settings data. The saved settings data can then be written to live processes variables in a controlled way by first loading the saved values to new values and then finally writing the new values to pv values.
* The component can also be configured to display write meta along with the data that is saved to the database. The life cycle of the saved settings can also  be managed on the advanced tab.

* 
* The LoadSave component is still in preview and may change in future releases. Follow the seeding section is the Style
* Guide to deploy the LoadSave for testing and experimentation.
* <br/><br/>
*/

const LoadSave = (props) => {
  const systemName = props.macros['$(systemName)'];
  const dbListQueryParameters = { 'query': { "beam_setup.Status": { "$ne": "Delete" } } };
  const Parameters = JSON.stringify(dbListQueryParameters);
  const host = props.host;
  const database = props.database;
  const [dbListBroadcastReadDataURL] = useState('mongodb://' + host + ':' + database + ':' + systemName + '_DATA:Parameters:' + Parameters)
  const [dbListBroadcastReadPvsURL] = useState('mongodb://' + host + ':' + database + ':' + systemName + '_PVs:Parameters:""')
  const [dbListUpdateOneURL] = useState('mongodb://' + host + ':' + database + ':' + systemName + '_DATA')
  const [dbListInsertOneURL] = useState('mongodb://' + host + ':' + database + ':' + systemName + '_DATA')
  const [dbList, setDbList] = useState([]);
  const [processVariablesSchemaKeys, setProcessVariablesSchemaKeys] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [dbListWriteAccess, setDbListWriteAccess] = useState(false);
  const [newValuesLoaded, setNewValuesLoaded] = useState(false);
  const [metadataComponents, setMetadataComponents] = useState([]);
  const [metadataComponentsPVs, setMetadataComponentsPVs] = useState([]);
  const [processVariables, setProcessVariables] = useState({});
  const dbUpdateOne=useMongoDbUpdateOne({});
  const dbInsertOne=useMongoDbInsertOne({});
  const dbPVsObject=useMongoDbWatch({dbURL:dbListBroadcastReadPvsURL});
  
  const dbPVsList=dbPVsObject.data;
  const dbPVsInitialized=dbPVsObject.initialized;
  const dbDataObject=useMongoDbWatch({dbURL:dbListBroadcastReadDataURL});
  const dbDataInitialized=dbDataObject.initialized;
  const [loadTimedOut,setLoadTimedOut]=useState(false);
  const {theme}=props;
  useEffect(() => {
   
      let data = dbDataObject.data;
      if(data!==null){
      let sortedData = data.sort(compare);
      setDbList(sortedData);
      setDbListWriteAccess(dbDataObject.writeAccess);}
    },[dbDataObject,dbDataInitialized]);
  
  const dbDataAndLiveDataReducer = (state, action) => {
    let newState = {};
    let newProcessVariables;
    switch (action.type) {
      case 'initPvList':
        
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
          let label = processVariables[processVariablesSchemaKeys[key]].label;
          let pv = processVariables[processVariablesSchemaKeys[key]].pv;
          let dbValue = dbList[displayIndex].process_variables[processVariablesSchemaKeys[key]].pvValue
          newState[processVariablesSchemaKeys[key]] = {
             label: label,
             pv: pv,
             pvValue: pvValue,
             newValue: newValue,
             newValueTrigger: newValueTrigger,
             dbValue: dbValue,
             metadata: metadata,
             initialized: initialized,
             severity: severity,
             usePvLabel: processVariables[processVariablesSchemaKeys[key]].usePvLabel,
             usePvUnits: processVariables[processVariablesSchemaKeys[key]].usePvUnits,
             usePvPrecision: processVariables[processVariablesSchemaKeys[key]].usePvPrecision,
             units:processVariables[processVariablesSchemaKeys[key]].units,
             prec:processVariables[processVariablesSchemaKeys[key]].prec,
            }
        }
        return newState
      case 'initDbDataListNoData':
     
        for (let key in processVariablesSchemaKeys) {
          if (typeof state[processVariablesSchemaKeys[key]] !== 'undefined') {
            newState[processVariablesSchemaKeys[key]] = state[processVariablesSchemaKeys[key]];
            newState[processVariablesSchemaKeys[key]].dbValue = undefined;
            newState[processVariablesSchemaKeys[key]].newValue = undefined;
          }
        }
        return newState
        
      case 'updatePvData':
        newState = { ...state };
     
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
        break;
        case 'reset':
          return {};
      default:
    }
    return (newState)
  }
  const [dbDataAndLiveData, dispatchDbDataAndLiveData] = useReducer(dbDataAndLiveDataReducer, {});
  useEffect(() => {
    if (dbPVsList !== null) {
     
      let processVariables = dbPVsList[0].process_variables;
      let newProcessVariablesSchemaKeys = Object.keys(dbPVsList[0].process_variables);
      let metadataComponents = dbPVsList[0].metadata.components;
      
      let oldDbDataAndLiveData = dbDataAndLiveData;
      let newDbDataAndLiveData = {}
      let newMetadataComponentsPVs = [];
      let oldMetadataComponentsPVs = metadataComponentsPVs;
      let component;
      let pv;
      for (component in metadataComponents) {
        pv = replaceMacros(metadataComponents[component].props.pv, props.macros)
        if (oldMetadataComponentsPVs[component]){
          if (oldMetadataComponentsPVs[component].pv===pv){
            newMetadataComponentsPVs.push(oldMetadataComponentsPVs[component]);           
          }
          else{
            newMetadataComponentsPVs.push({ label: "", initialized: false, pv: pv, key:component.toString()+pv, value: "", metadata: {}, componentProps: metadataComponents[component].props });    
          }
        }
        else{
        newMetadataComponentsPVs.push({ label: "", initialized: false, pv: pv, key:component.toString()+pv, value: "", metadata: {}, componentProps: metadataComponents[component].props });
        }
      }
      let key;
      for (key in newProcessVariablesSchemaKeys) {
        let label = processVariables[newProcessVariablesSchemaKeys[key]].label;
        let pv = processVariables[newProcessVariablesSchemaKeys[key]].pv
        if (oldDbDataAndLiveData[newProcessVariablesSchemaKeys[key]]) {
          if (oldDbDataAndLiveData[newProcessVariablesSchemaKeys[key]].pv === pv) {
            newDbDataAndLiveData[newProcessVariablesSchemaKeys[key]] = oldDbDataAndLiveData[newProcessVariablesSchemaKeys[key]];
            newDbDataAndLiveData[newProcessVariablesSchemaKeys[key]].label = label;
          }
        }
        else {
          newDbDataAndLiveData[newProcessVariablesSchemaKeys[key]] = { label: label, pv: pv, pvValue: undefined, newValue: undefined, newValueTrigger: 0, dbValue: undefined, metadata: {}, initialized: false, severity: 0,props }
        }
      }
      
      setProcessVariablesSchemaKeys(newProcessVariablesSchemaKeys);
      dispatchDbDataAndLiveData({ type: 'initPvList', data: newDbDataAndLiveData });
      setProcessVariables(processVariables);
      setMetadataComponents(metadataComponents);
      setMetadataComponentsPVs(newMetadataComponentsPVs);
    }
    else{
      dispatchDbDataAndLiveData({type:'reset'})
      setProcessVariablesSchemaKeys([])
      setProcessVariables({})
      setMetadataComponents([])
      setMetadataComponentsPVs([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbPVsList,props.macros,dbPVsInitialized])
 
  useEffect(() => {
    if (typeof dbList[0] !== 'undefined') {
  
      if (dbList[0]) {
        dispatchDbDataAndLiveData({ type: 'initDbDataList' });
      }
    }
    else {
      dispatchDbDataAndLiveData({ type: 'initDbDataListNoData' });
    }
  }, [dbList, processVariablesSchemaKeys])
  
  const handleSavedValues = () => {
    
    let key;
   
    let newEntry = {};
    newEntry['process_variables'] = {}
    newEntry['beam_setup'] = {}
    let component;
    
    for (component in metadataComponentsPVs) {
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
      newEntry.process_variables[processVariablesSchemaKeys[key]] = { pv: dbDataAndLiveData[processVariablesSchemaKeys[key]].pv, pvValue: dbDataAndLiveData[processVariablesSchemaKeys[key]].pvValue };
    }
    
    dbInsertOne({dbURL:dbListInsertOneURL,newEntry:newEntry});
    
   
  }
 
  const handleOnClickWorking = () => {
  
   
    let id = dbList[displayIndex]['_id']['$oid'];
    let update = { '$set': { "beam_setup.Status": "Working" } }
    dbUpdateOne({dbURL:dbListUpdateOneURL,id:id,update:update});
  }
  const handleOnClickPending = () => {
  
    let id = dbList[displayIndex]['_id']['$oid'];
    let update = { '$set': { "beam_setup.Status": "Pending" } }
    dbUpdateOne({dbURL:dbListUpdateOneURL,id:id,update:update});
    
  }
  const handleOnClickObselete = () => {
   
    let id = dbList[displayIndex]['_id']['$oid'];
    let update = { '$set': { "beam_setup.Status": "Obselete" } }
    dbUpdateOne({dbURL:dbListUpdateOneURL,id:id,update:update});
  }
  const handleOnClickDelete = () => {
   
    let id = dbList[displayIndex]['_id']['$oid'];
    let update = { '$set': { "beam_setup.Status": "Delete" } }
    if (displayIndex >= 1) {
      setDisplayIndex(displayIndex - 1);
    }
    else {
      setDisplayIndex(0);
    }
    dbUpdateOne({dbURL:dbListUpdateOneURL,id:id,update:update});
  }
  
  const metadataPvsConnections = () => {
    let pvs = [];
    metadataComponentsPVs.map((item, index) => (
      pvs.push(
        <PV
          key={index.toString()}
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
  const SystemsDataConnections = () => {
    const pvs = [];
    let id = 0;
    for (
      const key in processVariablesSchemaKeys) {
      const item = processVariablesSchemaKeys[key];
     
      pvs.push(
        <PV
          key={dbDataAndLiveData[item].pv + id.toString()}
          pv={dbDataAndLiveData[item].pv}
        
          pvData={(pvData) => dispatchDbDataAndLiveData({ type: 'updatePvData', pvData: pvData, key: item })}
          outputValue={dbDataAndLiveData[item].pvValue}
          newValueTrigger={dbDataAndLiveData[item].newValueTrigger}
        />
      );
      id++;
    }
    return pvs;
  }
  const showTable=(!loadTimedOut||(dbPVsInitialized&&dbDataInitialized));
  useEffect(()=>{
    const timer=setTimeout(()=>{
     
      if(!(dbPVsInitialized&&dbDataInitialized)){

        setLoadTimedOut(true)
      }
    }
    ,3000  );
    return()=>clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const { classes } = props;
  
  let disableDeleteButton = true;
  let disableLoadButton = true;
  let disableSaveButton=!dbListWriteAccess;
  
  let disableButtons=true;
  if (typeof dbList[displayIndex] !== 'undefined') {
    disableButtons=false;
    disableLoadButton = false
    if (dbList[displayIndex].beam_setup.Status === "Obselete") {
      disableDeleteButton = false;
    }
    else {
      disableDeleteButton = true;
    }
  }
  else {
    disableLoadButton = true;
  }
 
  const dbDataAndLiveDataKeys = Object.keys(dbDataAndLiveData);
  
  return (
    <React.Fragment>
      {metadataPvsConnections()}
      {SystemsDataConnections()}
      {!showTable&&
                        <Typography style={{padding:8,paddingBottom:16}}>
                          {host +" database is not available"}
                        </Typography>
                    }
      {showTable&&<Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        style={{ padding: 8 }}
      >
        
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Paper elevation={theme.palette.paperElevation} style={{ padding: 8 ,marginTop:8}}>
        
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
            > {metadataComponents.map((item, index) => (
              <Grid key={index.toString()} item xs={12} sm={12} md={3} lg={2} >
                {item.component === "TextInput" &&
                  <TextInput
                    macros={props.macros}
                    {...item.props}
                  />
                }
                {item.component === "TextOutput" &&
                  <TextOutput
                    macros={props.macros}
                    {...item.props}
                  />}
              </Grid>
            )
            )
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5} >
          <Paper>
            <Paper elevation={theme.palette.paperElevation} className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {metadataComponentsPVs.map((item, index) =>
                        <TableCell key={index.toString()+item.key} align="center">{item.componentProps.usePvLabel === true ? item.label : item.componentProps.label}  {item.componentProps.usePvUnits === true ? '[' + item.units + ']' : typeof item.componentProps.units !== 'undefined' ? '[' + item.componentProps.units + ']' : ""}</TableCell>
                      )}
                      <TableCell align="center">Date </TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                   
                    {dbList.map((row, index) => (
                      <TableRow key={index.toString()} hover role="checkbox"
                        onClick={() => dispatchDbDataAndLiveData({ type: 'changeRowIndex', index: index })}
                        // eslint-disable-next-line eqeqeq 
                        selected={index == displayIndex}>
                        {metadataComponentsPVs.map((item, index) =>
                          <TableCell key={index.toString()} align="center">{row.beam_setup[item.componentProps.usePvLabel === true ? item.label : item.componentProps.label]}  </TableCell>
                        )}
                        <TableCell className={classes.tableCell} component="th" scope="row" align='center'>
                          {row.beam_setup.DateTime}
                        </TableCell>
                        <TableCell className={row.beam_setup.Status === "Working" ? classes.tableCellWorking : row.beam_setup.Status === "Pending" ? classes.tableCellPending : row.beam_setup.Status === "Obselete" ? classes.tableCellObselete : classes.tableCell} component="th" scope="row" align='center'>
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
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={7} >
          <Paper>
            <Paper elevation={theme.palette.paperElevation} className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Device Description</TableCell>
                      <TableCell align="center">Saved Value</TableCell>
                      <TableCell align="center">New Value</TableCell>
                      <TableCell align="center">PV Value</TableCell>
                      <TableCell align="center">Units</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dbDataAndLiveDataKeys.map((item, index) => (
                      <TableRow key={index.toString()} hover role="checkbox" >
                        <TableCell className={classes.tableCellDescription} component="th" scope="row" >
                          {dbDataAndLiveData[item].label}
                        </TableCell>
                        <TableCell className={classes.tableCellValues} style={{ backgroundColor: compareValues(dbDataAndLiveData[item].dbValue, dbDataAndLiveData[item].pvValue, dbDataAndLiveData[item].initialized) ? green[500] : undefined }} align="center">
                          {dbDataAndLiveData[item].dbValue}
                        </TableCell>
                        <TableCell className={classes.tableCellValues} style={{ backgroundColor: compareValues(dbDataAndLiveData[item].newValue, dbDataAndLiveData[item].pvValue, dbDataAndLiveData[item].initialized) ? green[500] : undefined }} align="center">
                          {dbDataAndLiveData[item].newValue}
                        </TableCell>
                        <TableCell className={classes.tableCellValues} style={{ backgroundColor: (compareValues(dbDataAndLiveData[item].newValue, dbDataAndLiveData[item].pvValue, dbDataAndLiveData[item].initialized) || compareValues(dbDataAndLiveData[item].dbValue, dbDataAndLiveData[item].pvValue, dbDataAndLiveData[item].initialized)) ? green[500] : undefined }} align="center">
                          
                          <TextUpdate pv={dbDataAndLiveData[item].pv} alarmSensitive={true} {...dbDataAndLiveData[item]} usePvLabel={false} label={undefined} units={""} usePvUnits={false} />
                          
                        </TableCell>
                        <TableCell className={classes.tableCellUnits} style={{ backgroundColor: (compareValues(dbDataAndLiveData[item].newValue, dbDataAndLiveData[item].pvValue, dbDataAndLiveData[item].initialized) || compareValues(dbDataAndLiveData[item].dbValue, dbDataAndLiveData[item].pvValue, dbDataAndLiveData[item].initialized)) ? green[500] : undefined }} align="center">
                        {dbDataAndLiveData[item].usePvUnits?dbDataAndLiveData[item].metadata.units:dbDataAndLiveData[item].units}
                    
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5} >
          <Paper>
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
                          // eslint-disable-next-line eqeqeq 
                          disabled={(!newValuesLoaded) || (initialized === false) || (value != 0)||disableButtons}
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
                    disabled={(!newValuesLoaded)||disableButtons}
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
                    disabled={disableSaveButton}
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
                    disabled={!dbListWriteAccess||disableButtons}
                  >
                    Working
                        </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  <Button
                    variant="contained"
                    className={classes.pendingButton}
                    onClick={handleOnClickPending}
                    disabled={!dbListWriteAccess||disableButtons}
                  >
                    Pending
                        </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} >
                  <Button
                    variant="contained"
                    className={classes.obseleteButton}
                    onClick={handleOnClickObselete}
                    disabled={!dbListWriteAccess||disableButtons}
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
                    disabled={disableDeleteButton ||disableButtons|| !dbListWriteAccess}
                  >
                    Delete
                        </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
        {props.useLoadEnable && <React.Fragment>
          {(typeof props.loadEnablePV !== 'undefined' && props.showLoadEnableButton === true) && <Grid item xs={12} sm={12} md={12} lg={1} >
            {typeof props.loadEnableLabel !== 'undefined' && <h4 style={{ margin: 0 }}>{props.loadEnableLabel}</h4>}
            <Paper elevation={theme.palette.paperElevation} style={{ padding: 8 }}>
              <ToggleButton pv={props.loadEnablePV} macros={props.macros} custom_selection_strings={["OFF", "ON"]} />
            </Paper>
          </Grid>}
        </React.Fragment>
        }
      </Grid>}
    </React.Fragment>
  );
}
LoadSave.propTypes = {
  /** if true, when the value of loadEnablePV does not equal 0, then the new values can **not** be loaded into the pv values*/
  useLoadEnable: PropTypes.bool,
  /** Is name of the environment variable defined in your .env or docker-compose yaml file file and corresponds to hostname or ip and port of the mongoDB replica set, eg. `LOADSAVE_DATABASE`
  *
  */
  host:PropTypes.string,
  /** The internal MongoDB database name
  *
  */
  database:PropTypes.string,
  /**
   * Values of macros that will be substituted.
   * eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros: PropTypes.object,
  /** Name of the load enable process variable, eg. '$(device):test$(id)'*/

  loadEnablePV: PropTypes.string,
  /**
   * Custom loadEnable button label to be used
   */
  loadEnableLabel: PropTypes.string,
  /** if true, then the button to enable loading of new values will be shown*/
  showLoadEnableButton: PropTypes.bool,
  
  
};
LoadSave.defaultProps = {
  useLoadEnable: false
}
export default withStyles(styles, { withTheme: true })(LoadSave);
