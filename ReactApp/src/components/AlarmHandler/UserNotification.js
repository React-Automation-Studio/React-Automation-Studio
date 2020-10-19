import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import ScheduleDialog from './ScheduleDialog';
import UserTable from './UserTable';
import PVList from './PVList';
import useMongoDbWatch from '../SystemComponents/database/MongoDB/useMongoDbWatch';
import useMongoDbUpdateOne from '../SystemComponents/database/MongoDB/useMongoDbUpdateOne';

import { format } from 'date-fns';

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

const UserNotification = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    const context = useContext(AutomationStudioContext)
    const username = context.userData.username

    // to connect to all PVs before updating state
    const firstAlarmPVDict = {}

    const [alarmList, setAlarmList] = useState([])
    const [userList, setUserList] = useState([])
    const [userEdit, setUserEdit] = useState({})
    const [userSchedule, setUserSchedule] = useState({})
    const [userTableExpand, setUserTableExpand] = useState(true)
    const [pvListExpand, setPvListExpand] = useState(true)
    const [userTableIsExpanded, setUserTableIsExpanded] = useState(true)
    const [pvListIsExpanded, setPvListIsExpanded] = useState(true)
    const [filterUser, setFilterUser] = useState('')
    const [filterUserRegex, setFilterUserRegex] = useState([])
    const [dictUserRegex, setDictUserRegex] = useState({})
    const [alarmIOCPVPrefix, setAlarmIOCPVPrefix] = useState(null)
    const [alarmIOCPVSuffix, setAlarmIOCPVSuffix] = useState(null)
    const [loadPVList, setLoadPVList] = useState(false)
    const [lastAlarm, setLastAlarm] = useState(null)
    const [alarmPVDict, setAlarmPVDict] = useState({})
    const [backupUserList, setBackupUserList] = useState({})
    const [regexError, setRegexError] = useState({})
    const [addRegexVal, setAddRegexVal] = useState({})

    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogUserObject, setDialogUserObject] = useState({})

    const dbPVData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs:Parameters:{}` }).data
    const dbUsersData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users:Parameters:{}` }).data
    const dbConfigData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:config:Parameters:{}` }).data

    const dbUpdateOne = useMongoDbUpdateOne({})


    const loadPVListRef = useRef(loadPVList);
    loadPVListRef.current = loadPVList;

    const userScheduleString = useCallback((userObject) => {
        let sumString = "Do not notify me"
        if (userObject.notify) {
            sumString = "Notify me "
            if (userObject.allDay) {
                sumString = sumString.concat("all day ")
            }
            else {
                const fromTime = format(new Date(userObject.fromTime), 'hh:mm a')
                const toTime = format(new Date(userObject.toTime), 'hh:mm a')
                sumString = sumString.concat(`between ${fromTime} and ${toTime} `)
            }
            if (userObject.weekly) {
                let days = Object.entries(userObject.days).reduce((acc, day) => {
                    if (day[1]) {
                        acc.push(day[0])
                    }
                    return acc
                }, [])
                if (days.length === 7) {
                    sumString = sumString.concat("everyday")
                }
                else {
                    const lastDay = days[days.length - 1]
                    days.pop()
                    days = days.join(', ')
                    days = days.concat(` and ${lastDay}`)
                    sumString = sumString.concat(`on a ${days}`)
                }
            }
            else {
                sumString = sumString.concat(`from ${userObject.fromDate} to ${userObject.toDate}`)
            }
            return sumString
        }
        else {
            return sumString

        }
    }, [])

    const constructDESC_HOST = (value, pvname) => {
        let epicsPVName = pvname.replace("pva://", "")
        epicsPVName = epicsPVName.replace(alarmIOCPVPrefix, "")
        epicsPVName = epicsPVName.replace(alarmIOCPVSuffix, "")

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

    const handleSetAddRegexVal = (event, username, name) => {

        const localAddRegexVal = { ...addRegexVal }
        localAddRegexVal[`${username}-${name}`] = event.target.value
        setAddRegexVal(localAddRegexVal)

        try {
            new RegExp(event.target.value)
            const localRegexError = { ...regexError }
            localRegexError[`${username}-${name}`] = false
            setRegexError(localRegexError)
            setFilterUserRegex([event.target.value])
        }
        catch (e) {
            const localRegexError = { ...regexError }
            localRegexError[`${username}-${name}`] = true
            setRegexError(localRegexError)
        }

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

        const match = userList.filter(el => el.name === name && el.username === username)[0]
        setFilterUserRegex(match.notifyPVs)
        setFilterUser(match.name)

        if (value) {
            // only back up when starting to edit
            const localBackupUserList = { ...backupUserList }
            localBackupUserList[`${username}-${name}`] = { ...match }
            setBackupUserList(localBackupUserList)
        }

        let localUserEdit = { ...userEdit }
        localUserEdit[`${username}-${name}`] = value
        setUserEdit(localUserEdit)
    }, [userEdit, userList, backupUserList])

    const applyEdit = useCallback((event, name, username) => {

        const localAddRegexVal = { ...addRegexVal }
        localAddRegexVal[`${username}-${name}`] = ''
        setAddRegexVal(localAddRegexVal)

        handleSetUserEdit(event, name, username, false)
        // Find match and note it's index in userList
        const match = userList.filter(el => el.name === name && el.username === username)[0]
        const id = match['_id']['$oid']

        setFilterUserRegex(match.notifyPVs)

        let newvalues = { '$set': { "email": match.email } }

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
            id: id,
            update: newvalues
        })

        newvalues = { '$set': { "notifyPVs": match.notifyPVs } }

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
            id: id,
            update: newvalues
        })

    }, [handleSetUserEdit, userList, dbUpdateOne, addRegexVal, props.dbName])

    const cancelEdit = useCallback((event, name, username) => {
        handleSetUserEdit(event, name, username, false)

        // Find match and note it's index in userList
        const match = userList.filter(el => el.name === name && el.username === username)[0]
        const userIndex = userList.indexOf(match)

        // Create new userList
        const newUserList = [...userList]
        newUserList[userIndex] = backupUserList[`${username}-${name}`]
        setUserList(newUserList)

        const localAddRegexVal = { ...addRegexVal }
        localAddRegexVal[`${username}-${name}`] = ''
        setAddRegexVal(localAddRegexVal)

        setFilterUserRegex(backupUserList[`${username}-${name}`].notifyPVs)

    }, [backupUserList, handleSetUserEdit, addRegexVal, userList])

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

    const addChip = useCallback((event, name, username, expression) => {
        event.stopPropagation()
        event.preventDefault()

        // Only add non blank chips
        if (expression !== '') {
            const localAddRegexVal = { ...addRegexVal }
            localAddRegexVal[`${username}-${name}`] = ''
            setAddRegexVal(localAddRegexVal)

            // Find match and note it's index in userList
            const match = userList.filter(el => el.name === name && el.username === username)[0]
            const userIndex = userList.indexOf(match)

            // Update match by adding relevant expression
            const newNotifyPVs = [...match.notifyPVs, expression]
            match.notifyPVs = newNotifyPVs

            // Create new userList
            const newUserList = [...userList]
            newUserList[userIndex] = match

            setUserList(newUserList)
            setFilterUserRegex(newNotifyPVs)
        }
    }, [userList, addRegexVal])

    const deleteChip = useCallback((event, name, username, expression) => {
        event.preventDefault()
        event.stopPropagation()
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
        setFilterUserRegex(newNotifyPVs)
    }, [userList])

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

    const handleOpenDialog = useCallback((event, name, username) => {
        setDialogUserObject(userSchedule[`${username}-${name}`])
        setDialogOpen(true)
    }, [userSchedule])

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false)
    }, [])

    // handleNewDbPVsList
    useEffect(() => {
        if (dbPVData !== null) {
            let localAlarmList = []
            let localLastAlarm = ''

            dbPVData.map((area) => {
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
        // disable useEffect dependencies for "dbPVData"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbPVData])

    // handleDbUsers
    useEffect(() => {
        if (dbUsersData !== null) {
            const localUserEdit = {}
            const localDictUserRegex = {}
            const localBackupUserList = {}
            const localRegexError = {}
            const localAddRegexVal = {}
            const localUserSchedule = {}
            // let localFilterUser = null
            // let localFilterUserRegex = null

            dbUsersData.map((user, index) => {
                if (index === 0) {
                    // localFilterUser = user.name
                    // localFilterUserRegex = user.notifyPVs
                }
                localDictUserRegex[`${user.username}-${user.name}`] = user.notifyPVs
                localUserSchedule[`${user.username}-${user.name}`] = { ...user.notifySetup }
                localBackupUserList[`${user.username}-${user.name}`] = user
                localUserEdit[`${user.username}-${user.name}`] = false
                localRegexError[`${user.username}-${user.name}`] = false
                localAddRegexVal[`${user.username}-${user.name}`] = ''
                return null
            })

            if (Object.keys(userEdit).length === 0) {
                setUserEdit(localUserEdit)
                setRegexError(localRegexError)
                setAddRegexVal(localAddRegexVal)
            }

            setDictUserRegex(localDictUserRegex)
            setUserSchedule(localUserSchedule)
            // setFilterUser(localFilterUser)
            // setFilterUserRegex(localFilterUserRegex)
            setBackupUserList(localBackupUserList)
            setUserList(dbUsersData)
        }
        // disable useEffect dependencies for "dbUsersData"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbUsersData])

    // handleDbConfig
    useEffect(() => {
        if (dbConfigData !== null) {
            const data = dbConfigData[0];
            setAlarmIOCPVPrefix(data["alarmIOCPVPrefix"])
            setAlarmIOCPVSuffix(data['alarmIOCPVSuffix'])
        }
        // disable useEffect dependencies for "dbConfigData"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbConfigData])

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

    const filterName = filterUserRegex.length === 0
        ? 'ALL'
        : filterUserRegex.length === 1
            ? filterUserRegex[0] === ""
                ? 'ALL'
                : filterUserRegex[0]
            : filterUser

    let userTableHeight = '40vh'
    let pvListHeight = '32vh'
    if (userTableExpand && !pvListExpand && !pvListIsExpanded) {
        userTableHeight = '76vh'
    }
    else if (!userTableExpand && pvListExpand && !userTableIsExpanded) {
        pvListHeight = '76vh'
    }

    console.log(dialogUserObject)

    return (
        <React.Fragment>
            {alarmPVs}
            {
                Object.keys(dialogUserObject).length !== 0
                    ? <ScheduleDialog
                        dialogOpen={dialogOpen}
                        closeDialog={handleCloseDialog}
                        dialogUserObject={dialogUserObject}
                        setDialogUserObject={setDialogUserObject}
                        userScheduleString={userScheduleString}
                    />
                    : null
            }
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
                                regexError={regexError}
                                addRegexVal={addRegexVal}
                                userList={userList}
                                userEdit={userEdit}
                                username={username}
                                filterUserRegex={filterUserRegex}
                                setUserEdit={handleSetUserEdit}
                                setFilterUser={handleSetFilterUser}
                                setFilterUserRegex={handleSetFilterUserRegex}
                                setAddRegexVal={handleSetAddRegexVal}
                                addChip={addChip}
                                deleteChip={deleteChip}
                                cancelEdit={cancelEdit}
                                applyEdit={applyEdit}
                                updateUserEmail={updateUserEmail}
                                openDialog={handleOpenDialog}
                                height={userTableHeight}
                                userSchedule={userSchedule}
                                userScheduleString={userScheduleString}
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
                                filterUserRegex={filterUserRegex}
                                height={pvListHeight}
                            />}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default React.memo(UserNotification);