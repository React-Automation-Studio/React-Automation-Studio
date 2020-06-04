import React, { useState, useEffect, useContext, useCallback } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';


import DataConnection from '../SystemComponents/DataConnection';
import PV from '../SystemComponents/PV';
import Layout from '../UI/Layout/ComposedLayouts/TraditionalLayout';
import Typography from '@material-ui/core/Typography';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AlarmList from './AlarmList';
import AlarmTable from './AlarmTable';
import AlarmLog from './AlarmLog';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import InputIcon from '@material-ui/icons/Input';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import PublicIcon from '@material-ui/icons/Public';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Styles
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        margin: 0,
        width: "100%"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 0,
        height: "100%",
        overflowX: "default",
        overflowY: "default",
    },
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

}));

const AlarmHandler = () => {

    // console.log("AlarmHandler rendered")

    const classes = useStyles()
    const theme = useTheme()

    const context = useContext(AutomationStudioContext)
    const socket = context.socket
    const username = context.userData.username

    // to connect to all PVs before updating state
    const firstAlarmPVDict = {}
    const firstAreaPVDict = {}

    const [enableAllAreas, setEnableAllAreas] = useState(true)
    const [enableAllAreasId, setEnableAllAreasId] = useState(null)
    const [globalContextOpen, setGlobalContextOpen] = useState(false)
    const [alarmLogSearchString, setAlarmLogSearchString] = useState('')
    const [alarmLogSearchStringStore, setAlarmLogSearchStringStore] = useState('')
    const [alarmLogSearchTimer, setAlarmLogSearchTimer] = useState(null)
    const [alarmTableSearchString, setAlarmTableSearchString] = useState('')
    const [alarmTableSearchStringStore, setAlarmTableSearchStringStore] = useState('')
    const [alarmTableSearchTimer, setAlarmTableSearchTimer] = useState(null)
    const [alarmLogSelectedKey, setAlarmLogSelectedKey] = useState('')
    const [alarmLogDict, setAlarmLogDict] = useState({})
    const [alarmLogDisplayArray, setAlarmLogDisplayArray] = useState([])
    const [dbHistoryURL, setDbHistoryURL] = useState('')
    const [dbPVsURL, setDbPVsURL] = useState('')
    const [dbConfigURL, setDbConfigURL] = useState('')
    const [dbGlobalURL, setDbGlobalURL] = useState('')
    const [alarmLogExpand, setAlarmLogExpand] = useState(true)
    const [alarmLogIsExpanded, setAlarmLogIsExpanded] = useState(true)
    const [alarmTableExpand, setAlarmTableExpand] = useState(true)
    const [alarmTableIsExpanded, setAlarmTableIsExpanded] = useState(true)
    const [alarmLogSelectedName, setAlarmLogSelectedName] = useState('')
    const [alarmDebug, setAlarmDebug] = useState(false)
    const [alarmAckField, setAlarmAckField] = useState([])
    const [alarmAckFieldTrig, setAlarmAckFieldTrig] = useState(0)
    const [alarmIOCPVPrefix, setAlarmIOCPVPrefix] = useState(null)
    const [alarmIOCPVSuffix, setAlarmIOCPVSuffix] = useState(null)
    const [alarmPVDict, setAlarmPVDict] = useState({})
    const [areaPVDict, setAreaPVDict] = useState({})
    const [alarmRowSelected, setAlarmRowSelected] = useState({})
    const [alarmContextOpen, setAlarmContextOpen] = useState({})
    const [areaAlarms, setAreaAlarms] = useState({})
    const [areaContextOpen, setAreaContextOpen] = useState({})
    const [areaEnabled, setAreaEnabled] = useState({})
    const [areaMongoId, setAreaMongoId] = useState({})
    const [areaNames, setAreaNames] = useState([])
    const [areaSelectedIndex, setAreaSelectedIndex] = useState('')
    const [areaSelectedName, setAreaSelectedName] = useState('')
    const [areaSubAreaOpen, setAreaSubAreaOpen] = useState({})
    const [areaSubAreaMongoId, setAreaSubAreaMongoId] = useState({})
    const [contextMouseX, setContextMouseX] = useState(null)
    const [contextMouseY, setContextMouseY] = useState(null)
    const [lastAlarm, setLastAlarm] = useState(null)
    const [loadAlarmTable, setLoadAlarmTable] = useState({
        alarmPV: false,
    })
    const [lastArea, setLastArea] = useState(null)
    const [loadAlarmList, setLoadAlarmList] = useState({
        areaPV: false,
    })
    const [dbWatchId, setDbWatchId] = useState(null)

    // componentDidMount
    useEffect(() => {
        // console.log('[AlarmHander] componentDidMount')
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

        colName = "history"
        const localDbHistoryURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName + ":Parameters:{}"
        setDbHistoryURL(localDbHistoryURL)

        socket.emit('databaseReadWatchAndBroadcast', { dbURL: localDbHistoryURL, 'clientAuthorisation': jwt }, handleDatabaseReadWatchAndBroadcastAck)
        socket.on('databaseWatchData:' + localDbHistoryURL, handleNewDbLogReadWatchBroadcast);

        colName = "config"
        const localDbConfigURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName + ":Parameters:{}"
        setDbConfigURL(localDbConfigURL)

        socket.emit('databaseBroadcastRead', { dbURL: localDbConfigURL, 'clientAuthorisation': jwt }, (data) => {
            if (data !== "OK") {
                console.log("ackdata", data);
            }
        });
        socket.on('databaseData:' + localDbConfigURL, handleDbConfig);

        colName = "glob"
        const localDbGlobalURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName + ":Parameters:{}"
        setDbGlobalURL(localDbGlobalURL)

        socket.emit('databaseBroadcastRead', { dbURL: localDbGlobalURL, 'clientAuthorisation': jwt }, (data) => {
            if (data !== "OK") {
                console.log("ackdata", data);
            }
        });
        socket.on('databaseData:' + localDbGlobalURL, handleDbGlobal);

        // componentWillUnmount
        return () => {
            let jwt = JSON.parse(localStorage.getItem('jwt'));
            if (jwt === null) {
                jwt = 'unauthenticated'
            }
            if (typeof (dbWatchId) !== 'undefined') {
                socket.emit('remove_dbWatch', { dbURL: dbHistoryURL, dbWatchId: dbWatchId, 'clientAuthorisation': jwt });
            }
            socket.removeListener('databaseWatchData:' + dbHistoryURL, handleNewDbLogReadWatchBroadcast);
            socket.removeListener('databaseData:' + dbPVsURL, handleNewDbPVsList);
            socket.removeListener('databaseData:' + dbConfigURL, handleDbConfig);
            socket.removeListener('databaseData:' + dbGlobalURL, handleDbGlobal);
        }
    }, [])

    // update alarm log display data
    useEffect(() => {
        let localAlarmLogDisplayArray = []

        // console.log(alarmLogSelectedKey)
        // console.log(alarmLogDict)

        const isPV = alarmLogSelectedKey.includes('*')
        const isSubArea = alarmLogSelectedKey.includes('=') && !isPV

        // Map alarmLogDict
        Object.keys(alarmLogDict).map(key => {
            // console.log(key)
            if (alarmLogSelectedKey === 'ALLAREAS') {
                localAlarmLogDisplayArray = localAlarmLogDisplayArray.concat(alarmLogDict[key])
            }
            else if (isPV) {
                if (key === alarmLogSelectedKey) {
                    localAlarmLogDisplayArray = localAlarmLogDisplayArray.concat(alarmLogDict[key])
                }
            }
            else if (isSubArea) {
                const areaKey = key.split('*')[0]
                if (areaKey === alarmLogSelectedKey) {
                    localAlarmLogDisplayArray = localAlarmLogDisplayArray.concat(alarmLogDict[key])
                }
            }
            else {
                let areaKey = key.split('*')[0]
                areaKey = areaKey.split('=')[0]
                if (areaKey === alarmLogSelectedKey) {
                    localAlarmLogDisplayArray = localAlarmLogDisplayArray.concat(alarmLogDict[key])
                }

            }
        })

        localAlarmLogDisplayArray = localAlarmLogDisplayArray.sort(function (a, b) {
            return b.timestamp - a.timestamp
        })

        setAlarmLogDisplayArray(localAlarmLogDisplayArray)

    }, [alarmLogDict, alarmLogSelectedKey])

    const handleDoNothing = () => {

    }

    const handleGlobalArea = () => {
        const localAreaSubAreaOpen = { ...areaSubAreaOpen }
        localAreaSubAreaOpen[areaSelectedIndex.split('=')[0]] = false   // set previous area to false

        setAreaSelectedIndex('ALLAREAS')
        setAlarmLogSelectedKey('ALLAREAS')
        setAreaSelectedName('ALL AREAS')
        setAlarmLogSelectedName('ALL AREAS')
        setAreaSubAreaOpen(localAreaSubAreaOpen)

        // handleUpdateLogDisplayData('ALLAREAS')
    }

    const handleAckGlobal = () => {
        const localAlarmAckField = ['ALLAREAS', true]
        setAlarmAckField(localAlarmAckField)
        setAlarmAckFieldTrig(alarmAckFieldTrig + 1)
        setGlobalContextOpen(false)
    }

    const handleDisableEnableGlobal = (value) => {
        // console.log(value)
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }

        const ALARM_DATABASE = "ALARM_DATABASE"
        const dbName = "demoAlarmDatabase"
        const colName = "glob"
        const dbURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName

        const id = enableAllAreasId
        const newvalues = { '$set': { ["enableAllAreas"]: value } }

        // console.log(newvalues)

        socket.emit('databaseUpdateOne', { dbURL: dbURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
            //  console.log("ackdata", data);
            if (data == "OK") {
                socket.emit('databaseBroadcastRead', { dbURL: dbURL + ':Parameters:{}', 'clientAuthorisation': jwt }, (data) => {
                    if (data !== "OK") {
                        console.log("ackdata", data);
                    }
                })
            } else {
                console.log("Global var update unsuccessful")
            }
        })

        setGlobalContextOpen(false)
    }

    const handleIconClick = (event) => {
        // console.log("right click")
        event.preventDefault();

        setGlobalContextOpen(true)
        setContextMouseX(event.clientX - 2)
        setContextMouseY(event.clientY - 2)

    }

    const handleAlarmGlobalContextClose = () => {
        setGlobalContextOpen(false)
    }

    const handleSearchAlarmTable = (event) => {
        const srch = event.target.value
        if (alarmTableSearchTimer) {
            clearTimeout(alarmTableSearchTimer)
        }
        setAlarmTableSearchStringStore(srch)
        setAlarmTableSearchTimer(setTimeout(() => {
            setAlarmTableSearchString(srch)
        }, 300))
    }

    const handleSearchAlarmLog = (event) => {
        const srch = event.target.value
        if (alarmLogSearchTimer) {
            clearTimeout(alarmLogSearchTimer)
        }
        setAlarmLogSearchStringStore(srch)
        setAlarmLogSearchTimer(setTimeout(() => {
            setAlarmLogSearchString(srch)
        }, 300))
    }

    const handleExpansionComplete = (panelName, isExpanded) => {
        if (panelName === 'alarmTable') {
            setAlarmTableIsExpanded(isExpanded)
        }
        else if (panelName === 'alarmLog') {
            setAlarmLogIsExpanded(isExpanded)
        }
    }

    const handleExpandPanel = (panelName) => {
        if (panelName === 'alarmTable') {
            setAlarmTableExpand(alarmTableExpand ? false : true)
        }
        else if (panelName === 'alarmLog') {
            setAlarmLogExpand(alarmLogExpand ? false : true)
        }
    }

    const handleAlarmTesting = (event) => {
        setAlarmDebug(!alarmDebug)
    }

    const handleSimplePrint = (value, pvname) => {
        // console.log(pvname, value)
    }

    const handleAreaPVChange = (value, pvname) => {
        let areaName = pvname.replace("pva://", "")
        areaName = areaName.replace(alarmIOCPVPrefix, "")

        // console.log(pvname)

        // console.log(areaName)

        // still connecting to pvs
        if (!loadAlarmList.areaPV) {
            firstAreaPVDict[areaName] = value
            if (lastArea === areaName) {
                const localLoadAlarmList = { ...loadAlarmList }
                localLoadAlarmList.areaPV = true
                setLoadAlarmList(localLoadAlarmList)
                setAreaPVDict(firstAreaPVDict)
                // console.log(firstAreaPVDict)
            }
        }
        // all pvs connected
        else {
            const localAreaPVDict = { ...areaPVDict }
            localAreaPVDict[areaName] = value
            setAreaPVDict(localAreaPVDict)
        }
    }

    const handleAlarmPVChange = (value, pvname) => {
        // console.log(pvname)
        let epicsPVName = pvname.replace("pva://", "")
        epicsPVName = epicsPVName.replace(alarmIOCPVPrefix, "")
        epicsPVName = epicsPVName.replace(alarmIOCPVSuffix, "")

        // console.log(epicsPVName, value)

        // still connecting to pvs
        if (!loadAlarmTable.alarmPV) {
            firstAlarmPVDict[epicsPVName] = value
            if (lastAlarm === epicsPVName) {
                const localLoadAlarmTable = { ...loadAlarmTable }
                localLoadAlarmTable.alarmPV = true
                setLoadAlarmTable(localLoadAlarmTable)
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

    const handleAckAllAreaAlarms = useCallback((event, index) => {
        // console.log('Ack all alarms for', index)

        let localAlarmAckField = null
        if (index.includes("=")) {
            localAlarmAckField = ['1', index.split("=")[0], index.split("=")[1], null, username, 'True']
        }
        else {
            localAlarmAckField = ['0', index, null, null, username, 'True']
        }

        handleListItemContextClose(event, index)

        setAlarmAckField(localAlarmAckField)
        setAlarmAckFieldTrig(alarmAckFieldTrig + 1)
    }, [alarmAckFieldTrig])

    const handleTableItemCheck = useCallback((event, index, alarm, field, value) => {
        // to prevent re render of alarm log table?
        event.preventDefault()
        event.stopPropagation()

        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }

        const ALARM_DATABASE = "ALARM_DATABASE"
        const dbName = "demoAlarmDatabase"
        const colName = "pvs"
        const dbURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName

        const id = areaMongoId[index]
        let newvalues = null

        // Check if it is a subArea
        // console.log(index)
        if (index.includes("=")) {
            const subAreaId = areaSubAreaMongoId[index] + ".pvs." + alarm + "." + field
            newvalues = { '$set': { [subAreaId]: value } }
        }
        else {
            const subAreaId = "pvs." + alarm + "." + field
            newvalues = { '$set': { [subAreaId]: value } }
        }

        // console.log(newvalues)

        socket.emit('databaseUpdateOne', { dbURL: dbURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
            //  console.log("ackdata", data);
            if (data == "OK") {
                socket.emit('databaseBroadcastRead', { dbURL: dbURL + ':Parameters:{}', 'clientAuthorisation': jwt }, (data) => {
                    if (data !== "OK") {
                        console.log("ackdata", data);
                    }
                })
            } else {
                console.log("TableItemCheck unsuccessful")
            }
        })

    }, [areaMongoId, areaSubAreaMongoId])

    const handleTableRowClick = useCallback((event, alarmName) => {
        event.preventDefault()
        event.stopPropagation()
        setAlarmLogSelectedName(alarmName.replace(/[=*]/g, " > "))
        setAlarmLogSelectedKey(alarmName)
        // handleUpdateLogDisplayData(alarmName)
    }, [])

    const handleTableItemRightClick = useCallback((event, index) => {
        event.preventDefault();
        const areaAlarmNameArray = index.split('=')
        let areaName = null
        if (areaAlarmNameArray.length > 2) {
            areaName = areaAlarmNameArray[0] + "=" + areaAlarmNameArray[1]
        }
        else {
            areaName = areaAlarmNameArray[0]
        }
        if (areaEnabled[areaName] && areaAlarms[index]["enable"]) {
            const localAlarmContextOpen = { ...alarmContextOpen }
            localAlarmContextOpen[index] = true

            const localAlarmRowSelected = { ...alarmRowSelected }
            localAlarmRowSelected[index] = true

            const localContextMouseX = event.clientX - 2
            const localContextMouseY = event.clientY - 2

            setAlarmContextOpen(localAlarmContextOpen)
            setAlarmRowSelected(localAlarmRowSelected)
            setContextMouseX(localContextMouseX)
            setContextMouseY(localContextMouseY)

        }
    }, [areaEnabled, areaAlarms, alarmContextOpen, alarmRowSelected])

    const handleAlarmContextClose = useCallback((event, index) => {
        const localAlarmContextOpen = { ...alarmContextOpen }
        localAlarmContextOpen[index] = false

        const localAlarmRowSelected = { ...alarmRowSelected }
        localAlarmRowSelected[index] = false

        setAlarmRowSelected(localAlarmRowSelected)
        setAlarmContextOpen(localAlarmContextOpen)
    }, [alarmContextOpen, alarmRowSelected])

    const handleAlarmAcknowledge = useCallback((event, index) => {
        // console.log("Ack alarm:", index)
        event.preventDefault()
        event.stopPropagation()

        const equalsLength = index.match(/=/g).length
        let localAlarmAckField = null
        if (equalsLength === 2) {
            localAlarmAckField = ['3', index.split("=")[0], index.split("=")[1], index.split("=")[2], username, 'True']
        }
        else {
            localAlarmAckField = ['2', index.split("=")[0], null, index.split("=")[1], username, 'True']
        }

        // console.log(alarmAckField)

        handleAlarmContextClose(event, index)

        setAlarmAckField(localAlarmAckField)
        setAlarmAckFieldTrig(alarmAckFieldTrig + 1)
    }, [alarmAckFieldTrig])

    const handleEnableDisableArea = useCallback((event, index, value) => {
        // console.log('Enable/Disable area', index)

        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }

        const ALARM_DATABASE = "ALARM_DATABASE"
        const dbName = "demoAlarmDatabase"
        const colName = "pvs"
        const dbURL = "mongodb://" + ALARM_DATABASE + ":" + dbName + ":" + colName

        const id = areaMongoId[index]
        let newvalues = null

        // Check if it is a subArea
        // console.log(index)
        if (index.includes("=")) {
            const subAreaId = areaSubAreaMongoId[index] + ".enable"
            newvalues = { '$set': { [subAreaId]: value } }
        }
        else {
            newvalues = { '$set': { "enable": value } }
        }

        // console.log(newvalues)


        socket.emit('databaseUpdateOne', { dbURL: dbURL, 'id': id, 'newvalues': newvalues, 'clientAuthorisation': jwt }, (data) => {
            // console.log("ackdata", data);
            if (data == "OK") {
                socket.emit('databaseBroadcastRead', { dbURL: dbURL + ':Parameters:{}', 'clientAuthorisation': jwt }, (data) => {
                    if (data !== "OK") {
                        console.log("ackdata", data);
                    }
                })
            } else {
                console.log("Enable/Disable area unsuccessful")
            }
        })

        handleListItemContextClose(event, index)

    }, [areaMongoId, areaSubAreaMongoId])

    const handleListItemContextClose = useCallback((event, index) => {
        // console.log("close context")
        const localAreaContextOpen = { ...areaContextOpen }
        localAreaContextOpen[index] = false
        setAreaContextOpen(localAreaContextOpen)
    }, [areaContextOpen])

    const handleListItemRightClick = useCallback((event, index) => {
        // console.log("right click")
        event.preventDefault();

        const localAreaContextOpen = { ...areaContextOpen }
        localAreaContextOpen[index] = true

        setAreaContextOpen(localAreaContextOpen)
        setContextMouseX(event.clientX - 2)
        setContextMouseY(event.clientY - 2)
    }, [areaContextOpen])

    const handleListItemClick = useCallback((event, index) => {
        const localAreaSubAreaOpen = { ...areaSubAreaOpen }

        let localAreaSelectedName = index.split('=')

        if (localAreaSelectedName.length > 1) {                  // selected area is a subArea
            localAreaSelectedName = localAreaSelectedName[0] + " > " + localAreaSelectedName[1]
        }
        else {                                              // selected area is an area
            if (index === areaSelectedIndex) {   // selected same area twice
                localAreaSubAreaOpen[index] = !areaSubAreaOpen[index]
            }
            else {                                           // selected a different area
                localAreaSubAreaOpen[areaSelectedIndex.split('=')[0]] = false   // set previous area to false
                localAreaSubAreaOpen[index] = true                           // set current area to true
            }
        }


        setAreaSelectedIndex(index)
        setAreaSelectedName(localAreaSelectedName)
        setAlarmLogSelectedName(localAreaSelectedName)
        setAreaSubAreaOpen(localAreaSubAreaOpen)
        setAlarmLogSelectedKey(index)

        // console.log(index)
        // handleUpdateLogDisplayData(index)
    }, [areaSelectedIndex, areaSubAreaOpen]);

    const handleNewDbPVsList = (msg) => {
        // console.log('handleNewDbPVsList')
        const data = JSON.parse(msg.data);
        // console.log(data)
        const areaNames = []
        if (isEmpty(alarmRowSelected)) {
            // console.log('Only once OR for local UI vars')
            let localLastAlarm = ""
            // const areaContextOpen = {}
            // const alarmContextOpen = {}
            // const alarmRowSelected = {}
            // const areaMongoId = {}
            // const areaSubAreaMongoId = {}

            data.map((area, index) => {
                areaContextOpen[area["area"]] = false
                // if (index === 0) {
                //     // Open first area on start up or refresh page
                //     areaSubAreaOpen[area["area"]] = true
                // }
                // else {
                areaSubAreaOpen[area["area"]] = false
                // }
                areaMongoId[area["area"]] = area["_id"]["$oid"]
                // Map alarms in area
                Object.keys(area["pvs"]).map(alarmKey => {
                    alarmContextOpen[`${area["area"]}=${alarmKey}`] = false
                    alarmRowSelected[`${area["area"]}=${alarmKey}`] = false
                    localLastAlarm = area["pvs"][alarmKey]["name"]
                })
                Object.keys(area).map(areaKey => {
                    if (areaKey === "area") {
                        areaNames.push({ "area": area[areaKey] })
                    }
                    else if (areaKey.includes("subArea")) {
                        areaContextOpen[`${area["area"]}=${area[areaKey]["name"]}`] = false
                        areaSubAreaMongoId[`${area["area"]}=${area[areaKey]["name"]}`] = areaKey
                        areaMongoId[`${area["area"]}=${area[areaKey]["name"]}`] = area["_id"]["$oid"]
                        // Map alarms in subarea
                        Object.keys(area[areaKey]["pvs"]).map(alarmKey => {
                            alarmContextOpen[`${area["area"]}=${area[areaKey]["name"]}=${alarmKey}`] = false
                            alarmRowSelected[`${area["area"]}=${area[areaKey]["name"]}=${alarmKey}`] = false
                            localLastAlarm = area[areaKey]["pvs"][alarmKey]["name"]
                        })
                        if (areaNames[index]["subAreas"]) {
                            areaNames[index]["subAreas"].push(area[areaKey]["name"])
                        }
                        else {
                            // console.log(areaNames[index])
                            areaNames[index]["subAreas"] = [area[areaKey]["name"]]
                        }
                    }
                })
            })
            if (!areaSelectedIndex) {
                setAreaSubAreaOpen(areaSubAreaOpen)
                setAreaSelectedIndex('ALLAREAS')
                setAreaSelectedName('ALL AREAS')
                setAlarmLogSelectedName('ALL AREAS')
                setAlarmLogSelectedKey('ALLAREAS')
            }
            // console.log(lastAlarm)
            setLastAlarm(localLastAlarm)
            setAlarmRowSelected(alarmRowSelected)
            setAlarmContextOpen(alarmContextOpen)
            setAreaMongoId(areaMongoId)
            setAreaSubAreaMongoId(areaSubAreaMongoId)
            setAreaNames(areaNames)
            setAreaContextOpen(areaContextOpen)
        }

        const localAreaAlarms = {}
        const localAreaEnabled = {}
        let localLastArea = ""

        data.map((area, index) => {
            // map all alarms in area
            Object.keys(area).map(areaKey => {
                if (areaKey === "pvs") {
                    Object.keys(area[areaKey]).map(alarm => {
                        localAreaAlarms[`${area["area"]}=${alarm}`] = area[areaKey][alarm]
                    })
                }
            })
            localAreaEnabled[area["area"]] = area["enable"]
            localLastArea = area["area"]
            Object.keys(area).map(areaKey => {
                if (areaKey.includes("subArea")) {
                    // Area enabled for subArea includes parent area
                    localAreaEnabled[`${area["area"]}=${area[areaKey]["name"]}`] = area[areaKey]["enable"] && localAreaEnabled[area["area"]]
                    localLastArea = `${area["area"]}=${area[areaKey]["name"]}`
                    // map all alarms in subArea
                    Object.keys(area[areaKey]).map(subAreaKey => {
                        if (subAreaKey === "pvs") {
                            Object.keys(area[areaKey][subAreaKey]).map(alarm => {
                                localAreaAlarms[`${area["area"]}=${area[areaKey]["name"]}=${alarm}`] = area[areaKey][subAreaKey][alarm]
                            })
                        }
                    })
                }
            })
        })

        // console.log(lastArea)
        setAreaAlarms(localAreaAlarms)
        setAreaEnabled(localAreaEnabled)
        setLastArea(localLastArea)

        let displayAlarmTable = true
        for (const [key, value] of Object.entries(loadAlarmTable)) {
            // console.log(key, value)
            displayAlarmTable = displayAlarmTable && value
        }
        if (!displayAlarmTable) {
            autoLoadAlarmTable()
        }

        let displayAlarmList = true
        for (const [key, value] of Object.entries(loadAlarmList)) {
            // console.log(key, value)
            displayAlarmList = displayAlarmList && value
        }
        if (!displayAlarmList) {
            autoLoadAlarmList()
        }
    }

    const handleDatabaseReadWatchAndBroadcastAck = (msg) => {
        // console.log(msg)
        if (typeof msg !== 'undefined') {
            setDbWatchId(msg.dbWatchId)
        }
    }

    const handleNewDbLogReadWatchBroadcast = (msg) => {
        const data = JSON.parse(msg.data);
        // console.log(data)
        const localAlarmLogDict = {}
        data.map((area, index) => {
            localAlarmLogDict[area["identifier"]] = area["history"]
        })
        // console.log("history watch")
        // console.log(localAlarmLogDict)
        setAlarmLogDict(localAlarmLogDict)
        // handleUpdateLogDisplayData()
    }

    const handleDbConfig = (msg) => {
        const data = JSON.parse(msg.data)[0];
        setAlarmIOCPVPrefix(data["alarmIOCPVPrefix"])
        setAlarmIOCPVSuffix(data['alarmIOCPVSuffix'])
    }

    const handleDbGlobal = (msg) => {
        // console.log(JSON.parse(msg.data)[0])
        // ["_id"]["$oid"]
        const data = JSON.parse(msg.data)[0];
        setEnableAllAreas(data["enableAllAreas"])
        setEnableAllAreasId(data["_id"]["$oid"])
    }

    const autoLoadAlarmTable = () => {
        const timer = setTimeout(() => {
            if (!loadAlarmTable) {
                console.log('Warning: Auto load alarm table')
            }
            const localLoadAlarmTable = { ...loadAlarmTable }
            for (const [key, value] of Object.entries(localLoadAlarmTable)) {
                localLoadAlarmTable[key] = true
            }
            setLoadAlarmTable(localLoadAlarmTable)
        }, 10000);
        return () => clearTimeout(timer);
    }

    const autoLoadAlarmList = () => {
        const timer = setTimeout(() => {
            if (!loadAlarmList) {
                console.log('Warning: Auto load alarm list')
            }
            const localLoadAlarmList = { ...loadAlarmList }
            for (const [key, value] of Object.entries(localLoadAlarmList)) {
                localLoadAlarmList[key] = true
            }
            setLoadAlarmList(localLoadAlarmList)
        }, 10000);
        return () => clearTimeout(timer);
    }

    const moreVertDrawerItems = (
        <React.Fragment>
            <ListItem button>
                <ListItemIcon >
                    <ContactPhoneIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={"Configure user notification"} />
            </ListItem>
            <ListItem button onClick={handleAlarmTesting}>
                <ListItemIcon >
                    {alarmDebug
                        ? <NotInterestedIcon fontSize="small" />
                        : <InputIcon fontSize="small" />
                    }
                </ListItemIcon>
                <ListItemText primary={alarmDebug ? "Disable alarm testing/debug" : "Enable alarm testing/debug"} />
            </ListItem>
        </React.Fragment>
    )


    let alarmPVs = null
    if (alarmIOCPVPrefix !== null && alarmIOCPVSuffix !== null) {
        alarmPVs = Object.keys(areaAlarms).map(alarmKey => (
            // <PV
            //     key={alarmKey}
            //     pv={'pva://' + alarmIOCPVPrefix + areaAlarms[alarmKey]["name"] + alarmIOCPVSuffix}
            // >
            //     {({ initialized, value }) => {
            //         if (initialized) {
            //             const epicsPVName = areaAlarms[alarmKey]["name"]
            //             console.log(epicsPVName, value)
            //             // // still connecting to pvs
            //             if (!loadAlarmTable.alarmPV) {
            //                 firstAlarmPVDict[epicsPVName] = value
            //                 if (lastAlarm === epicsPVName) {
            //                     console.log("here")
            //                     const localLoadAlarmTable = { ...loadAlarmTable }
            //                     localLoadAlarmTable.alarmPV = true
            //                     setLoadAlarmTable(localLoadAlarmTable)
            //                     setAlarmPVDict(firstAlarmPVDict)
            //                 }
            //             }
            //             // // all pvs connected
            //             else {
            //                 const localAlarmPVDict = { ...alarmPVDict }
            //                 localAlarmPVDict[epicsPVName] = value
            //                 setAlarmPVDict(localAlarmPVDict)
            //             }
            //         }
            //     }}
            // </PV>

            <DataConnection
                key={alarmKey}
                pv={'pva://' + alarmIOCPVPrefix + areaAlarms[alarmKey]["name"] + alarmIOCPVSuffix}
                handleInputValue={handleAlarmPVChange}
            />
        ))
    }

    let ackPV = null
    if (alarmIOCPVPrefix !== null) {
        ackPV = (
            <PV
                pv={'pva://' + alarmIOCPVPrefix + "ACK_PV"}
                outputValue={alarmAckField}
                debug={false}
                newValueTrigger={alarmAckFieldTrig}
            />
        )
    }

    let areaPVs = null
    if (alarmIOCPVPrefix !== null) {
        areaPVs = Object.keys(areaEnabled).map(areaName => (
            <DataConnection
                key={areaName}
                pv={'pva://' + alarmIOCPVPrefix + areaName}
                handleInputValue={handleAreaPVChange}
            />
        ))
    }

    let displayAlarmTable = true
    for (const [key, value] of Object.entries(loadAlarmTable)) {
        // console.log(key, value)
        displayAlarmTable = displayAlarmTable && value
    }

    let displayAlarmList = true
    for (const [key, value] of Object.entries(loadAlarmList)) {
        // console.log(key, value)
        displayAlarmList = displayAlarmList && value
    }

    let alarmTableHeight = '40vh'
    let alarmLogHeight = '29vh'
    if (alarmTableExpand && !alarmLogExpand && !alarmLogIsExpanded) {
        alarmTableHeight = '75vh'
    }
    else if (!alarmTableExpand && !alarmTableIsExpanded && alarmLogExpand) {
        alarmLogHeight = '75vh'
    }

    return (
        <Layout
            title="Demo Alarm Handler"
            alignTitle="center"
            titleVariant="h6"
            titleTextStyle={{ textTransform: 'uppercase' }}
            denseAppBar
            moreVertDrawerItems={moreVertDrawerItems}
            hideMoreVertDrawerAfterItemClick
        // hideToggleThemeListItem
        >
            {alarmPVs}
            {areaPVs}
            {ackPV}
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
                spacing={2}
                className={classes.root}
            >
                {displayAlarmList
                    ? <Grid item xs={2}>
                        <Paper className={classes.paper} elevation={theme.palette.paperElevation}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <IconButton
                                        aria-label="global_alarms"
                                        style={{ padding: 0 }}
                                        onClick={() => handleGlobalArea()}
                                        onContextMenu={(event) => handleIconClick(event)}
                                    >
                                        {areaSelectedIndex === 'ALLAREAS'
                                            ? <PublicIcon color="primary" />
                                            : <PublicIcon />}
                                    </IconButton>
                                    <Menu
                                        keepMounted
                                        open={globalContextOpen}
                                        onClose={() => handleAlarmGlobalContextClose()}
                                        anchorReference="anchorPosition"
                                        anchorPosition={contextMouseY !== null && contextMouseX !== null ?
                                            { top: contextMouseY, left: contextMouseX } : null}
                                    >
                                        <MenuItem disabled>GLOBAL</MenuItem>
                                        <hr />
                                        {enableAllAreas ?
                                            <MenuItem
                                                onClick={() => handleDisableEnableGlobal(false)}
                                            >
                                                <ListItemIcon >
                                                    <NotificationsOffIcon fontSize="small" />
                                                </ListItemIcon>
                                                <Typography variant="inherit">Disable ALL AREAS</Typography>
                                            </MenuItem> :
                                            <MenuItem
                                                onClick={() => handleDisableEnableGlobal(true)}
                                            >
                                                <ListItemIcon >
                                                    <NotificationsActiveIcon fontSize="small" />
                                                </ListItemIcon>
                                                <Typography variant="inherit">Enable ALL AREAS</Typography>
                                            </MenuItem>
                                        }
                                        <MenuItem
                                            onClick={handleAckGlobal}
                                        >
                                            <ListItemIcon >
                                                <DoneAllIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">ACK ALL AREAS' alarms</Typography>
                                        </MenuItem>

                                    </Menu>
                                </Grid>
                                <Grid item xs={10}>
                                    <div style={{ paddingTop: 0, fontSize: 16, fontWeight: 'bold' }}>{`ALARM AREAS ${enableAllAreas ? "" : "[DISABLED]"}`}</div>
                                </Grid>
                                <Grid item xs={12}>
                                    {areaNames ?
                                        <AlarmList
                                            enableAllAreas={enableAllAreas}
                                            areaPVDict={areaPVDict}
                                            areaContextOpen={areaContextOpen}
                                            areaEnabled={areaEnabled}
                                            areaNames={areaNames}
                                            areaSubAreaOpen={areaSubAreaOpen}
                                            areaSelectedIndex={areaSelectedIndex}
                                            contextMouseX={contextMouseX}
                                            contextMouseY={contextMouseY}
                                            ackAllAreaAlarms={handleAckAllAreaAlarms}
                                            enableDisableArea={handleEnableDisableArea}
                                            listItemClick={handleListItemClick}
                                            listItemRightClick={handleListItemRightClick}
                                            listItemContextClose={handleListItemContextClose}
                                        />
                                        : "No data from database"}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    : <Grid item xs={2}>
                        <Paper className={classes.paper} elevation={theme.palette.paperElevation}>
                            <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                                CONNECTING TO PVs...
                                    </div>
                        </Paper>
                    </Grid>}
                {displayAlarmTable ?
                    <Grid item xs={10} >
                        <ExpansionPanel
                            elevation={theme.palette.paperElevation}
                            expanded={alarmTableExpand}
                            onClick={() => handleExpandPanel('alarmTable')}
                            TransitionProps={{
                                onEntered: () => handleExpansionComplete('alarmTable', true),
                                onExited: () => handleExpansionComplete('alarmTable', false)
                            }}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>{`ALARM TABLE: ${areaSelectedName}`}</div>
                                    <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 1 }}>{
                                        alarmTableExpand
                                            ? <div className={classes.search}>
                                                <div className={classes.searchIcon}>
                                                    <SearchIcon />
                                                </div>
                                                <InputBase
                                                    placeholder="Search alarm table…"
                                                    classes={{
                                                        root: classes.inputRoot,
                                                        input: classes.inputInput,
                                                    }}
                                                    inputProps={{ 'aria-label': 'search' }}
                                                    onClick={event => event.stopPropagation()}
                                                    onFocus={event => event.stopPropagation()}
                                                    onChange={event => handleSearchAlarmTable(event)}
                                                    onBlur={() => { setAlarmTableSearchStringStore(''); setAlarmTableSearchString('') }}
                                                    value={alarmTableSearchStringStore}
                                                />
                                            </div>
                                            : '[click to show]'
                                    }</div>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {areaNames
                                    ? <AlarmTable
                                        enableAllAreas={enableAllAreas}
                                        debug={alarmDebug}
                                        alarmPVDict={alarmPVDict}
                                        alarmRowSelected={alarmRowSelected}
                                        alarmContextOpen={alarmContextOpen}
                                        areaSelectedIndex={areaSelectedIndex}
                                        areaAlarms={areaAlarms}
                                        contextMouseX={contextMouseX}
                                        contextMouseY={contextMouseY}
                                        areaEnabled={areaEnabled}
                                        height={alarmTableHeight}
                                        alarmTableSearchString={alarmTableSearchString}
                                        alarmAcknowledge={handleAlarmAcknowledge}
                                        alarmContextClose={handleAlarmContextClose}
                                        itemChecked={handleTableItemCheck}
                                        tableItemRightClick={handleTableItemRightClick}
                                        tableRowClick={handleTableRowClick}
                                    />
                                    : "No data from database"}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                            elevation={theme.palette.paperElevation}
                            expanded={alarmLogExpand}
                            onClick={() => handleExpandPanel('alarmLog')}
                            TransitionProps={{
                                onEntered: () => handleExpansionComplete('alarmLog', true),
                                onExited: () => handleExpansionComplete('alarmLog', false)
                            }}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>{`ALARM LOG: ${alarmLogSelectedName}`}</div>
                                    <div style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 1 }}>{
                                        alarmLogExpand
                                            ? <div className={classes.search}>
                                                <div className={classes.searchIcon}>
                                                    <SearchIcon />
                                                </div>
                                                <InputBase
                                                    placeholder="Search alarm log…"
                                                    classes={{
                                                        root: classes.inputRoot,
                                                        input: classes.inputInput,
                                                    }}
                                                    inputProps={{ 'aria-label': 'search' }}
                                                    onClick={event => event.stopPropagation()}
                                                    onFocus={event => event.stopPropagation()}
                                                    onChange={event => handleSearchAlarmLog(event)}
                                                    onBlur={() => { setAlarmLogSearchStringStore(''); setAlarmLogSearchString('') }}
                                                    value={alarmLogSearchStringStore}
                                                />
                                            </div>
                                            : '[click to show]'
                                    }
                                    </div>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <AlarmLog
                                    height={alarmLogHeight}
                                    alarmLogDisplayArray={alarmLogDisplayArray}
                                    alarmLogSelectedKey={alarmLogSelectedKey}
                                    alarmLogSearchString={alarmLogSearchString}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                    </Grid>
                    :
                    <Grid item xs={10} >
                        <Paper className={classes.paper} elevation={theme.palette.paperElevation}>
                            <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                                CONNECTING TO PVs...
                                    </div>
                        </Paper>
                    </Grid>
                }

            </Grid>
            {/* </div> */}
        </Layout>
    )
}


export default AlarmHandler
