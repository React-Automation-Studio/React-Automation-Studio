import React, { useRef, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const PVList = (props) => {

    const myRef = useRef()

    useEffect(() => {
        myRef.current.scrollTo(0, 0)
    }, [props.alarmList.length])

    const logData = props.alarmList.map((alarmName) => {
        const visible = true
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
                </TableRow>
                : null
        )
    })

    return (
        <TableContainer style={{ height: props.height, overflow: 'auto' }} ref={myRef}>
            <Table aria-label="Filtered PV List" size="small" >
                <TableBody>
                    {logData}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(PVList);