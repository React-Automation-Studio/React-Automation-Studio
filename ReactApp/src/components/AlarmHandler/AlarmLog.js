import React, { useRef, useEffect } from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';


// Styles
// const useStyles = makeStyles(theme => ({
//     root: {
//         width: '100%',
//         overflowY: 'auto',

//     },
// }));

const AlarmLog = props => {

    // console.log("AlarmLog rendered")

    // const classes = useStyles();
    const myRef = useRef()

    useEffect(() => {
        myRef.current.scrollTo(0, 0)
    }, [props.alarmLogDisplayArray.length])

    const logData = props.alarmLogDisplayArray.map((entry) => {
        const date = new Date(entry.timestamp * 1000)
        const content = `${date.toLocaleString()}: ${entry.entry}`
        const visible = content.toLowerCase().includes(props.alarmLogSearchString.toLowerCase())
        return (
            visible
                ? <TableRow
                    onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                    }}
                    hover
                    key={`${entry.timestamp}-${entry.entry}`}>
                    <TableCell>{content}</TableCell>
                </TableRow>
                : null
        )
    })

    return (
        <TableContainer style={{ height: props.height, overflow: 'auto' }} ref={myRef}>
            <Table aria-label="Log Table" size="small" >
                <TableBody>
                    {logData}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(AlarmLog)