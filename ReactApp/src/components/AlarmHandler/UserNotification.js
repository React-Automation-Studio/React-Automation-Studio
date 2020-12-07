import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import ScheduleDialog from './ScheduleDialog';
import DeleteDialog from './DeleteDialog';
import AddDialog from './AddDialog';
import UserTable from './UserTable';
import PVList from './PVList';
import useMongoDbWatch from '../SystemComponents/database/MongoDB/useMongoDbWatch';
import useMongoDbUpdateOne from '../SystemComponents/database/MongoDB/useMongoDbUpdateOne';
import useMongoDbInsertOne from '../SystemComponents/database/MongoDB/useMongoDbInsertOne';
import useMongoDbDeleteOne from '../SystemComponents/database/MongoDB/useMongoDbDeleteOne';

import { AccountRemove } from "mdi-material-ui/";
import { format, parseISO } from 'date-fns';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        width: "100%",
        margin: 0
    },
    button: {
        margin: theme.spacing(1),
    },
    expansionPanelSummaryContent: {
        paddingTop: 0,
        paddingBottom: 0,
        '&$expanded': {
            margin: 0,
        },
    },
    expanded: {},
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.common.white, 0.15) : fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.common.white, 0.25) : fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
    verticalMiddle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    tooltipWidth: {
        maxWidth: 200,
    }
}))

