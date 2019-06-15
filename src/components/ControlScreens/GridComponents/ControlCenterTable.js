import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EpicsPV from '../../SystemComponents/EpicsPV';
import TextUpdate from '../../BaseComponents/TextUpdate';
import TextInput from '../../BaseComponents/TextInput';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1) * 0,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});




class ControlCenterTable extends React.Component {

  constructor(props) {
    super(props);

    let pv;
    let EpicsPVs=[];
    let sys;
    let rowPVs=[];
    let id=0;

    const systems=props.systems;

    for (sys in systems){
      let displayName=systems[sys].displayName;
      let rowProps=systems[sys].props;
      //console.log(rowProps)
      let setpointPV={initialized: false,pvname:"",value:"",char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0,metadata:{}};
      setpointPV.pvname='pva://'+systems[sys].devices.device.deviceName+":"+systems[sys].devices.device.setpoint;

      let readbackPV={initialized: false,pvname:"",value:"",char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0,metadata:{}};

      readbackPV.pvname='pva://'+systems[sys].devices.device.deviceName+":"+systems[sys].devices.device.readback;

      let statusPV={initialized: false,pvname:"",value:"",char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0,metadata:{}};

      statusPV.pvname='pva://'+systems[sys].devices.device.deviceName+":"+systems[sys].devices.device.statusText;
      rowPVs.push({id:id,displayName:displayName,setpointPV:setpointPV,readbackPV:readbackPV,statusPV:statusPV,rowProps});
      id++;
    }
    this.state={rowPVs:rowPVs};
  //    console.log(rowPVs)





    this.SystemsEpicsPVs= this.SystemsEpicsPVs.bind(this);
    this.handleInputValue= this.handleInputValue.bind(this);
    this.handleMetadata= this.handleMetadata.bind(this);
    this.handleOnClick= this.handleOnClick.bind(this);

  }

  handleInputValue = (id,name)=>(inputValue,pvname,initialized,severity)=>{
    let rowPVs=this.state.rowPVs;
    rowPVs[id][name].value=inputValue;
    rowPVs[id][name].initialized=initialized;
    rowPVs[id][name].severity=severity;
      this.setState({rowPVs:rowPVs});
//console.log('handleInputValue',id,name,inputValue,pvname,initialized,severity)
//console.log(rowPVs)
  }

  handleMetadata = (id,name)=>(metadata) =>{
    let rowPVs=this.state.rowPVs;
    rowPVs[id][name].metadata=metadata;
    this.setState({rowPVs:rowPVs});

//console.log('handleMetaData',id,name,metadata)



  }

MultiplePVs

  handleOnClick = (id)=>()=> {
  //  console.log('row id clicked',this.props.systems[id]);
    this.props.handleOnSystemClick(this.props.systems[id]);
  }
  SystemsEpicsPVs = () => {
    //this.test("test1");
    //this.handleInputValue();
    let pv;
    let EpicsPVs=[];
    let sys;
    let rowPVs=this.state.rowPVs;
    let id=0;
    let row;
    let useStatus;

  //  console.log(rowPVs)
    for (row in rowPVs){

      //console.log("linedata: ", this.state.pvs[pv].linedata);
  //    console.log(row)

    if (typeof rowPVs[row].rowProps !== 'undefined'){
      if (typeof rowPVs[row].rowProps.useStatus !== 'undefined'){
        useStatus=rowPVs[row].rowProps.useStatus;
        }
      else{
        useStatus=true;
      }
    }
    else{
      useStatus=false;
    }
      EpicsPVs.push(

        <EpicsPV
          key= {rowPVs[row].setpointPV.pvname.toString()}
          pv={rowPVs[row].setpointPV.pvname}
          handleInputValue={this.handleInputValue(id,'setpointPV')}
          handleMetadata={this.handleMetadata(id,'setpointPV')}

        />

      );

      EpicsPVs.push(

        <EpicsPV
          key= {rowPVs[row].readbackPV.pvname.toString()}
          pv={rowPVs[row].readbackPV.pvname}
          handleInputValue={this.handleInputValue(id,'readbackPV')}
          handleMetadata={this.handleMetadata(id,'readbackPV')}

        />

      );
      if (useStatus){
      EpicsPVs.push(

        <EpicsPV
          key= {rowPVs[row].statusPV.pvname.toString()}
          pv={rowPVs[row].statusPV.pvname}
          handleInputValue={this.handleInputValue(id,'statusPV')}
          handleMetadata={this.handleMetadata(id,'statusPV')}

        />

      );
    }


      id++;
    }
    //console.log(EpicsPVs[0]);

    //  this.setState({rows:rows});
    return EpicsPVs;
  }



  render(){
    const { classes } = this.props;


    const rowPVs=this.state.rowPVs;
  //  console.log("render rowPVs",rowPVs)
    return (
      <React.Fragment>
        {this.SystemsEpicsPVs()}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Device Description</TableCell>
                <TableCell align="right">Setpoint</TableCell>
                <TableCell align="right">Readback</TableCell>
                <TableCell align="right">SavedValue</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowPVs.map(row => (
                <TableRow key={row.id} onClick={this.handleOnClick(row.id)} >

                  <TableCell component="th" scope="row" >
                    {row.displayName}
                  </TableCell>
                  <TableCell align="right">
                    <TextUpdate
                      pv={row.setpointPV.pvname}
                      usePrecision={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.usePrecision)==='undefined'?undefined:row.rowProps.usePrecision}
                      prec={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.prec)==='undefined'?undefined:row.rowProps.prec}
                      usePvUnits={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.usePvUnits)==='undefined'?undefined:row.rowProps.usePvUnits}
                      units={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.units)==='undefined'?'undefined':row.rowProps.units}
                    />

                  </TableCell>
                  <TableCell align="right">
                    <TextUpdate
                      pv={row.readbackPV.pvname}
                      usePrecision={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.usePrecision)==='undefined'?undefined:row.rowProps.usePrecision}
                      prec={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.prec)==='undefined'?undefined:row.rowProps.prec}
                      usePvUnits={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.usePvUnits)==='undefined'?undefined:row.rowProps.usePvUnits}
                      units={(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.units)==='undefined'?'undefined':row.rowProps.units}
                    />
                  </TableCell>
                  <TableCell align="right">{"N/A"}</TableCell>
                  <TableCell align="right">
                    {(typeof row.rowProps)==='undefined'?undefined:(typeof row.rowProps.useStatus)==='undefined'?'-':row.rowProps.useStatus===true?row.statusPV.value:'-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

ControlCenterTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlCenterTable);
