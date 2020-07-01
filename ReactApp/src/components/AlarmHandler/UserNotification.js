import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';

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
import DataConnection from '../SystemComponents/DataConnection';
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
    const username = context.userData.username

    // to connect to all PVs before updating state
    const firstAlarmPVDict = {}

    const [dbPVsURL, setDbPVsURL] = useState('')
    const [dbUsersURL, setUsersURL] = useState('')
    const [dbConfigURL, setDbConfigURL] = useState('')
    const [alarmList, setAlarmList] = useState([])
    const [userList, setUserList] = useState([])
    const [backupUserList, setBackupUserList] = useState([])
    const [userEdit, setUserEdit] = useState({})
    const [userTableExpand, setUserTableExpand] = useState(true)
    const [pvListExpand, setPvListExpand] = useState(true)
    const [userTableIsExpanded, setUserTableIsExpanded] = useState(true)
    const [pvListIsExpanded, setPvListIsExpanded] = useState(true)
    const [filterUser, setFilterUser] = useState('')
    const [filterUserRegex, setFilterUserRegex] = useState([])
    const [dictUserRegex, setDictUserRegex] = useState({})
    const [addRegexVal, setAddRegexVal] = useState('')
    const [alarmIOCPVPrefix, setAlarmIOCPVPrefix] = useState(null)
    const [alarmIOCPVSuffix, setAlarmIOCPVSuffix] = useState(null)
    const [loadPVList, setLoadPVList] = useState(false)
    const [lastAlarm, setLastAlarm] = useState(null)
    const [alarmPVDict, setAlarmPVDict] = useState({})

    const loadPVListRef = useRef(loadPVList);
    loadPVListRef.current = loadPVList;

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

    const constructDESC_HOST = (value, pvname) => {
        let epicsPVName = pvname.replace("pva://", "")
        epicsPVName = epicsPVName.replace(alarmIOCPVPrefix, "")
        epicsPVName = epicsPVName.replace(alarmIOCPVSuffix, "")

        // console.log(epicsPVName, value)

        // still connecting to pvs
        if (!loadPVList) {
            firstAlarmPVDict[epicsPVName] = [value[1], value[2]]
            if (epicsPVName === lastAlarm) {
                setLoadPVList(true)
                setAlarmPVDict(firstAlarmPVDict)
            }
        }
        // all pvs connected
        else {
            const localAlarmPVDict = { ...alarmPVDict }
            localAlarmPVDict[epicsPVName] = value
            setAlarmPVDict(localAlarmPVDict)
        }
    }

    const autoLoadPVList = () => {
        const timer = setTimeout(() => {
            if (!loadPVListRef.current) {
                console.log('Warning: Auto load PV List')
            }
            setLoadPVList(true)
        }, 5000);
        return () => clearTimeout(timer);
    }

    const handleSetAddRegexVal = (event) => {
        setAddRegexVal(event.target.value)
        setFilterUserRegex([event.target.value])
    }

    const handleSetFilterUser = useCallback((name, username) => {
        setFilterUser(name)
        setFilterUserRegex(dictUserRegex[`${username}-${name}`])
    }, [dictUserRegex])

    const handleSetFilterUserRegex = useCallback((event, expression) => {
        event.preventDefault()
        event.stopPropagation()
        setFilterUserRegex([expression])
    }, [])

    const handleSetUserEdit = useCallback((event, name, username, value) => {
        event.preventDefault()
        event.stopPropagation()

        const copyUserList = userList.map(a => ({ ...a }))
        setBackupUserList(copyUserList)

        let localUserEdit = { ...userEdit }
        localUserEdit[`${username}-${name}`] = value
        setUserEdit(localUserEdit)

        setFilterUserRegex(dictUserRegex[`${username}-${name}`])
        setAddRegexVal('')
    }, [userEdit, dictUserRegex, userList])

    const cancelEdit = useCallback((event, name, username) => {
        handleSetUserEdit(event, name, username, false)
        setUserList(backupUserList)
    }, [backupUserList, handleSetUserEdit])

    const updateUserEmail = useCallback((event, name, username) => {
        // Find match and note it's index in userList
        const match = userList.filter(el => el.name === name && el.username === username)[0]
        const userIndex = userList.indexOf(match)

        match.email = event.target.value

        // Create new userList
        const newUserList = [...userList]
        newUserList[userIndex] = match

        setUserList(newUserList)
    }, [userList])

    const handleDeleteChip = useCallback((name, username, expression) => {

        // Find match and note it's index in userList
        const match = userList.filter(el => el.name === name && el.username === username)[0]
        const userIndex = userList.indexOf(match)

        // Update match by removing relevant expression
        const newNotifyPVs = match.notifyPVs.filter(el => el !== expression)
        match.notifyPVs = newNotifyPVs

        // Create new userList
        const newUserList = [...userList]
        newUserList[userIndex] = match

        setUserList(newUserList)
    }, [userList])

    const handleNewDbPVsList = (msg) => {

        const data = JSON.parse(msg.data)

        let localAlarmList = []
        let localLastAlarm = ''

        data.map((area) => {
            // Map alarms in area
            Object.keys(area["pvs"]).map(alarmKey => {
                localAlarmList.push(area["pvs"][alarmKey]["name"])
                localLastAlarm = area["pvs"][alarmKey]["name"]
                return null
            })
            Object.keys(area).map(areaKey => {
                if (areaKey.includes("subArea")) {
                    // Map alarms in subarea
                    Object.keys(area[areaKey]["pvs"]).map(alarmKey => {
                        localAlarmList.push(area[areaKey]["pvs"][alarmKey]["name"])
                        localLastAlarm = area[areaKey]["pvs"][alarmKey]["name"]
                        return null
                    })
                }
                return null
            })
            return null
        })

        localAlarmList.sort()

        setAlarmList(localAlarmList)
        setLastAlarm(localLastAlarm)

        if (!loadPVList) {
            autoLoadPVList()
        }
    }

    const handleDbUsers = (msg) => {

        const data = JSON.parse(msg.data)

        let localUserEdit = {}
        let localDictUserRegex = {}
        let localFilterUser = null
        let localFilterUserRegex = null

        data.map((user, index) => {
            if (index === 0) {
                localFilterUser = user.name
                localFilterUserRegex = user.notifyPVs
            }
            localDictUserRegex[`${user.username}-${user.name}`] = user.notifyPVs
            localUserEdit[`${user.username}-${user.name}`] = false
            return null
        })

        setDictUserRegex(localDictUserRegex)
        setFilterUser(localFilterUser)
        setFilterUserRegex(localFilterUserRegex)
        setUserEdit(localUserEdit)
        setUserList(data)
    }

    const handleDbConfig = (msg) => {
        const data = JSON.parse(msg.data)[0];
        setAlarmIOCPVPrefix(data["alarmIOCPVPrefix"])
        setAlarmIOCPVSuffix(data['alarmIOCPVSuffix'])
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

        colName = "config"
        const localDbConfigURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName + ":Parameters:{}"
        setDbConfigURL(localDbConfigURL)

        socket.emit('databaseBroadcastRead', { dbURL: localDbConfigURL, 'clientAuthorisation': jwt }, (data) => {
            if (data !== "OK") {
                console.log("ackdata", data);
            }
        });
        socket.on('databaseData:' + localDbConfigURL, handleDbConfig);

        // componentWillUnmount
        return () => {
            socket.removeListener('databaseData:' + dbPVsURL, handleNewDbPVsList);
            socket.removeListener('databaseData:' + dbUsersURL, handleDbUsers);
            socket.removeListener('databaseData:' + dbConfigURL, handleDbConfig);

        }
        // disable useEffect dependencies for "componentDidMount"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let alarmPVs = null
    if (alarmIOCPVPrefix !== null && alarmIOCPVSuffix !== null) {
        alarmPVs = alarmList.map(alarm => (
            <DataConnection
                key={alarm}
                pv={`pva://${alarmIOCPVPrefix}${alarm}${alarmIOCPVSuffix}`}
                handleInputValue={constructDESC_HOST}
            />
        ))
    }

    const filterName = filterUserRegex.length === 1 ? filterUserRegex[0] : filterUser

    let userTableHeight = '25vh'
    let pvListHeight = '47vh'
    if (userTableExpand && !pvListExpand && !pvListIsExpanded) {
        userTableHeight = '76vh'
    }
    else if (!userTableExpand && pvListExpand && !userTableIsExpanded) {
        pvListHeight = '76vh'
    }

    // console.log(filterUserRegex)

    // console.log(loadPVList)
    // console.log('userList:', userList)
    // console.log('backupUserList:', backupUserList)

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
            {alarmPVs}
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
                                addRegexVal={addRegexVal}
                                userList={userList}
                                userEdit={userEdit}
                                username={username}
                                filterUserRegex={filterUserRegex}
                                setUserEdit={handleSetUserEdit}
                                setFilterUser={handleSetFilterUser}
                                setFilterUserRegex={handleSetFilterUserRegex}
                                setAddRegexVal={handleSetAddRegexVal}
                                deleteChip={handleDeleteChip}
                                cancelEdit={cancelEdit}
                                updateUserEmail={updateUserEmail}
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
                                <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>{`Filtered PVs: ${filterName}`}</div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {loadPVList && <PVList
                                alarmPVDict={alarmPVDict}
                                height={pvListHeight}
                            />}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default UserNotification;