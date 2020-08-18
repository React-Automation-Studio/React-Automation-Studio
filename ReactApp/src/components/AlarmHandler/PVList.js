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

    const logData = Object.keys(props.alarmPVDict).map((alarmName) => {

        let visible = true

        if (props.filterUserRegex.length > 0) {
            visible = props.filterUserRegex.reduce((acc, expression) => {
                    let myRe = new RegExp(expression)
                    return acc || myRe.test(alarmName)
            }, false)
        }

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
                    <TableCell>{props.alarmPVDict[alarmName][0]}</TableCell>
                    <TableCell>{props.alarmPVDict[alarmName][1]}</TableCell>
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