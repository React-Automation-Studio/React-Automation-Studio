import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DataConnection from '../SystemComponents/DataConnection';
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
import yellow from '@material-ui/core/colors/yellow';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { LanDisconnect } from 'mdi-material-ui/'
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
    maxHeight: 440,
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
class LoadSave extends React.Component {

  constructor(props) {
    super(props);

    let pv;
    let DataConnections = [];
    let sys;
    let id = 0;
    let systemName = this.props.macros['$(systemName)'];
    let dbListQueryParameters = { 'query': { "beam_setup.Status": { "$ne": "Delete" } } };
    let Parameters = JSON.stringify(dbListQueryParameters);
    let database = this.props.database;
    let collection = this.props.collection;
    let dbListBroadcastReadDataURL = 'mongodb://' + database + ':' + collection + ':' + systemName + '_DATA:Parameters:' + Parameters;
    let dbListBroadcastReadPvsURL = 'mongodb://' + database + ':' + collection + ':' + systemName + '_PVs:Parameters:""';
    let dbListUpdateOneURL = 'mongodb://' + database + ':' + collection + ':' + systemName + '_DATA';
    let dbListInsertOneURL = 'mongodb://' + database + ':' + collection + ':' + systemName + '_DATA';
    const systems = props.systems;
    //   let metadataPVs=[];

    //   console.log(metadataPVs)
    //   let item;

    //   // let pvKeys=Object.keys(pvs)
    //   for (item in this.props.metadataPVs){


    //     pvname= this.props.metadataPVs[item].pv;
    //   if (typeof this.props.macros !== 'undefined'){

    //     let macro;
    //     for (macro in this.props.macros){
    //       pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
    //     }
    //   }
    //   metadataPVs[item]={label:typeof this.props.metadataPVs[item].usePvLabel==='undefined'?this.props.metadataPVs[item].label:'', initialized: false,pvname:pvname,value:"",metadata:{}};
    // }
    //   // DataConnections.push(




    let pvs = {};
    if (this.props.useLoadEnable) {
      let loadEnablePV = this.props.loadEnablePV
      let pvname = loadEnablePV;
      if (typeof this.props.macros !== 'undefined') {

        let macro;
        for (macro in this.props.macros) {
          pvname = pvname.replace(macro.toString(), this.props.macros[macro].toString());
        }
      }
      pvs['loadEnablePV'] = {
        label: "",
        initialized: false,
        pvname: pvname,
        value: "",
        metadata: {}
      };
    }
    console.log(pvs)

    this.state = {
      pvs: pvs,
      dbList: [],
      dbDataAndLiveData: [],
      processVariablesSchemaKeys: [],
      displayIndex: 0,
      tabValue: 0,
      dbListWriteAccess: false,
      dbListBroadcastReadPvsURL: dbListBroadcastReadPvsURL,
      dbListBroadcastReadDataURL: dbListBroadcastReadDataURL,
      dbListUpdateOneURL: dbListUpdateOneURL,
      dbListInsertOneURL: dbListInsertOneURL,
      newValuesLoaded: false,
      metadataComponents: [],
      metadataComponentsPVs: [],
    };
    //    console.log(rowPVs)





    this.SystemsDataConnections = this.SystemsDataConnections.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleMetadata = this.handleMetadata.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleNewDbDataList = this.handleNewDbDataList.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleDbListMetadata = this.handleDbListMetadata.bind(this);
    this.handleDbListInputValue = this.handleDbListInputValue.bind(this);
    this.handleNewDbPVsList = this.handleNewDbPVsList.bind(this);
    this.pvValueTextUpdate = this.pvValueTextUpdate.bind(this);
    this.pvValueTextUpdate = this.pvValueTextUpdate.bind(this);
  }

  handleInputValue = name => (inputValue, pvname, initialized, severity) => {
    //  console.log("test");
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
    let pvs = this.state.pvs;

    pvs[name].value = inputValue;
    pvs[name].initialized = initialized;
    pvs[name].severity = severity;

    this.setState({ pvs: pvs });


    //state.pvs[pvname].inputValue=inputValue;
    //pvData.pvs[pvname].initialized=initialized;
    //pvData.pvs[pvname].severity=severity;

    //console.log("pvData:",pvData)

    //this.setState(pvData);

  }


  handleMetadata = name => (metadata) => {

    let pvs = this.state.pvs;
    pvs[name].metadata = metadata;
    this.setState({ pvs: pvs });
    //  console.log("metadata",metadata)

  }


