import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TextUpdate from '../../BaseComponents/TextUpdate';
import { Typography } from '@mui/material';
import { replaceSystemMacros } from '../../SystemComponents/Utils/macroReplacement';

const ControlTable = (props) => {
  const theme = useTheme();
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

  return (
    <Paper 
      sx={{
        width: '100%',
        marginTop: theme.spacing(1) * 0,
        marginBottom: theme.spacing(4),
        overflowX: 'auto',
      }}
      elevation={theme.palette.paperElevation} 
      style={props.style}
    >
      <Table 
        sx={{
          padding: 0,
          minWidth: 700,
        }}
        size={'small'} 
        stickyHeader={true}
      >
        <TableHead 
          sx={{
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : undefined,
          }}
        >
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
              <TableCell sx={{ width: "20%" }} align="left" component="th" scope="row" >
                <Typography variant={'body2'}>{row.displayName}</Typography>
              </TableCell>
              <TableCell sx={{ width: "20%" }} align="center">
                <TextUpdate
                  pv={row.setpointPv}
                  usePrecision={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.usePrecision) === 'undefined' ? undefined : row.rowProps.usePrecision}
                  prec={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.prec) === 'undefined' ? undefined : row.rowProps.prec}
                  usePvUnits={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.usePvUnits) === 'undefined' ? undefined : row.rowProps.usePvUnits}
                  units={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.units) === 'undefined' ? 'undefined' : row.rowProps.units}
                  alarmSensitive={true}
                />
              </TableCell>
              <TableCell sx={{ width: "20%" }} align="center">
                <TextUpdate
                  pv={row.readbackPv}
                  usePrecision={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.usePrecision) === 'undefined' ? undefined : row.rowProps.usePrecision}
                  prec={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.prec) === 'undefined' ? undefined : row.rowProps.prec}
                  usePvUnits={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.usePvUnits) === 'undefined' ? undefined : row.rowProps.usePvUnits}
                  units={(typeof row.rowProps) === 'undefined' ? undefined : (typeof row.rowProps.units) === 'undefined' ? 'undefined' : row.rowProps.units}
                  alarmSensitive={true}
                />
              </TableCell>
              <TableCell sx={{ width: "20%" }} align="center">{"N/A"}</TableCell>
              <TableCell sx={{ width: "20%" }} align="center">
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

export default ControlTable;
