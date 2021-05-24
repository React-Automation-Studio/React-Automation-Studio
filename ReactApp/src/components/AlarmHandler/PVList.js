import React, { useRef, useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    styledTableHeadCell: {
        backgroundColor: theme.palette.type === 'dark' ? undefined : theme.palette.primary.light,
        color: theme.palette.type === 'dark' ? undefined : 'white',
    }
}))

const PVList = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    const myRef = useRef()

    useEffect(() => {
        myRef.current.scrollTo(0, 0)
    }, [props.alarmPVDict.length])

    const orderedData = Object.keys(props.alarmPVDict).sort().reduce((obj, key) => {
        obj[key] = props.alarmPVDict[key];
        return obj;
    }, {})

    // console.log(props.alarmPVDict)

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
        <TableContainer component={Paper} style={{ height: props.height }} elevation={theme.palette.type === 'dark' ? undefined : 5} ref={myRef}>
            <Table aria-label="PV List" stickyHeader size="small">
                {/* <colgroup>
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '30%' }} />
                </colgroup> */}
                <TableHead>
                    <TableRow
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                        }}
                    >
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>PV Name</TableCell>
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>PV Description</TableCell>
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>IOC Server Hostname</TableCell>
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