  handleMetadataComponentsPVsInputValue = index => (inputValue, pvname, initialized, severity) => {
    //  console.log("test");
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
    let metadataComponentsPVs = this.state.metadataComponentsPVs;

    metadataComponentsPVs[index].value = inputValue;
    metadataComponentsPVs[index].initialized = initialized;
    metadataComponentsPVs[index].severity = severity;

    this.setState({ metadataComponentsPVs: metadataComponentsPVs });


    //state.pvs[pvname].inputValue=inputValue;
    //pvData.pvs[pvname].initialized=initialized;
    //pvData.pvs[pvname].severity=severity;

    //console.log("pvData:",pvData)

    //this.setState(pvData);

  }

  handleMetadataComponentsPVsMetadata = index => (metadata) => {

    let metadataComponentsPVs = this.state.metadataComponentsPVs;
    metadataComponentsPVs[index].metadata = metadata;
    this.setState({ metadataComponentsPVs: metadataComponentsPVs });
    //  console.log("metadata",metadata)

  }

  handleInputValueLabel = pvname => (inputValue) => {

    let pvs = this.state.pvs;
    pvs[pvname].label = inputValue;
    this.setState({ pvs: pvs });

  }


  handleDbListInputValue = (key) => (inputValue, pvname, initialized, severity) => {
    let dbDataAndLiveData = this.state.dbDataAndLiveData;
    if (initialized) {
      dbDataAndLiveData[key].pvValue = inputValue;

    }
    dbDataAndLiveData[key].initialized = initialized;
    dbDataAndLiveData[key].severity = severity;
    this.setState({ dbDataAndLiveData: dbDataAndLiveData });
    //  console.log('handleInputValue',id,name,inputValue,pvname,initialized,severity)
    //console.log(rowPVs)
  }

  handleDbListMetadata = (key) => (metadata) => {
    let dbDataAndLiveData = this.state.dbDataAndLiveData;
    dbDataAndLiveData[key].metadata = metadata;
    this.setState({ dbDataAndLiveData: dbDataAndLiveData });

    //console.log('handleMetaData',id,name,metadata)



  }