const UserNotification = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    const context = useContext(AutomationStudioContext)
    const username = context.userData.username

    const isLoggedIn = context.userData.username !== undefined
    const isAlarmAdmin = isLoggedIn
        ? context.userData.roles.includes("alarmAdmin")
        : false

    // to connect to all PVs before updating state
    const firstAlarmPVDict = {}

    const [alarmList, setAlarmList] = useState([])
    const [userList, setUserList] = useState([])
    const [userEdit, setUserEdit] = useState({})
    const [userTableExpand, setUserTableExpand] = useState(true)
    const [pvListExpand, setPvListExpand] = useState(true)
    const [userTableIsExpanded, setUserTableIsExpanded] = useState(true)
    const [pvListIsExpanded, setPvListIsExpanded] = useState(true)
    const [filterUser, setFilterUser] = useState({})
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
    const [dialogUserNotifyIndex, setDialogUserNotifyIndex] = useState(0)
    const [snackMessage, setSnackMessage] = useState("")

    const [userTableSearchString, setUserTableSearchString] = useState('')
    const [userTableSearchStringStore, setUserTableSearchStringStore] = useState('')
    const [userTableSearchTimer, setUserTableSearchTimer] = useState(null)
    const [searchedUsers, setSearchedUsers] = useState([])

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const [newName, setNewName] = useState("")
    const [newUsername, setNewUsername] = useState("")

    const dbPVData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs:Parameters:{}` }).data
    const dbUsersData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users:Parameters:{}` }).data
    const dbConfigData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:config:Parameters:{}` }).data

    const dbUpdateOne = useMongoDbUpdateOne({})
    const dbInsertOne = useMongoDbInsertOne({})
    const dbDeleteOne = useMongoDbDeleteOne({})


    const loadPVListRef = useRef(loadPVList);
    loadPVListRef.current = loadPVList;

    const userScheduleString = useCallback((userObject) => {
        let sumString
        if (userObject.isGlobal) {
            sumString = "Global - Do not notify me"
        }
        else {
            sumString = "Do not notify me"
        }
        if (userObject.notify) {
            if (userObject.isGlobal) {
                sumString = "Global - Notify me on "
            }
            else {
                sumString = "Notify me on "
            }
            if (userObject.email && userObject.sms && userObject.whatsapp) {
                sumString = sumString.concat("email, SMS and WhatsApp ")
            }
            else if (userObject.email && userObject.sms) {
                sumString = sumString.concat("email and SMS ")
            }
            else if (userObject.email && userObject.whatsapp) {
                sumString = sumString.concat("email and WhatsApp ")
            }
            else if (userObject.email) {
                sumString = sumString.concat("email ")
            }
            else if (userObject.sms && userObject.whatsapp) {
                sumString = sumString.concat("SMS and WhatsApp ")
            }
            else if (userObject.sms) {
                sumString = sumString.concat("SMS ")
            }
            else if (userObject.whatsapp) {
                sumString = sumString.concat("WhatsApp ")
            }
            if (userObject.allDay) {
                sumString = sumString.concat("all day ")
            }
            else {
                const fromTime = format(parseISO(userObject.fromTime), 'HH:mm')
                const toTime = format(parseISO(userObject.toTime), 'HH:mm')
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
                else if (days.length === 1) {
                    sumString = sumString.concat(`on a ${days}`)
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
                const fromDate = format(parseISO(userObject.fromDate), 'dd MMM yyyy')
                const toDate = format(parseISO(userObject.toDate), 'dd MMM yyyy')
                sumString = sumString.concat(`from ${fromDate} to ${toDate}`)
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
        setFilterUser({
            name: name,
            username: username
        })
        const newFilterUserRegex = Object.values(dictUserRegex[`${username}-${name}`]).map(entry =>
            entry.regEx
        )
        setFilterUserRegex(newFilterUserRegex)
    }, [dictUserRegex])

    const handleSetFilterUserRegex = useCallback((event, expression, index) => {
        event.preventDefault()
        event.stopPropagation()
        setFilterUserRegex([expression])
        setFilterUser({})
        setDialogUserNotifyIndex(index)
    }, [])

    const handleSetUserEdit = useCallback((event, name, username, value) => {
        event.preventDefault()
        event.stopPropagation()

        const match = userList.filter(el => el.name === name && el.username === username)[0]
        const newFilterUserRegex = Object.values(match.notifyPVs).map(entry =>
            entry.regEx
        )
        setFilterUserRegex(newFilterUserRegex)
        setFilterUser({
            name: match.name,
            username: match.username
        })

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
        const userIndex = userList.indexOf(match)

        // Reset userList to backup to guarantee 
        // new values propogate from dbwatch
        const newUserList = [...userList]
        newUserList[userIndex] = backupUserList[`${username}-${name}`]
        setUserList(newUserList)

        const id = match['_id']['$oid']

        const newFilterUserRegex = Object.values(match.notifyPVs).map(entry =>
            entry.regEx
        )
        setFilterUserRegex(newFilterUserRegex)

        let newvalues = { '$set': { "email": match.email } }

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
            id: id,
            update: newvalues
        })

        newvalues = { '$set': { "mobile": match.mobile } }

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

        const newFilterUserRegex = Object.values(backupUserList[`${username}-${name}`].notifyPVs).map(entry =>
            entry.regEx
        )
        setFilterUserRegex(newFilterUserRegex)

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

    const updateUserMobile = useCallback((event, name, username) => {
        // Find match and note it's index in userList
        const match = userList.filter(el => el.name === name && el.username === username)[0]
        const userIndex = userList.indexOf(match)

        match.mobile = event.target.value

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
            const newNotifyPVs = [...match.notifyPVs, {
                "regEx": expression,
                "notifySetup": {
                    "notify": true,
                    "email": true,
                    "sms": false,
                    "whatsapp": false,
                    "allDay": true,
                    "fromTime": "",
                    "toTime": "",
                    "weekly": true,
                    "days": {
                        "Monday": true,
                        "Tuesday": true,
                        "Wednesday": true,
                        "Thursday": true,
                        "Friday": true,
                        "Saturday": true,
                        "Sunday": true
                    },
                    "dateRange": false,
                    "fromDate": "",
                    "toDate": ""
                }
            }]
            match.notifyPVs = newNotifyPVs

            // Create new userList
            const newUserList = [...userList]
            newUserList[userIndex] = match

            setUserList(newUserList)

            const newFilterUserRegex = Object.values(newNotifyPVs).map(entry =>
                entry.regEx
            )
            setFilterUserRegex(newFilterUserRegex)
        }
    }, [userList, addRegexVal])

    const deleteChip = useCallback((event, name, username, expression) => {
        event.preventDefault()
        event.stopPropagation()

        // Find match and note it's index in userList
        const match = userList.filter(el => el.name === name && el.username === username)[0]
        const userIndex = userList.indexOf(match)

        // Remove regEx not required
        const newNotifyPVs = match.notifyPVs.filter(el => el.regEx !== expression)

        // Create new match with updated notifyPVs
        const newMatch = {
            ...match,
            notifyPVs: newNotifyPVs
        }

        // Create new userList
        const newUserList = [...userList]
        newUserList[userIndex] = newMatch

        setUserList(newUserList)

        const newFilterUserRegex = Object.values(newNotifyPVs).map(entry =>
            entry.regEx
        )
        setFilterUserRegex(newFilterUserRegex)
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
        event.preventDefault()
        event.stopPropagation()

        const match = userList.filter(el => el.name === name && el.username === username)[0]

        setDialogUserObject(match)
        setDialogOpen(true)
    }, [userList])

    const handleAcceptDialog = useCallback((name, username) => {
        // Find match and note it's index in userList
        const match = userList.filter(el => el.name === name && el.username === username)[0]
        const id = match['_id']['$oid']

        // console.log(dialogUserObject)

        let newvalues = { '$set': { "global": dialogUserObject.global } }

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
            id: id,
            update: newvalues
        })

        newvalues = { '$set': { "globalSetup": dialogUserObject.globalSetup } }

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
            id: id,
            update: newvalues
        })

        newvalues = { '$set': { "notifyPVs": dialogUserObject.notifyPVs } }

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
            id: id,
            update: newvalues
        })

        setDialogOpen(false)
        setDialogUserNotifyIndex(0)
    }, [dbUpdateOne, userList, props.dbName, dialogUserObject])

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false)
        setDialogUserNotifyIndex(0)
    }, [])

    const handleDeleteUser = useCallback(() => {
        // Find match and note it's index in userList
        const match = userList.filter(el => el.name === filterUser.name && el.username === filterUser.username)[0]
        const id = match['_id']['$oid']
        dbDeleteOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
            id: id,
        })
        setFilterUser({})
        setDeleteDialogOpen(false)
    }, [filterUser.name, filterUser.username, userList, dbDeleteOne, props.dbName])

    const handleSnackClose = () => {
        setSnackMessage("")
    }

    const handleSearchUserTable = (event) => {
        const srch = event.target.value
        if (userTableSearchTimer) {
            clearTimeout(userTableSearchTimer)
        }
        setUserTableSearchStringStore(srch)
        setUserTableSearchTimer(setTimeout(() => {
            setUserTableSearchString(srch)
            setFilterUserRegex([])
            setFilterUser({})
        }, 300))
    }

    const handleAddNewUser = () => {
        const newEntry = {
            "name": newName,
            "username": newUsername,
            "email": "",
            "mobile": "",
            "global": true,
            "globalSetup": {
                "notify": true,
                "email": true,
                "sms": false,
                "whatsapp": false,
                "allDay": true,
                "fromTime": "",
                "toTime": "",
                "weekly": true,
                "days": {
                    "Monday": true,
                    "Tuesday": true,
                    "Wednesday": true,
                    "Thursday": true,
                    "Friday": true,
                    "Saturday": true,
                    "Sunday": true
                },
                "dateRange": false,
                "fromDate": "",
                "toDate": ""
            },
            "notifyPVs": []
        }
        dbInsertOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
            newEntry: newEntry
        })
        setNewName('')
        setNewUsername('')
        setAddDialogOpen(false)
    }

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

            dbUsersData.map((user, index) => {
                localDictUserRegex[`${user.username}-${user.name}`] = user.notifyPVs
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
            setBackupUserList(localBackupUserList)
            // Sort users alphabetically by name field
            dbUsersData.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            //
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

    useEffect(() => {
        const filteredUsers = userList.reduce((acc, entry) => {
            const visible = entry["name"].toLowerCase().includes(userTableSearchString.toLowerCase())
            if (visible) {
                acc.push(entry)
            }
            return acc
        }, [])
        setSearchedUsers(filteredUsers)
    }, [userList, userTableSearchString])

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
            : filterUser.name

    let userTableHeight = '40vh'
    let pvListHeight = '32vh'
    if (userTableExpand && !pvListExpand && !pvListIsExpanded) {
        userTableHeight = '76vh'
    }
    else if (!userTableExpand && pvListExpand && !userTableIsExpanded) {
        pvListHeight = '76vh'
    }

    const warnAdminMessageAdd = "Only alarmAdmin role users can add users"
    const warnAdminMessageDelete = "Only alarmAdmin role users can delete users"
    const warnAdminMessageSelect = "Select a user to delete first"

    // console.table(showDeleteButton)

    return (
        <React.Fragment>
            {alarmPVs}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackMessage !== ""}
                autoHideDuration={5000}
                onClose={handleSnackClose}
                message={snackMessage}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <DeleteDialog
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
                user={filterUser.name}
                handleDelete={handleDeleteUser}
            />
            <AddDialog
                open={addDialogOpen}
                handleClose={() => {
                    setNewName('')
                    setNewUsername('')
                    setAddDialogOpen(false)
                }}
                name={newName}
                username={newUsername}
                setNewName={(event) => setNewName(event.target.value)}
                setNewUsername={(event) => setNewUsername(event.target.value)}
                handleAddNewUser={handleAddNewUser}
            />
            {
                Object.entries(dialogUserObject).length !== 0
                    ? <ScheduleDialog
                        dialogOpen={dialogOpen}
                        acceptDialog={handleAcceptDialog}
                        closeDialog={handleCloseDialog}
                        dialogUserObject={dialogUserObject}
                        setDialogUserObject={setDialogUserObject}
                        dialogUserNotifyIndex={dialogUserNotifyIndex}
                        setDialogUserNotifyIndex={setDialogUserNotifyIndex}
                        userScheduleString={userScheduleString}
                        setSnackMessage={setSnackMessage}
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
                    <Accordion
                        elevation={theme.palette.paperElevation}
                        expanded={userTableExpand}
                        onClick={() => handleExpandPanel('userTable')}
                        TransitionProps={{
                            onEntered: () => handleExpansionComplete('userTable', true),
                            onExited: () => handleExpansionComplete('userTable', false)
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            classes={{ content: classes.expansionPanelSummaryContent, expanded: classes.expanded }}
                        >
                            <div style={{ display: 'flex', width: '100%' }}>
                                <div className={classes.verticalMiddle} style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>Alarm Handler Users</div>
                                {
                                    userTableExpand
                                        ? <Tooltip
                                            title={isAlarmAdmin ? "Add user" : warnAdminMessageAdd}
                                            placement="bottom"
                                            classes={{ tooltip: classes.tooltipWidth }}
                                        >
                                            <div
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                    isAlarmAdmin && setAddDialogOpen(true)
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    className={classes.button}
                                                    startIcon={<PersonAddIcon />}
                                                    style={{ marginRight: 20 }}
                                                    // onClick={(event) => {
                                                    //     event.preventDefault()
                                                    //     event.stopPropagation()
                                                    //     setAddDialogOpen(true)
                                                    // }}
                                                    disabled={!isAlarmAdmin}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </Tooltip>
                                        : null
                                }
                                {
                                    userTableExpand
                                        ? <Tooltip
                                            title={isAlarmAdmin ? filterUser.name ? "Delete user" : warnAdminMessageSelect : warnAdminMessageDelete}
                                            placement="bottom"
                                            classes={{ tooltip: classes.tooltipWidth }}
                                        >
                                            <div
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                    isAlarmAdmin && filterUser.name && setDeleteDialogOpen(true)
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    className={classes.button}
                                                    startIcon={<AccountRemove />}
                                                    style={{ marginRight: 20 }}
                                                    // onClick={(event) => {
                                                    //     event.preventDefault()
                                                    //     event.stopPropagation()
                                                    //     setDeleteDialogOpen(true)
                                                    // }}
                                                    disabled={!isAlarmAdmin || !filterUser.name}
                                                >
                                                    Delete
                                                 </Button>
                                            </div>
                                        </Tooltip>
                                        : null
                                }
                                <div className={classes.verticalMiddle} style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 1 }}>
                                    {
                                        userTableExpand
                                            ? <div className={classes.search}>
                                                <div className={classes.searchIcon}>
                                                    <SearchIcon />
                                                </div>
                                                <InputBase
                                                    placeholder="Search user table…"
                                                    classes={{
                                                        root: classes.inputRoot,
                                                        input: classes.inputInput,
                                                    }}
                                                    inputProps={{ 'aria-label': 'search' }}
                                                    onClick={event => event.stopPropagation()}
                                                    onFocus={event => event.stopPropagation()}
                                                    onChange={event => handleSearchUserTable(event)}
                                                    // onBlur={() => { setUserTableSearchStringStore(''); setUserTableSearchString('') }}
                                                    value={userTableSearchStringStore}
                                                />
                                            </div>
                                            : '[click to show]'
                                    }
                                </div>
                            </div>

                        </AccordionSummary>
                        <AccordionDetails>
                            <UserTable
                                regexError={regexError}
                                addRegexVal={addRegexVal}
                                userList={searchedUsers}
                                userEdit={userEdit}
                                username={username}
                                isAlarmAdmin={isAlarmAdmin}
                                filterUser={filterUser}
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
                                updateUserMobile={updateUserMobile}
                                openDialog={handleOpenDialog}
                                height={userTableHeight}
                                userScheduleString={userScheduleString}
                            />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion
                        elevation={theme.palette.paperElevation}
                        expanded={pvListExpand}
                        onClick={() => handleExpandPanel('pvList')}
                        TransitionProps={{
                            onEntered: () => handleExpansionComplete('pvList', true),
                            onExited: () => handleExpansionComplete('pvList', false)
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            classes={{ content: classes.expansionPanelSummaryContent, expanded: classes.expanded }}
                        >
                            <div style={{ display: 'flex', width: '100%' }}>
                                <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>{`Filtered PVs: ${filterName}`}</div>
                                <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 1 }}>
                                    {
                                        pvListExpand
                                            ? null
                                            : '[click to show]'
                                    }
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            {loadPVList && <PVList
                                alarmPVDict={alarmPVDict}
                                filterUserRegex={filterUserRegex}
                                height={pvListHeight}
                            />}
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </React.Fragment >
    );
};

export default React.memo(UserNotification);