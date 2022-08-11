import React, { useRef, useEffect } from 'react';

// import { makeStyles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const AlarmLog = (props) => {
    const myRef = useRef()

    useEffect(() => {
        myRef.current.scrollTo(0, 0)
    }, [props.scrollReset])

    return (
        <TableContainer style={{ height: props.height, overflow: 'auto' }} ref={myRef}>
            <Table aria-label="Log Table" size="small" >
                <TableBody>
                    {props.alarmLogDisplayArray.map((entry) => {
                        return (
                            <TableRow
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                }}
                                hover
                                key={`${entry.key}`}>
                                <TableCell>{entry.content}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(AlarmLog)