  handleNewDbPVsList = (msg) => {
    let item;
    let data = JSON.parse(msg.data);
    let socket = this.context.socket;



    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    console.log(data)
    //console.log(data[0])
    let process_variables = data[0].process_variables;
    let processVariablesSchemaKeys = Object.keys(data[0].process_variables);
    let metadataComponents = data[0].metadata.components;
    console.log(metadataComponents)
    let oldDbDataAndLiveData = this.state.dbDataAndLiveData;
    let dbDataAndLiveData = {}

    let metadataComponentsPVs = [];
    let component;
    let pvname;

    for (component in metadataComponents) {
      pvname = metadataComponents[component].props.pv;
      if (typeof this.props.macros !== 'undefined') {

        let macro;
        for (macro in this.props.macros) {
          pvname = pvname.replace(macro.toString(), this.props.macros[macro].toString());
        }
      }


      metadataComponentsPVs.push({ label: "", initialized: false, pvname: pvname, value: "", metadata: {}, componentProps: metadataComponents[component].props });
    }
    let key;

    for (key in processVariablesSchemaKeys) {


      let description = process_variables[processVariablesSchemaKeys[key]].description;
      let pvName = process_variables[processVariablesSchemaKeys[key]].pvName
      if (oldDbDataAndLiveData[processVariablesSchemaKeys[key]]) {
        if (oldDbDataAndLiveData[processVariablesSchemaKeys[key]].pvname == pvName) {
          dbDataAndLiveData[processVariablesSchemaKeys[key]] = oldDbDataAndLiveData[processVariablesSchemaKeys[key]];
          dbDataAndLiveData[processVariablesSchemaKeys[key]].description = description;
        }
      }
      else {
        dbDataAndLiveData[processVariablesSchemaKeys[key]] = { description: description, pvname: pvName, pvValue: undefined, newValue: undefined, newValueTrigger: 0, dbValue: undefined, metadata: {}, initialized: false, severity: 0 }
      }
    }


    //console.log(processVariablesSchemaKeys)
    //console.log(dbDataAndLiveData)
    this.setState({ processVariablesSchemaKeys: processVariablesSchemaKeys, dbDataAndLiveData: dbDataAndLiveData, process_variables: process_variables, metadataComponents: metadataComponents, metadataComponentsPVs: metadataComponentsPVs })
    socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadDataURL, 'clientAuthorisation': jwt }, (data) => {

      if (data !== "OK") {
        console.log("ackdata", data);
      }
    });

    // let sortedData=data.sort(compare)
    // console.log(sortedData)
    // let dbDataAndLiveData={}
    // let dbDataAndLiveDataOld=this.state.dbDataAndLiveData;
    // if (typeof sortedData[0]!=='undefined'){
    //   let process_variables=sortedData[this.state.displayIndex].process_variables;
    //   let processVariablesSchemaKeys=[];
    //   if(sortedData[0]){
    //
    //
    //     processVariablesSchemaKeys=Object.keys(sortedData[0].process_variables);
    //     let key;
    //     let pvValue;
    //     let newValue;
    //     let newValueTrigger;
    //     for (key in processVariablesSchemaKeys){
    //       if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]]!=='undefined'){
    //         if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].pvValue!=='undefined'){
    //           pvValue=dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].pvValue;
    //         }
    //         else{
    //           pvValue=undefined;
    //         }
    //         if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].newValue!=='undefined'){
    //           newValue=dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].newValue;
    //         }
    //         else{
    //           newValue=undefined;
    //         }
    //         if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].newValueTrigger!=='undefined'){
    //           newValueTrigger=dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].newValueTrigger;
    //         }
    //         else{
    //           newValueTrigger=0;
    //         }
    //       }
    //       else{
    //         pvValue=undefined;
    //         newValue=undefined;
    //         newValueTrigger=0;
    //       }
    //
    //       dbDataAndLiveData[processVariablesSchemaKeys[key]]={description:processVariablesSchemaKeys[key], pvname:process_variables[processVariablesSchemaKeys[key]].pvName ,pvValue:pvValue,newValue:newValue,newValueTrigger:newValueTrigger,dbValue:process_variables[processVariablesSchemaKeys[key]].pvValue  ,metadata:{},initialized:false,severity:0}
    //     }
    //   }
    //   else{
    //
    //   }
    //
    //
    //
    //   this.setState({processVariablesSchemaKeys:processVariablesSchemaKeys})
    //   //  console.log("dbListWriteAccess",msg.write_access)
    //
    //
    //
    // }

  }

  handleNewDbDataList = (msg) => {
    let item;
    let data = JSON.parse(msg.data);
    let sortedData = data.sort(compare)
    console.log(sortedData)
    let dbDataAndLiveData = {}
    let dbDataAndLiveDataOld = this.state.dbDataAndLiveData;
    let process_variables = this.state.process_variables;
    if (typeof sortedData[0] !== 'undefined') {

      let processVariablesSchemaKeys = this.state.processVariablesSchemaKeys;
      if (sortedData[0]) {



        let key;
        let pvValue;
        let newValue;
        let newValueTrigger;
        let initialized;
        let severity;
        let metadata = {};
        for (key in processVariablesSchemaKeys) {
          if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]] !== 'undefined') {
            if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].pvValue !== 'undefined') {
              pvValue = dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].pvValue;
            }
            else {
              pvValue = undefined;
            }
            if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].newValue !== 'undefined') {
              newValue = dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].newValue;
            }
            else {
              newValue = undefined;
            }
            if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].newValueTrigger !== 'undefined') {
              newValueTrigger = dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].newValueTrigger;
            }
            else {
              newValueTrigger = 0;
            }
            if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].initialized !== 'undefined') {
              initialized = dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].initialized;
            }
            else {
              initialized = false;
            }
            if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].severity !== 'undefined') {
              severity = dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].severity;
            }
            else {
              severity = 0;
            }
            if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].metadata !== 'undefined') {
              metadata = dbDataAndLiveDataOld[processVariablesSchemaKeys[key]].metadata;
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
          let description = process_variables[processVariablesSchemaKeys[key]].description;
          let pvName = process_variables[processVariablesSchemaKeys[key]].pvName;
          let dbValue = sortedData[this.state.displayIndex].process_variables[processVariablesSchemaKeys[key]].pvValue
          dbDataAndLiveData[processVariablesSchemaKeys[key]] = { description: description, pvname: pvName, pvValue: pvValue, newValue: newValue, newValueTrigger: newValueTrigger, dbValue: dbValue, metadata: metadata, initialized: initialized, severity: severity }

          //dbDataAndLiveData[processVariablesSchemaKeys[key]]={description:processVariablesSchemaKeys[key], pvname:process_variables[processVariablesSchemaKeys[key]].pvName ,pvValue:pvValue,newValue:newValue,newValueTrigger:newValueTrigger,dbValue:process_variables[processVariablesSchemaKeys[key]].pvValue  ,metadata:{},initialized:false,severity:0}
        }
      }




      this.setState({ dbList: sortedData, dbDataAndLiveData: dbDataAndLiveData, dbListWriteAccess: msg.write_access, processVariablesSchemaKeys: processVariablesSchemaKeys })
      //  console.log("dbListWriteAccess",msg.write_access)



    }
    else {


      let processVariablesSchemaKeys = this.state.processVariablesSchemaKeys;
      let key;
      let pvValue;
      let newValue;
      let newValueTrigger;
      let initialized;
      let severity;
      let pvName;
      let description;

      let metadata = {};
      for (key in processVariablesSchemaKeys) {
        if (typeof dbDataAndLiveDataOld[processVariablesSchemaKeys[key]] !== 'undefined') {
          dbDataAndLiveData[processVariablesSchemaKeys[key]] = dbDataAndLiveDataOld[processVariablesSchemaKeys[key]];
          dbDataAndLiveData[processVariablesSchemaKeys[key]].dbValue = undefined;
          dbDataAndLiveData[processVariablesSchemaKeys[key]].newValue = undefined;
        }
      }
      this.setState({ dbList: sortedData, dbListWriteAccess: msg.write_access, dbDataAndLiveData: dbDataAndLiveData })
      //dbDataAndLiveData[processVariablesSchemaKeys[key]]={description:processVariablesSchemaKeys[key], pvname:process_variables[processVariablesSchemaKeys[key]].pvName ,pvValue:pvValue,newValue:newValue,newValueTrigger:newValueTrigger,dbValue:process_variables[processVariablesSchemaKeys[key]].pvValue  ,metadata:{},initialized:false,severity:0}
    }




  }


  componentDidMount() {
    let socket = this.context.socket;



    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }

    socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadPvsURL, 'clientAuthorisation': jwt }, (data) => {

      if (data !== "OK") {
        console.log("ackdata", data);
      }
    });

    //console.log('emmited')
    //  this.handleInitialConnection();
    //this.timeout=setTimeout(this.handleInitialConnection, 3000);
    //    console.log("this.state['pvname']",this.state['pvname']);
    socket.on('databaseData:' + this.state.dbListBroadcastReadPvsURL, this.handleNewDbPVsList);
    socket.on('databaseData:' + this.state.dbListBroadcastReadDataURL, this.handleNewDbDataList);
    //socket.on('connect_error',this.connectError);
    //socket.on('disconnect', this.disconnect);
    //socket.on('reconnect', this.reconnect);
    //socket.on('redirectToLogIn', this.handleRedirectToLogIn);
    //  socket.on(this.state['pvname'],this.testFunction);




  }





  handleOnClick = (index) => () => {
    console.log('row index clicked', index);
    let dbList = this.state.dbList;
    let process_variables = dbList[index].process_variables;
    let dbDataAndLiveData = this.state.dbDataAndLiveData;


    let processVariablesSchemaKeys = this.state.processVariablesSchemaKeys;
    if (processVariablesSchemaKeys[0]) {


      let key;
      for (key in processVariablesSchemaKeys) {
        dbDataAndLiveData[processVariablesSchemaKeys[key]].dbValue = process_variables[processVariablesSchemaKeys[key]].pvValue;
      }
    }


    this.setState({ displayIndex: index, dbDataAndLiveData: dbDataAndLiveData })

  }


  handleLoadSelectedValues = () => {
    let index = this.state.displayIndex;
    let processVariablesSchemaKeys = this.state.processVariablesSchemaKeys;
    let dbDataAndLiveData = this.state.dbDataAndLiveData;
    let key;

    for (key in processVariablesSchemaKeys) {


      //  console.log(row,dbDataAndLiveData[row].initialized)
      //  if (dbDataAndLiveData[row].initialized){
      dbDataAndLiveData[processVariablesSchemaKeys[key]].newValue = dbDataAndLiveData[processVariablesSchemaKeys[key]].dbValue;

      //    }
    }
    this.setState({ dbDataAndLiveData: dbDataAndLiveData, newValuesLoaded: true })

  }

  handleSavedValues = () => {
    let index = this.state.displayIndex;
    let processVariablesSchemaKeys = this.state.processVariablesSchemaKeys;
    let dbDataAndLiveData = this.state.dbDataAndLiveData;
    let metadataComponentsPVs = this.state.metadataComponentsPVs;
    let key;
    console.log("save")
    console.log(this.state.dbList[0])
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

    // newEntry.beam_setup['Frequency'] = pvs['Frequency'].value;
    // newEntry.beam_setup['Energy'] = pvs['Energy'].value;
    // newEntry.beam_setup['Description'] = pvs['Description'].value;
    // console.log(pvs)


    let mydate = new Date();
    //  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //  let year = mydate.getFullYear();
    // let month = months[mydate.getMonth()];
    //let date = mydate.getDate();
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
    if (ms < 10) {
      ms = '00' + ms;
    }
    else if (ms < 100) {
      ms = '0' + ms;
    }
    //let value= hour + ':' + min + ':' + sec +':' + ms;
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


      //  console.log(row,dbDataAndLiveData[row].initialized)
      //  if (dbDataAndLiveData[row].initialized){
      newEntry.process_variables[processVariablesSchemaKeys[key]] = { pvName: dbDataAndLiveData[processVariablesSchemaKeys[key]].pvname, pvValue: dbDataAndLiveData[processVariablesSchemaKeys[key]].pvValue };

      //    }
    }
    //this.setState({dbDataAndLiveData:dbDataAndLiveData,newValuesLoaded:true})
    console.log(newEntry)


    let socket = this.context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    socket.emit('databaseInsertOne', { dbURL: this.state.dbListInsertOneURL, 'newEntry': newEntry, 'clientAuthorisation': jwt }, (data) => {
      console.log("ackdata", data);
      if (data == "OK") {
        socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadDataURL, 'clientAuthorisation': jwt }, (data) => {

          if (data !== "OK") {
            console.log("ackdata", data);
          }
        });
      } else {
        console.log("Save values unsuccessful")
      }

      // data will be 'woot'
    });



  }

  handleWriteNewValues = () => {

    let processVariablesSchemaKeys = this.state.processVariablesSchemaKeys;
    let dbDataAndLiveData = this.state.dbDataAndLiveData;
    let key;

    for (key in processVariablesSchemaKeys) {


      //  console.log(row,dbDataAndLiveData[row].initialized)
      //  if (dbDataAndLiveData[row].initialized){
      dbDataAndLiveData[processVariablesSchemaKeys[key]].pvValue = dbDataAndLiveData[processVariablesSchemaKeys[key]].newValue;
      dbDataAndLiveData[processVariablesSchemaKeys[key]].newValueTrigger++;
      //    }
    }
    this.setState({ dbDataAndLiveData: dbDataAndLiveData })
  }

  handleOnClickWorking = () => {
    console.log('marking row index working', this.state.displayIndex);
    let dbList = this.state.dbList;



    let socket = this.context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }

    let id = dbList[this.state.displayIndex]['_id']['$oid'];
    let newvalues = { '$set': { "beam_setup.Status": "Working" } }

    socket.emit('databaseUpdateOne', { dbURL: this.state.dbListUpdateOneURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
      console.log("ackdata", data);
      if (data == "OK") {
        socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadDataURL, 'clientAuthorisation': jwt }, (data) => {

          if (data !== "OK") {
            console.log("ackdata", data);
          }
        });
      } else {
        console.log("set status: working  unsuccessful")
      }
    });
    //this.setState({dbList:dbList});
    //this.setState({displayIndex:index})

  }

  handleOnClickPending = () => {
    console.log('marking row index working', this.state.displayIndex);
    let dbList = this.state.dbList;


    let socket = this.context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }

    let id = dbList[this.state.displayIndex]['_id']['$oid'];
    let newvalues = { '$set': { "beam_setup.Status": "Pending" } }

    socket.emit('databaseUpdateOne', { dbURL: this.state.dbListUpdateOneURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
      console.log("ackdata", data);
      if (data == "OK") {
        socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadDataURL, 'clientAuthorisation': jwt }, (data) => {

          if (data !== "OK") {
            console.log("ackdata", data);
          }
        });
      } else {
        console.log("set status: pending  unsuccessful")
      }
    });

  }
  handleOnClickObselete = () => {
    let dbList = this.state.dbList;



    let socket = this.context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }

    let id = dbList[this.state.displayIndex]['_id']['$oid'];
    let newvalues = { '$set': { "beam_setup.Status": "Obselete" } }

    socket.emit('databaseUpdateOne', { dbURL: this.state.dbListUpdateOneURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
      console.log("ackdata", data);
      if (data == "OK") {
        socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadDataURL, 'clientAuthorisation': jwt }, (data) => {

          if (data !== "OK") {
            console.log("ackdata", data);
          }
        });
      } else {
        console.log("set status: Obselete  unsuccessful")
      }
    });

  }
  handleOnClickDelete = () => {
    let dbList = this.state.dbList;



    let socket = this.context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }

    let id = dbList[this.state.displayIndex]['_id']['$oid'];
    let newvalues = { '$set': { "beam_setup.Status": "Delete" } }
    if (this.state.displayIndex >= 1) {
      this.setState({ displayIndex: this.state.displayIndex - 1 })
    }
    else {
      this.setState({ displayIndex: 0 })
    }
    socket.emit('databaseUpdateOne', { dbURL: this.state.dbListUpdateOneURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
      console.log("ackdata", data);
      if (data == "OK") {

        socket.emit('databaseBroadcastRead', { dbURL: this.state.dbListBroadcastReadDataURL, 'clientAuthorisation': jwt }, (data) => {

          if (data !== "OK") {
            console.log("ackdata", data);
          }
        })
      } else {
        console.log("set status: Delete  unsuccessful")
      }
    });
  }
  handleTabChange = (event, newValue) => {
    //  console.log(newValue)
    this.setState({ tabValue: newValue });
  };
  metadataPVsDataConnections = () => {
    //this.test("test1");
    //this.handleInputValue();
    let pv;
    let DataConnections = [];
    let id = 0;
    let metadataComponents = this.state.metadataComponents;
    //    console.log(metadataPVs)
    let item;
    // let pvKeys=Object.keys(pvs)
    for (item in metadataComponents) {
      //   //  console.log(this.state.pvs[pv].pvname);
      //    console.log(metadataPVs[item])
      const index = item;
      DataConnections.push(

        <DataConnection
          key={metadataComponents[item].props.pv}

          handleInputValue={this.handleMetadataComponentsPVsInputValue(index)}
          handleMetadata={this.handleMetadataComponentsPVsMetadata(index)}
          {...metadataComponents[item].props}
        />

      )
    }

    return DataConnections;
  }
  multipleDataConnections = () => {
    //this.test("test1");
    //this.handleInputValue();
    let pv;
    let DataConnections = [];
    let id = 0;
    let pvs = this.state.pvs;
    let key;
    let pvKeys = Object.keys(pvs)
    for (key in pvKeys) {
      //  console.log(this.state.pvs[pv].pvname);
      DataConnections.push(

        <DataConnection key={this.state.pvs[pvKeys[key]].pvname + id}
          pv={this.state.pvs[pvKeys[key]].pvname}
          handleInputValue={this.handleInputValue(pvKeys[key])}
          handleMetadata={this.handleMetadata(pvKeys[key])}
        />

      )
    }

    return DataConnections;
  }

  SystemsDataConnections = (displayIndex) => {
    //this.test("test1");
    //this.handleInputValue();

    let pv;
    let DataConnections = [];
    let id = 0;
    let row;


    // //  console.log(rowPVs)
    // let index=0;
    let processVariablesSchemaKeys = this.state.processVariablesSchemaKeys;
    let dbDataAndLiveData = this.state.dbDataAndLiveData;
    let key;

    for (key in processVariablesSchemaKeys) {






      DataConnections.push(

        <DataConnection
          key={dbDataAndLiveData[processVariablesSchemaKeys[key]].pvname + id}
          pv={dbDataAndLiveData[processVariablesSchemaKeys[key]].pvname}

          handleInputValue={this.handleDbListInputValue(processVariablesSchemaKeys[key])}
          handleMetadata={this.handleDbListMetadata(processVariablesSchemaKeys[key])}
          outputValue={dbDataAndLiveData[processVariablesSchemaKeys[key]].pvValue}
          newValueTrigger={dbDataAndLiveData[processVariablesSchemaKeys[key]].newValueTrigger}
        />

      );
      id++;
      //
      //   //console.log("linedata: ", this.state.pvs[pv].linedata);
      //   //    console.log(row)
      //
      //   if (typeof rowPVs[row].rowProps !== 'undefined'){
      //     if (typeof rowPVs[row].rowProps.useStatus !== 'undefined'){
      //       useStatus=rowPVs[row].rowProps.useStatus;
      //     }
      //     else{
      //       useStatus=true;
      //     }
      //   }
      //   else{
      //     useStatus=false;
      //   }
      //   DataConnections.push(
      //
      //     <DataConnection
      //       key={id.toString() +rowPVs[row].setpointPV.pvname+"setpointPV"}
      //       pv={rowPVs[row].setpointPV.pvname}
      //       handleInputValue={this.handleInputValue(id,'setpointPV')}
      //       handleMetadata={this.handleMetadata(id,'setpointPV')}
      //
      //     />
      //
      //   );
      //
      //   DataConnections.push(
      //
      //     <DataConnection
      //       key={id.toString()+ rowPVs[row].readbackPV.pvname+'readbackPV' }
      //       pv={rowPVs[row].readbackPV.pvname}
      //       handleInputValue={this.handleInputValue(id,'readbackPV')}
      //       handleMetadata={this.handleMetadata(id,'readbackPV')}
      //
      //     />
      //
      //   );
      //   if (useStatus){
      //     DataConnections.push(
      //
      //       <DataConnection
      //         key={id.toString()+ rowPVs[row].statusPV.pvname+'statusPV'}
      //         pv={rowPVs[row].statusPV.pvname}
      //         handleInputValue={this.handleInputValue(id,'statusPV')}
      //         handleMetadata={this.handleMetadata(id,'statusPV')}
      //         useStringValue={true}
      //
      //       />
      //
      //     );
      //   }
      //
      //
      //   id++;
      // }
      // //console.log(DataConnections[0]);
      //
      // //  this.setState({rows:rows});
    }
    return DataConnections;
  }

  pvValueTextUpdate = (pv) => {
    //  console.log(pv)
    const initialized = pv.initialized;
    const pvValue = pv.pvValue;
    const pvName = pv.pvname;
    if (initialized) {

      return pvValue;
    }
    else {
      return (
        <React.Fragment>
          <LanDisconnect style={{ color: this.props.theme.palette.error.main, verticalAlign: "middle" }} fontSize='small' />   {pvName}

        </React.Fragment>
      );
    }
  }
  render() {
    const { classes } = this.props;
    const tabValue = this.state.tabValue;
    const dbList = this.state.dbList;
    let item;
    let rows = [];
    // for (item in dbList){
    //   rows=
    // }



    let process_variables2;
    let disableDeleteButton = true;
    const dbDataAndLiveData = this.state.dbDataAndLiveData;
    let disableLoadButton = true;
    if (typeof dbList[this.state.displayIndex] !== 'undefined') {
      disableLoadButton = false
      if (dbList[this.state.displayIndex].beam_setup.Status == "Obselete") {
        disableDeleteButton = false;

      }
      else {
        disableDeleteButton = true;
      }


    }
    else {
      disableLoadButton = true;
    }



    const dbListWriteAccess = !this.state.dbListWriteAccess;


    //  console.log(dbDataAndLiveData)

    let dbDataAndLiveDataKeys = Object.keys(dbDataAndLiveData);
    console.log("this.state.metadataComponentsPVs", this.state.metadataComponentsPVs)
    return (
      <React.Fragment>

        {this.multipleDataConnections()}
        {this.SystemsDataConnections(this.state.displayIndex)}
        {this.metadataPVsDataConnections()}
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

              > {this.state.metadataComponents.map((item, index) => (
                <Grid key={index.toString()} item xs={12} sm={12} md={3} lg={2} >
                  {item.component == "TextInput" &&
                    <TextInput


                      macros={this.props.macros}

                      {...item.props}
                    />
                  }
                  {item.component == "TextOutput" &&
                    <TextOutput


                      macros={this.props.macros}

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
                        {this.state.metadataComponentsPVs.map((item) =>
                          <TableCell align="center">{item.componentProps.usePvLabel === true ? item.label : item.componentProps.label}  {item.componentProps.usePvUnits === true ? '[' + item.metadata.units + ']' : typeof item.componentProps.units !== 'undefined' ? '[' + item.componentProps.units + ']' : ""}</TableCell>

                        )}


                        <TableCell align="center">Date </TableCell>

                        <TableCell align="center">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dbList.map((row, index) => (
                        <TableRow key={index} hover role="checkbox" small onClick={this.handleOnClick(index)} selected={index == this.state.displayIndex}>
                          {this.state.metadataComponentsPVs.map((item) =>
                            <TableCell align="center">{row.beam_setup[item.componentProps.usePvLabel === true ? item.label : item.componentProps.label]}  </TableCell>

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
                        <TableRow key={index} hover role="checkbox" small>

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


                            {/*dbDataAndLiveData[value].pvValue*/}
                            {this.pvValueTextUpdate(dbDataAndLiveData[value])}
                            {/* <TextUpdate
                                  pv={dbDataAndLiveData[value].pvname}
                                  alarmSensitive={true}
                                  usePvUnits={true}
                                /> */}

                          </TableCell>

                          {/* <TableCell className={classes.tableCell} align="right">
                                  <TextUpdate
                                  pv={row.readbackPV.pvname}
                                  usePrecision={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.usePrecision)==='undefined'?undefined:row.rowProps.usePrecision}
                                  prec={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.prec)==='undefined'?undefined:row.rowProps.prec}
                                  usePvUnits={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.usePvUnits)==='undefined'?undefined:row.rowProps.usePvUnits}
                                  units={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.units)==='undefined'?'undefined':row.rowProps.units}
                                  alarmSensitive={true}
                                />
                                </TableCell>
                                <TableCell  className={classes.tableCell} align="right">{"N/A"}</TableCell>
                                <TableCell  className={classes.tableCell} align="right">
                                {(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.useStatus)==='undefined'?'-':row.rowProps.useStatus===true?row.statusPV.value:'-'}
                              </TableCell> */}
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
                <Tabs aria-label="simple tabs example" value={tabValue} onChange={this.handleTabChange}>
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
                      onClick={this.handleLoadSelectedValues}
                      disabled={disableLoadButton}
                    >
                      Load New Values
                        </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3} >
                    {this.props.useLoadEnable == true && <Button
                      variant="contained"
                      color="primary"
                      className={classes.Button}
                      onClick={this.handleWriteNewValues}
                      disabled={(!this.state.newValuesLoaded) || (this.state.pvs['loadEnablePV'].initialized == false) || (this.state.pvs['loadEnablePV'].value != 0)}
                    >
                      Write New Values
                    </Button>}
                    {this.props.useLoadEnable == false && <Button
                      variant="contained"
                      color="primary"
                      className={classes.Button}
                      onClick={this.handleWriteNewValues}
                      disabled={(!this.state.newValuesLoaded)}
                    >
                      Write New Values
                    </Button>}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3} >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.Button}
                      onClick={this.handleSavedValues}

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
                      onClick={this.handleOnClickWorking}
                      disabled={dbListWriteAccess}
                    >
                      Working
                        </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3} >
                    <Button
                      variant="contained"

                      className={classes.pendingButton}
                      onClick={this.handleOnClickPending}
                      disabled={dbListWriteAccess}
                    >
                      Pending
                        </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3} >
                    <Button
                      variant="contained"

                      className={classes.obseleteButton}
                      onClick={this.handleOnClickObselete}
                      disabled={dbListWriteAccess}
                    >
                      Obselete
                        </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3} >
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={this.handleOnClickDelete}
                      disabled={disableDeleteButton || dbListWriteAccess}
                    >
                      Delete
                        </Button>

                  </Grid>
                </Grid>


              </TabPanel>

            </Card>
          </Grid>
          {this.props.useLoadEnable && <React.Fragment>
            {(typeof this.props.loadEnablePV !== 'undefined' && this.props.showLoadEnableButton === true) && <Grid item xs={12} sm={12} md={12} lg={1} >
              {typeof this.props.loadEnableLabel !== 'undefined' && <h4 style={{ margin: 0 }}>{this.props.loadEnableLabel}</h4>}
              <Card style={{ padding: 8 }}>
                <ToggleButton pv={this.props.loadEnablePV} macros={this.props.macros} custom_selection_strings={["OFF", "ON"]} />
              </Card>
            </Grid>}
          </React.Fragment>
          }
        </Grid>

      </React.Fragment>
    );
  }
}

LoadSave.propTypes = {
  /** if true, when the value of loadEnablePV does not equal 0, then the new values can be loaded into the pv values*/
  useLoadEnable: PropTypes.bool
};
LoadSave.defaultProps = {
  useLoadEnable: false
}
LoadSave.contextType = AutomationStudioContext;
export default withStyles(styles, { withTheme: true })(LoadSave);
