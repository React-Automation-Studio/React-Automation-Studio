import React, { useRef, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

const PVList = (props) => {

    const theme = useTheme()

    const styledTableHeadCellSx = {
        backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
        color: theme.palette.mode === 'dark' ? undefined : 'white',
    };

    const myRef = useRef()

    useEffect(() => {
        myRef.current.scrollTo(0, 0)
    }, [props.alarmPVDict.length])

    const orderedData = Object.keys(props.alarmPVDict).sort().reduce((obj, key) => {
        obj[key] = props.alarmPVDict[key];
        return obj;
    }, {})

    const logData = Object.keys(orderedData).map((alarmName) => {

        let visible = true

        if (props.filterUserRegex.length > 0) {
            visible = props.filterUserRegex.reduce((acc, entry) => {
                let myRe = new RegExp(entry.regEx)
                return acc || myRe.test(alarmName)
            }, false)
        }

        const hostname = props.alarmPVDict[alarmName]
            ? props.alarmPVDict[alarmName].reduce((acc, entry, index) => {
                if (index > 1) {
                    return `${acc}${entry}`
                }
                return acc
            }, '')
            : 'Error connecting to pv'

        return (
            visible
                ? <TableRow
                    onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                    }}
                    hover
                    key={alarmName}>
                    <TableCell>{alarmName}</TableCell>
                    <TableCell>{props.alarmPVDict[alarmName][1]}</TableCell>
                    <TableCell>{hostname}</TableCell>
                </TableRow>
                : null
        )
    })

    return (
        <TableContainer component={Paper} style={{ height: props.height }} elevation={theme.palette.mode === 'dark' ? undefined : 5} ref={myRef}>
            <Table aria-label="PV List" stickyHeader size="small">
                <TableHead>
                    <TableRow
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                        }}
                    >
                        <TableCell align="left" sx={{ '&.MuiTableCell-stickyHeader': styledTableHeadCellSx }}>PV Name</TableCell>
                        <TableCell align="left" sx={{ '&.MuiTableCell-stickyHeader': styledTableHeadCellSx }}>PV Description</TableCell>
                        <TableCell align="left" sx={{ '&.MuiTableCell-stickyHeader': styledTableHeadCellSx }}>IOC Server Hostname</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logData}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(PVList);