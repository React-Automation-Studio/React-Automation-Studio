import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextUpdate from '../../BaseComponents/TextUpdate';
import { Typography } from '@material-ui/core';
import { replaceSystemMacros } from '../../SystemComponents/Utils/macroReplacement';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1) * 0,
    marginBottom: theme.spacing(4),
    overflowX: 'auto',
  },
  table: {
    padding:0,
    minWidth: 700,
  },
  tableHead: {
    // eslint-disable-next-line eqeqeq 
    backgroundColor: theme.palette.type == 'light' ? theme.palette.primary.light : undefined,
  },
  tableCell: {
    width: "20%"
  }
});



const ControlTable = (props) => {
  const { systems } = props;
  const [rowPvs, setRowPvs] = useState([]);

  useEffect(() => {
    let sys;
    let id = 0;
    let rowPvs = [];
    for (sys in systems) {
      let system = replaceSystemMacros(systems[sys], systems[sys].macros);
      let rowProps = system.tableProps;
      const {editorType}=systems[sys]
      if (editorType === 'editorSinglePS') {
        rowPvs.push({ id: id, system: system, displayName: system.displayName, setpointPv: system.setpointPv, readbackPv: system.readbackPv, statusTextPv: system.statusTextPv, rowProps });
        id++;
      }
      else if (editorType === 'editorSlitXY') {
        rowPvs.push({ id: id, system: system, displayName: system.displayName+' X Gap', setpointPv: system.xGapSetpointPv, readbackPv: system.xGapReadbackPv, statusTextPv: system.xDriveOnPv, rowProps });
        id++;
        rowPvs.push({ id: id, system: system, displayName: system.displayName+' X Offset', setpointPv: system.xOffsetSetpointPv, readbackPv: system.xOffsetReadbackPv, statusTextPv: system.xDriveOnPv, rowProps });
        id++;
        rowPvs.push({ id: id, system: system, displayName: system.displayName+' Y Gap', setpointPv: system.yGapSetpointPv, readbackPv: system.yGapReadbackPv, statusTextPv: system.yDriveOnPv, rowProps });
        id++;
        rowPvs.push({ id: id, system: system, displayName: system.displayName+' Y Offset', setpointPv: system.yOffsetSetpointPv, readbackPv: system.yOffsetReadbackPv, statusTextPv: system.yDriveOnPv, rowProps });
        id++;
      }
      else if (editorType === 'editorSteererXY') {
        rowPvs.push({ id: id, system: system, displayName: system.displayName+' X ', setpointPv: system.xSetpointPv, readbackPv: system.xSetpointPv, statusTextPv: system.xOnPv, rowProps });
        id++;
        rowPvs.push({ id: id, system: system, displayName: system.displayName+' Y ', setpointPv: system.ySetpointPv, readbackPv: system.ySetpointPv, statusTextPv: system.yOnPv, rowProps });
        
        id++;
      }
      

    }
    setRowPvs(rowPvs);
  }, [systems])












  const handleOnClick = (id) => () => {

    props.handleOnSystemClick(rowPvs[id].system);
  }

  



  const { classes } = props;



  return (

    <Paper className={classes.root} elevation={props.theme.palette.paperElevation} style={props.style}>
      <Table className={classes.table} size={'small'} stickyHeader={true} >
        <TableHead className={classes.tableHead} >
          <TableRow>
            <TableCell>Device Description</TableCell>
            <TableCell align="center">Setpoint</TableCell>
            <TableCell align="center">Readback</TableCell>
            <TableCell align="center">Saved Value</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowPvs.map((row,index) => (
            <TableRow key={index.toString()} onClick={handleOnClick(row.id)} >

              <TableCell className={classes.tableCell} align="left" component="th" scope="row" >
                <Typography variant={'body2'}>{row.displayName}</Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <TextUpdate
                  pv={row.setpointPv}
                  usePrecision={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.usePrecision) === 'undefined' ? undefined : row.rowProps.usePrecision}
                  prec={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.prec) === 'undefined' ? undefined : row.rowProps.prec}
                  usePvUnits={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.usePvUnits) === 'undefined' ? undefined : row.rowProps.usePvUnits}
                  units={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.units) === 'undefined' ? 'undefined' : row.rowProps.units}
                  alarmSensitive={true}
                />

              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <TextUpdate
                  pv={row.readbackPv}
                  usePrecision={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.usePrecision) === 'undefined' ? undefined : row.rowProps.usePrecision}
                  prec={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.prec) === 'undefined' ? undefined : row.rowProps.prec}
                  usePvUnits={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.usePvUnits) === 'undefined' ? undefined : row.rowProps.usePvUnits}
                  units={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.units) === 'undefined' ? 'undefined' : row.rowProps.units}
                  alarmSensitive={true}
                />
              </TableCell>
              <TableCell className={classes.tableCell} align="center">{"N/A"}</TableCell>
              <TableCell className={classes.tableCell} align="center">
                {(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.useStatus) === 'undefined' ? '-' : row.rowProps.useStatus === true ?
                  
                  <TextUpdate
                    pv={row.statusTextPv}
                    useStringValue={true}
                  /> :
                  '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

  );
}




export default withStyles(styles, { withTheme: true })(ControlTable);
