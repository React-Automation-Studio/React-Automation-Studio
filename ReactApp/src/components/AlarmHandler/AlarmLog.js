import React, { useRef, useEffect } from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import { format, parseISO } from 'date-fns';

const AlarmLog = (props) => {
    // const classes = useStyles();
    const myRef = useRef()

    // console.log('AlarmLog rendered')

    useEffect(() => {
        myRef.current.scrollTo(0, 0)
    }, [props.slicedData.length])

    return (
        <TableContainer style={{ height: props.height, overflow: 'auto' }} ref={myRef}>
            <Table aria-label="Log Table" size="small" >
                <TableBody>
                    {props.slicedData.map((entry) => {
                        const date = format(parseISO(entry.timestamp), "HH:mm:ss E, dd LLL yyyy")
                        const content = `${date}: ${entry.entry}`
                        return (
                            <TableRow
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                }}
                                hover
                                key={`${entry.timestamp}-${entry.entry}`}>
                                <TableCell>{content}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(AlarmLog)