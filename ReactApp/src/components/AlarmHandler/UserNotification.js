import React, { useState, useEffect, useContext } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import TableChartIcon from '@material-ui/icons/TableChart';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import Layout from '../UI/Layout/ComposedLayouts/TraditionalLayout';
import UserTable from './UserTable';
import PVList from './PVList';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2),
        width: "100%",
        margin: 0
    },
    expansionPanelSummaryContent: {
        paddingTop: 0,
        paddingBottom: 0,
        '&$expanded': {
            margin: 0,
        },
    },
    expanded: {}
}))

const UserNotification = () => {

    const classes = useStyles()
    const theme = useTheme()

    const context = useContext(AutomationStudioContext)
    const { socket } = context
    // const username = context.userData.username

    const [dbPVsURL, setDbPVsURL] = useState('')
    const [dbUsersURL, setUsersURL] = useState('')
    const [alarmList, setAlarmList] = useState([])
    const [userList, setUserList] = useState([])
    const [userTableExpand, setUserTableExpand] = useState(true)
    const [pvListExpand, setPvListExpand] = useState(true)
    const [userTableIsExpanded, setUserTableIsExpanded] = useState(true)
    const [pvListIsExpanded, setPvListIsExpanded] = useState(true)

    const moreVertDrawerItems = (
        <React.Fragment>
            <ListItem button component={Link} to="/AlarmHandlerDemo">
                <ListItemIcon >
                    <TableChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={"Alarm Handler"} />
            </ListItem>
        </React.Fragment>
    )

    const handleNewDbPVsList = (msg) => {

        const data = JSON.parse(msg.data)

        let localAlarmList = []

        data.map((area) => {
            // Map alarms in area
            Object.keys(area["pvs"]).map(alarmKey => {
                localAlarmList.push(area["pvs"][alarmKey]["name"])
                return null
            })
            Object.keys(area).map(areaKey => {
                if (areaKey.includes("subArea")) {
                    // Map alarms in subarea
                    Object.keys(area[areaKey]["pvs"]).map(alarmKey => {
                        localAlarmList.push(area[areaKey]["pvs"][alarmKey]["name"])
                        return null
                    })
                }
                return null
            })
            return null
        })

        localAlarmList.sort()

        setAlarmList(localAlarmList)
    }

    const handleDbUsers = (msg) => {

        const data = JSON.parse(msg.data);

        setUserList(data)
    }

    const handleExpansionComplete = (panelName, isExpanded) => {
        if (panelName === 'userTable') {
            setUserTableIsExpanded(isExpanded)
        }
        else if (panelName === 'pvList') {
            setPvListIsExpanded(isExpanded)
        }
    }

    const handleExpandPanel = (panelName) => {
        if (panelName === 'userTable') {
            setUserTableExpand(userTableExpand ? false : true)
        }
        else if (panelName === 'pvList') {
            setPvListExpand(pvListExpand ? false : true)
        }
    }

    // componentDidMount
    useEffect(() => {
        // console.log('[AlarmHanderUN] componentDidMount')
        let jwt = JSON.parse(localStorage.getItem('jwt'));

        if (jwt === null) {
            jwt = 'unauthenticated'
        }

        const ALARM_DATABASE = "ALARM_DATABASE"
        const dbName = "demoAlarmDatabase"
        let colName = "pvs"
        const localDbPVsURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName + ":Parameters:{}"
        setDbPVsURL(localDbPVsURL)

        socket.emit('databaseBroadcastRead', { dbURL: localDbPVsURL, 'clientAuthorisation': jwt }, (data) => {
            if (data !== "OK") {
                console.log("ackdata", data);
            }
        });
        socket.on('databaseData:' + localDbPVsURL, handleNewDbPVsList);

        colName = "users"
        const localUsersURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName + ":Parameters:{}"
        setUsersURL(localUsersURL)

        socket.emit('databaseBroadcastRead', { dbURL: localUsersURL, 'clientAuthorisation': jwt }, (data) => {
            if (data !== "OK") {
                console.log("ackdata", data);
            }
        });
        socket.on('databaseData:' + localUsersURL, handleDbUsers);

        // componentWillUnmount
        return () => {
            socket.removeListener('databaseData:' + dbPVsURL, handleNewDbPVsList);
            socket.removeListener('databaseData:' + dbUsersURL, handleDbUsers);
        }
        // disable useEffect dependencies for "componentDidMount"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let userTableHeight = '25vh'
    let pvListHeight = '47vh'
    if (userTableExpand && !pvListExpand && !pvListIsExpanded) {
        userTableHeight = '76vh'
    }
    else if (!userTableExpand && pvListExpand && !userTableIsExpanded) {
        pvListHeight = '76vh'
    }

    return (
        <Layout
            title="Demo Alarm Handler: User Notification"
            alignTitle="left"
            titleVariant="h6"
            // titleTextStyle={{ textTransform: 'uppercase' }}
            denseAppBar
            moreVertDrawerItems={moreVertDrawerItems}
            hideMoreVertDrawerAfterItemClick
        >
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                className={classes.root}
                spacing={2}
            >
                <Grid item xs={12}>
                    <ExpansionPanel
                        elevation={theme.palette.paperElevation}
                        expanded={userTableExpand}
                        onClick={() => handleExpandPanel('userTable')}
                        TransitionProps={{
                            onEntered: () => handleExpansionComplete('userTable', true),
                            onExited: () => handleExpansionComplete('userTable', false)
                        }}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            classes={{ content: classes.expansionPanelSummaryContent, expanded: classes.expanded }}
                        >
                            <div style={{ display: 'flex', width: '100%' }}>
                                <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>Alarm Handler Users</div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <UserTable
                                height={userTableHeight}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                    <ExpansionPanel
                        elevation={theme.palette.paperElevation}
                        expanded={pvListExpand}
                        onClick={() => handleExpandPanel('pvList')}
                        TransitionProps={{
                            onEntered: () => handleExpansionComplete('pvList', true),
                            onExited: () => handleExpansionComplete('pvList', false)
                        }}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            classes={{ content: classes.expansionPanelSummaryContent, expanded: classes.expanded }}
                        >
                            <div style={{ display: 'flex', width: '100%' }}>
                                <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>Filtered PVs</div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <PVList
                                height={pvListHeight}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default UserNotification;