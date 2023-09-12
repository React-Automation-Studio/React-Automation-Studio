import React, { useState, useEffect, useContext, useCallback, useMemo, useReducer } from 'react';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { alpha } from '@mui/material/styles';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';


import PV from '../SystemComponents/PV';
import useMongoDbWatch from '../SystemComponents/database/MongoDB/useMongoDbWatch';
import useMongoDbUpdateOne from '../SystemComponents/database/MongoDB/useMongoDbUpdateOne';
import useMongoDbInsertOne from '../SystemComponents/database/MongoDB/useMongoDbInsertOne';
import useMongoDbUpdateMany from '../SystemComponents/database/MongoDB/useMongoDbUpdateMany';
import useMongoDbDeleteOne from '../SystemComponents/database/MongoDB/useMongoDbDeleteOne';
import Typography from '@mui/material/Typography';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AlarmList from './AlarmList';
import AlarmTable from './AlarmTable';
import AlarmLog from './AlarmLog';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import Collapse from '@mui/material/Collapse';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import PublicIcon from '@mui/icons-material/Public';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TablePagination from '@mui/material/TablePagination';

import AddPVDialog from './AddPVDialog';
import EnableDialog from './EnableDialog';
import RenameDialog from './RenameDialog';
import AddAreaDialog from './AddAreaDialog';
import AddSubAreaDialog from './AddSubAreaDialog';
import DeleteAreaDialog from './DeleteAreaDialog';
import DeletePVDialog from './DeletePVDialog';

import { format, parseISO } from 'date-fns';

// Styles
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        margin: 0,
        width: "100%"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    PaginationRoot: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
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
        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.25) : alpha(theme.palette.common.black, 0.25),
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
    expansionPanelSummaryContent: {
        paddingTop: 0,
        paddingBottom: 0,
        '&$expanded': {
            margin: 0,
        },
    },
    expanded: {},
    nested: {
        paddingLeft: theme.spacing(4),
    },
    verticalMiddle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
}));

const TablePaginationActions = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = useCallback((event) => {
        onChangePage(event, 0)
    }, [onChangePage])

    const handleBackButtonClick = useCallback((event) => {
        onChangePage(event, page - 1)
    }, [onChangePage, page])

    const handleNextButtonClick = useCallback((event) => {
        onChangePage(event, page + 1)
    }, [onChangePage, page])

    const handleLastPageButtonClick = useCallback((event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }, [count, onChangePage, rowsPerPage])

    return (
        <div className={classes.PaginationRoot}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
                size="large">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
                size="large">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
                size="large">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
                size="large">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

const AlarmSetup = (props) => {
    const classes = useStyles()
    const theme = useTheme()

    const context = useContext(AutomationStudioContext)

    const username = useMemo(() => {
        return context.userData.username
    }, [context.userData.username])

    const roles = useMemo(() => {
        return context.userData.roles
    }, [context.userData.roles])

    const isAlarmAdmin = useMemo(() => {
        const isLoggedIn = username !== undefined
        return isLoggedIn
            ? roles.includes("alarmAdmin")
            : false
    }, [username, roles])

    const isAlarmUser = useMemo(() => {
        const isLoggedIn = username !== undefined
        const alarmUser = isLoggedIn
            ? roles.includes("alarmUser")
            : false
        return isAlarmAdmin || alarmUser
    }, [roles, username, isAlarmAdmin])


    const [enableAllAreas, setEnableAllAreas] = useState(true)
    const [globalDocId, setGlobalDocId] = useState(null)
    const [globalContextOpen, setGlobalContextOpen] = useState(false)
    const [alarmLogSearchString, setAlarmLogSearchString] = useState('')
    const [alarmLogSearchStringStore, setAlarmLogSearchStringStore] = useState('')
    const [alarmLogSearchTimer, setAlarmLogSearchTimer] = useState(null)
    const [alarmTableSearchString, setAlarmTableSearchString] = useState('')
    const [alarmTableSearchStringStore, setAlarmTableSearchStringStore] = useState('')
    const [alarmTableSearchTimer, setAlarmTableSearchTimer] = useState(null)
    const [alarmLogSelectedKey, setAlarmLogSelectedKey] = useState('')
    const [alarmLogExpand, setAlarmLogExpand] = useState(true)
    const [alarmLogIsExpanded, setAlarmLogIsExpanded] = useState(true)
    const [alarmTableExpand, setAlarmTableExpand] = useState(true)
    const [alarmTableIsExpanded, setAlarmTableIsExpanded] = useState(true)
    const [alarmLogSelectedName, setAlarmLogSelectedName] = useState('')
    const [alarmLogDisplayArray, setAlarmLogDisplayArray] = useState([])
    const [alarmDebug] = useState(false)
    const [alarmAckField, setAlarmAckField] = useState([])
    const [alarmAckFieldTrig, setAlarmAckFieldTrig] = useState(0)
    const [alarmIOCPVPrefix, setAlarmIOCPVPrefix] = useState(null)
    const [alarmIOCPVSuffix, setAlarmIOCPVSuffix] = useState(null)
    const [alarmRowSelected, setAlarmRowSelected] = useState({})
    const [alarmContextOpen, setAlarmContextOpen] = useState({})
    const [areaAlarms, setAreaAlarms] = useState([])
    const [filteredAreaAlarms, setFilteredAreaAlarms] = useState([])
    const [preSliceAreaAlarms, setPreSliceAreaAlarms] = useState([])
    const [areaContextOpen, setAreaContextOpen] = useState({})
    const [areaEnabled, setAreaEnabled] = useState({})
    const [areaBridged, setAreaBridged] = useState({})
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
    const [fadeTU] = useState(false)
    const [fadeList] = useState(false)
    const [page, setPage] = useState(0)
    const [lastPage, setLastPage] = useState(undefined)
    const [lastPageSkip, setLastPageSkip] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(25)
    const [pageAT, setPageAT] = useState(0)
    const [rowsPerPageAT, setRowsPerPageAT] = useState(25)

    const [lastPVKey, setLastPVKey] = useState({})
    const [newPVInfo, setNewPVInfo] = useState({})
    const [addPVDialogOpen, setAddPVDialogOpen] = useState(false)

    const [addPVDialogPvs, setAddPVDialogPvs] = useState([])
    const [ackPV, setAckPV] = useState()

    const [enableDialogOpen, setEnableDialogOpen] = useState(false)
    const [enableDialogData, setEnableDialogData] = useState({})

    const [renameDialogOpen, setRenameDialogOpen] = useState(false)
    const [renameDialogData, setRenameDialogData] = useState({})

    const [addAreaDialogOpen, setAddAreaDialogOpen] = useState(false)
    const [addAreaDialogData, setAddAreaDialogData] = useState({})

    const [addSubAreaDialogOpen, setAddSubAreaDialogOpen] = useState(false)
    const [addSubAreaData, setAddSubAreaData] = useState({})
    const [lastSubAreaKey, setLastSubAreaKey] = useState({})

    const [areaRoles, setAreaRoles] = useState({})

    const [deleteAreaDialogOpen, setDeleteAreaDialogOpen] = useState(false)
    const [deleteAreaDialogData, setDeleteAreaDialogData] = useState({})

    const [deletePVDialogOpen, setDeletePVDialogOpen] = useState(false)
    const [deletePVDialogData, setDeletePVDialogData] = useState({})

    const [backdropOpen, setBackDropOpen] = useState(false)
    const [restartCount, setRestartCount] = useState(undefined)
    const [firstStart, setFirstStart] = useState(true)
    const [ASRestartProgress, setASRestartProgress] = useState(0)

    const [clientAHDBVer] = useState(props.AHDBVer)
    const [serverAHDBVer, setServerAHDBVer] = useState(props.AHDBVer)

    const [alarmAdminListExpand, setAlarmAdminListExpand] = useState(false)
    const [alarmAdminGListExpand, setAlarmAdminGListExpand] = useState(false)
    const [alarmAdminPVExpand, setAlarmAdminPVExpand] = useState(false)

    const [dbPVData, setDbPVData] = useState({})

    const alarmPVDictReducer = useCallback((state, action) => {
        switch (action.type) {
            case 'updatePVData':
                if (action.pvData.initialized && (!loadAlarmTable.alarmPV || backdropOpen)) {
                    let epicsPVName = action.pvData.pvName.replace("pva://", "")
                    epicsPVName = epicsPVName.replace(alarmIOCPVPrefix, "")
                    epicsPVName = epicsPVName.replace(alarmIOCPVSuffix, "")
                    if (lastAlarm === epicsPVName) {
                        setLoadAlarmTable({
                            ...loadAlarmTable,
                            alarmPV: true
                        })
                    }
                    return {
                        ...state,
                        [epicsPVName]: action.pvData.value
                    }
                }
                else {
                    return state
                }
            default:
                throw new Error();
        }
    }, [alarmIOCPVPrefix, alarmIOCPVSuffix, lastAlarm, loadAlarmTable, backdropOpen])
    const [alarmPVDict, dispatchAlarmPVDict] = useReducer(alarmPVDictReducer, {})
    const [alarmPVs, setAlarmPVs] = useState([])

    const areaPVDictReducer = useCallback((state, action) => {
        switch (action.type) {
            case 'updatePVData':
                if (action.pvData.initialized) {
                    let areaName = action.pvData.pvName.replace("pva://", "")
                    areaName = areaName.replace(alarmIOCPVPrefix, "")
                    if (lastArea === areaName) {
                        setLoadAlarmList({
                            ...loadAlarmList,
                            areaPV: true
                        })
                    }
                    return {
                        ...state,
                        [areaName]: action.pvData.value
                    }
                }
                else {
                    return state
                }
            default:
                throw new Error();
        }
    }, [alarmIOCPVPrefix, lastArea, loadAlarmList])
    const [areaPVDict, dispatchAreaPVDict] = useReducer(areaPVDictReducer, {})
    const [areaPVs, setAreaPVs] = useState([])

    const dbPVDataRaw = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs:Parameters:{}` }).data
    const dbConfigData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:config:Parameters:{}` }).data
    const dbGlobData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob:Parameters:{}` }).data

    const [currentPageDocId, setCurrentPageDocId] = useState(undefined)
    const [nextPageDocId, setNextPageDocId] = useState(undefined)

    const [historyQuery, setHistoryQuery] = useState({
        singleEntry: true,
        id: { '$regex': '.*' },
        entry: { '$regex': '.*' }
    })
    const [historyDataParams, setHistoryDataParams] = useState({
        query: { ...historyQuery },
        sort: [['_id', -1]],
        limit: rowsPerPage
    })
    const [totalDocsParams, setTotalDocsParams] = useState({
        query: { ...historyQuery },
        count: true
    })
    const [prevPageDocIdParams, setPrevPageDocIdParams] = useState({
        query: { ...historyQuery },
        sort: [['_id', 1]],
        skip: rowsPerPage,
        limit: 1
    })
    const [lastPageDocIdParams, setLastPageDocIdParams] = useState({
        query: { ...historyQuery },
        sort: [['_id', 1]],
        skip: lastPageSkip,
        limit: 1
    })

    const dbHistoryData = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history:Parameters:${JSON.stringify(historyDataParams)}` }).data
    const totalDocs = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history:Parameters:${JSON.stringify(totalDocsParams)}` }).data ?? 0
    const prevPageDocId = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history:Parameters:${JSON.stringify(prevPageDocIdParams)}` }).data?.[0]?._id.$oid
    const lastPageDocId = useMongoDbWatch({ dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history:Parameters:${JSON.stringify(lastPageDocIdParams)}` }).data?.[0]?._id.$oid

    const dbUpdateOne = useMongoDbUpdateOne({})
    const dbInsertOne = useMongoDbInsertOne({})
    const dbUpdateMany = useMongoDbUpdateMany({})
    const dbDeleteOne = useMongoDbDeleteOne({})

    const [alarmTableHeight, setAlarmTableHeight] = useState('43vh')
    const [alarmLogHeight, setAlarmLogHeight] = useState('33vh')

    // handleNewDbPVsList
    useEffect(() => {
        if (dbPVDataRaw !== null) {
            const localLastSubAreaKey = {}
            // Sort by AREA always
            dbPVDataRaw.sort((a, b) => (a.area > b.area) ? 1 : ((b.area > a.area) ? -1 : 0))
            // Sort subAreas
            const subAreas = []
            let areaIndex = -1
            // Extract subAreas
            dbPVDataRaw.map(area => {
                Object.entries(area).map(entry => {
                    const key = entry[0]
                    const value = entry[1]
                    if (key === "area") {
                        subAreas.push([])
                        areaIndex = areaIndex + 1
                    }
                    else if (key.includes("subArea")) {
                        subAreas[areaIndex].push({ [key]: value })
                    }
                    return null
                })
                return null
            })
            // Formulate localLastSubAreaKey
            subAreas.map((subArea, index) => {
                try {
                    localLastSubAreaKey[dbPVDataRaw[index]["area"]] = parseInt(Object.keys(subArea.slice(-1)[0])[0].replace("subArea", ""))
                }
                catch (err) { }
                return null
            })
            // Sort subAreas
            subAreas.map(subArea => {
                subArea.sort((a, b) => {
                    const aKey = Object.keys(a)[0]
                    const bKey = Object.keys(b)[0]
                    return (a[aKey].name > b[bKey].name) ? 1 : ((b[bKey].name > a[aKey].name) ? -1 : 0)
                })
                return null
            })
            // Replace all previous subAreas
            dbPVDataRaw.map((area, index) => {
                subAreas[index].map(subArea => {
                    const subAreaKey = Object.keys(subArea)[0]
                    delete dbPVDataRaw[index][subAreaKey]
                    dbPVDataRaw[index][subAreaKey] = subArea[subAreaKey]
                    return null
                })
                return null
            })
            //
            const localAreaNames = []
            const localAreaAlarms = []
            const localAreaEnabled = {}
            const localAreaBridged = {}
            const localLastPVKey = {}
            const localAreaRoles = {}
            let localLastAlarm = ""
            let localLastArea = ""
            let areaNamesIndex = -1
            dbPVDataRaw.map(area => {
                areaNamesIndex = ++areaNamesIndex
                // Backwards compatible
                const areaHasRoles = area?.roles
                    ? area.roles.length > 0
                    : false
                const areaMatchesRole = areaHasRoles
                    ? isAlarmAdmin
                        ? true
                        : roles.some(r => area.roles.includes(r))
                    : true
                localAreaRoles[area["area"]] = areaHasRoles ? area.roles : []
                if (areaMatchesRole) {
                    areaMongoId[area["area"]] = area["_id"]["$oid"]
                    localAreaEnabled[area["area"]] = area["enable"]
                    // Backwards compatible
                    localAreaBridged[area["area"]] = {
                        bridge: (area["bridge"] ?? false),
                        bridgeTime: (area["bridgeTime"] ?? '')
                    }
                    localLastArea = area["area"]
                    Object.keys(area).map(areaKey => {
                        if (areaKey === "pvs") {
                            // Map alarms in area
                            const items = Object.entries(area[areaKey]).map(value => {
                                localLastPVKey[area["area"]] = parseInt(value[0].replace("pv", ""))
                                return value
                            })
                            items.sort((A, B) => {
                                const nameA = A[1]["name"]
                                const nameB = B[1]["name"]
                                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
                            })
                            items.map(item => {
                                localAreaAlarms.push([`${area["area"]}=${item[0]}`, item[1]])
                                localLastAlarm = item[1]["name"]
                                return null
                            })
                        }
                        else if (areaKey === "area") {
                            localAreaNames.push({ "area": area[areaKey] })
                        }
                        else if (areaKey.includes("subArea")) {
                            // Backwards compatible
                            const subAreaHasRoles = area[areaKey]?.roles
                                ? area[areaKey].roles.length > 0
                                : false
                            const subAreaMatchesRole = subAreaHasRoles
                                ? isAlarmAdmin
                                    ? true
                                    : roles.some(r => area[areaKey].roles.includes(r))
                                : true
                            localAreaRoles[`${area["area"]}=${area[areaKey]["name"]}`] = subAreaHasRoles ? area[areaKey].roles : []
                            if (subAreaMatchesRole) {
                                areaSubAreaMongoId[`${area["area"]}=${area[areaKey]["name"]}`] = areaKey
                                areaMongoId[`${area["area"]}=${area[areaKey]["name"]}`] = area["_id"]["$oid"]
                                // Area enabled for subArea includes parent area
                                localAreaEnabled[`${area["area"]}=${area[areaKey]["name"]}`] = area[areaKey]["enable"] && localAreaEnabled[area["area"]]
                                // Backwards compatible
                                localAreaBridged[`${area["area"]}=${area[areaKey]["name"]}`] = {
                                    bridge: (area[areaKey]["bridge"] ?? false),
                                    bridgeTime: (area[areaKey]["bridgeTime"] ?? '')
                                }
                                localLastArea = `${area["area"]}=${area[areaKey]["name"]}`
                                if (localAreaNames[areaNamesIndex]["subAreas"]) {
                                    localAreaNames[areaNamesIndex]["subAreas"].push(area[areaKey]["name"])
                                }
                                else {
                                    localAreaNames[areaNamesIndex]["subAreas"] = [area[areaKey]["name"]]
                                }
                                // map all alarms in subArea
                                const items = Object.entries(area[areaKey]["pvs"]).map(value => {
                                    localLastPVKey[`${area["area"]}=${area[areaKey]["name"]}`] = parseInt(value[0].replace("pv", ""))
                                    return value
                                })
                                items.sort((A, B) => {
                                    const nameA = A[1]["name"]
                                    const nameB = B[1]["name"]
                                    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
                                })
                                items.map(item => {
                                    localAreaAlarms.push([`${area["area"]}=${area[areaKey]["name"]}=${item[0]}`, item[1]])
                                    localLastAlarm = item[1]["name"]
                                    return null
                                })
                            }
                        }
                        return null
                    })
                }
                else {
                    areaNamesIndex = --areaNamesIndex
                }
                return null
            })
            if (!areaSelectedIndex) {
                setAreaSelectedIndex('ALLAREAS')
                setAreaSelectedName('ALL AREAS')
                setAlarmLogSelectedName('ALL AREAS')
                setAlarmLogSelectedKey('ALLAREAS')
            }
            setLastAlarm(localLastAlarm)
            setAreaMongoId(areaMongoId)
            setAreaSubAreaMongoId(areaSubAreaMongoId)
            setAreaNames(localAreaNames)
            setAreaAlarms(localAreaAlarms)
            setAreaEnabled(localAreaEnabled)
            setAreaBridged(localAreaBridged)
            setLastArea(localLastArea)
            setLastPVKey(localLastPVKey)
            setLastSubAreaKey(localLastSubAreaKey)
            setAreaRoles(localAreaRoles)

            setDbPVData(dbPVDataRaw)

            let displayAlarmTable = true
            for (const [, value] of Object.entries(loadAlarmTable)) {
                displayAlarmTable = displayAlarmTable && value
            }
            if (!displayAlarmTable) {
                autoLoadAlarmTable()
            }

            let displayAlarmList = true
            for (const [, value] of Object.entries(loadAlarmList)) {
                displayAlarmList = displayAlarmList && value
            }
            if (!displayAlarmList) {
                autoLoadAlarmList()
            }
        }
        // disable useEffect dependencies for "dbPVDataRaw"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbPVDataRaw])

    // update totalDocsParams and lastPageDocIdParams
    useEffect(() => {
        setTotalDocsParams(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                id: historyQuery.id,
                entry: historyQuery.entry
            }
        }))
        setLastPageDocIdParams(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                id: historyQuery.id,
                entry: historyQuery.entry
            }
        }))
    }, [historyQuery])


    // update historyDataParams
    useEffect(() => {
        setHistoryDataParams(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                id: historyQuery.id,
                entry: historyQuery.entry,
                ...(currentPageDocId
                    ? { _id: { $lt: currentPageDocId } }
                    : { _id: undefined }
                )

            },
            limit: rowsPerPage
        }))
    }, [historyQuery, rowsPerPage, currentPageDocId])

    // update historyQuery regex
    useEffect(() => {
        let regex = ``
        if (alarmLogSelectedKey === "ALLAREAS") {
            // ALL AREAS
            regex = '.*'
            setHistoryQuery(prevState => ({
                ...prevState,
                id: { '$regex': regex },
                entry: { '$regex': `(?i)${alarmLogSearchString}` }
            }))
        }
        else if (alarmLogSelectedKey.includes("*")) {
            // pv
            regex = `^${alarmLogSelectedKey.replace("*", "\\*")}$`
            setHistoryQuery(prevState => ({
                ...prevState,
                id: { '$regex': regex },
                entry: { '$regex': `(?i)${alarmLogSearchString}` }
            }))
        }
        else if (alarmLogSelectedKey.includes("=")) {
            // subArea
            regex = `(^${alarmLogSelectedKey}\\*)|(^${alarmLogSelectedKey}$)`
            setHistoryQuery(prevState => ({
                ...prevState,
                id: { '$regex': regex },
                entry: { '$regex': `(?i)${alarmLogSearchString}` }
            }))
        }
        else if (alarmLogSelectedKey) {
            // Area
            regex = `(^${alarmLogSelectedKey}(=|\\*))|(^${alarmLogSelectedKey}$)`
            setHistoryQuery(prevState => ({
                ...prevState,
                id: { '$regex': regex },
                entry: { '$regex': `(?i)${alarmLogSearchString}` }
            }))
        }

    }, [alarmLogSelectedKey, alarmLogSearchString])


    // update lastPage based on totalDocs
    useEffect(() => {
        setLastPage(Math.ceil(totalDocs / rowsPerPage) - 1)
    }, [totalDocs, rowsPerPage])

    // update prevPageDocIdParams based on currentPageDocId, rowsPerPage and historyQuery
    useEffect(() => {
        setPrevPageDocIdParams(prevState => ({
            ...prevState,
            skip: rowsPerPage,
            ...(currentPageDocId
                ? {
                    query: {
                        _id: { $gte: currentPageDocId },
                        id: historyQuery.id,
                        entry: historyQuery.entry
                    }
                }
                : {
                    query: {
                        _id: undefined,
                        id: historyQuery.id,
                        entry: historyQuery.entry
                    }
                }
            )
        }))
    }, [currentPageDocId, rowsPerPage, historyQuery])

    // update page and currentPageDocId based on alarmLogSearchString, alarmLogSelectedKey and rowsPerPage
    useEffect(() => {
        setPage(0)
        setCurrentPageDocId(undefined)
    }, [alarmLogSearchString, alarmLogSelectedKey, rowsPerPage])

    // update lastPageSkip based on totalDocs
    useEffect(() => {
        const remainder = totalDocs % rowsPerPage
        if (remainder === 0) {
            setLastPageSkip(rowsPerPage)
        }
        else {
            setLastPageSkip(remainder)
        }

    }, [totalDocs, rowsPerPage])

    // update lastPageDocIdParams based on lastPageSkip
    useEffect(() => {
        setLastPageDocIdParams(prevState => ({
            ...prevState,
            skip: lastPageSkip
        }))
    }, [lastPageSkip])

    // update currentPageDocId to lastPageDocId if you're
    // on last page - to catch updating log during view of
    // last page
    useEffect(() => {
        if (page === lastPage && page !== 0) {
            setCurrentPageDocId(lastPageDocId)
        }
    }, [lastPageDocId, page, lastPage])

    // handleNewDbLogReadWatchBroadcast
    useEffect(() => {
        if (dbHistoryData !== null) {
            const tempArray = []
            dbHistoryData.map(entry => {
                const date = format(parseISO(entry.timestamp), "HH:mm:ss E, dd LLL yyyy")
                const content = `${date}: ${entry.entry}`
                tempArray.push({
                    key: entry._id.$oid,
                    content: content
                })
                setNextPageDocId(entry._id.$oid)
                return null
            })
            setAlarmLogDisplayArray(tempArray)
        }
    }, [dbHistoryData])

    // handleDbConfig
    useEffect(() => {
        if (dbConfigData !== null) {
            const data = dbConfigData[0];
            setAlarmIOCPVPrefix(data["alarmIOCPVPrefix"])
            setAlarmIOCPVSuffix(data['alarmIOCPVSuffix'])
        }
    }, [dbConfigData])

    // handleDbGlobal
    useEffect(() => {
        if (dbGlobData !== null) {
            // ["_id"]["$oid"]
            const data = dbGlobData[0]
            setEnableAllAreas(data["enableAllAreas"])
            setGlobalDocId(data["_id"]["$oid"])
            setRestartCount(data["restartCount"])
            // Backwards compatible
            setServerAHDBVer(data["AHDBVer"] ?? 0)
        }
    }, [dbGlobData])

    // const handleDoNothing = () => {

    // }



    const handleGlobalArea = useCallback(() => {
        setAreaSelectedIndex('ALLAREAS')
        setAlarmLogSelectedKey('ALLAREAS')
        setAreaSelectedName('ALL AREAS')
        setAlarmLogSelectedName('ALL AREAS')
        setAreaSubAreaOpen({})
        setPageAT(0)
        setAlarmTableSearchStringStore('')
        setAlarmTableSearchString('')
        setAlarmRowSelected({})
    }, [])

    const handleAckGlobal = useCallback(() => {
        const localAlarmAckField = [username, true]
        setAlarmAckField(localAlarmAckField)
        setAlarmAckFieldTrig(alarmAckFieldTrig + 1)
        setGlobalContextOpen(false)
        setAlarmAdminGListExpand(false)
    }, [alarmAckFieldTrig, username])

    const handleDisableEnableGlobal = useCallback((value) => {
        // console.log(value)
        const id = globalDocId
        const newvalues = {
            '$set': {
                enableAllAreas: value,
                activeUser: username
            }
        }

        // console.log(newvalues)

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: id,
            update: newvalues
        })

        setGlobalContextOpen(false)
    }, [dbUpdateOne, globalDocId, props.dbName, username])

    const handleIconClick = useCallback((event) => {
        // console.log("right click")
        event.preventDefault();

        setGlobalContextOpen(true)
        setContextMouseX(event.clientX - 2)
        setContextMouseY(event.clientY - 2)

    }, [])

    const handleAlarmGlobalContextClose = useCallback(() => {
        setGlobalContextOpen(false)
        setAlarmAdminGListExpand(false)
    }, [])

    const handleSearchAlarmTable = useCallback((event) => {
        const srch = event.target.value
        if (alarmTableSearchTimer) {
            clearTimeout(alarmTableSearchTimer)
        }
        setAlarmTableSearchStringStore(srch)
        setPageAT(0)
        setAlarmTableSearchTimer(setTimeout(() => {
            setAlarmTableSearchString(srch)
        }, 300))
    }, [alarmTableSearchTimer])

    const handleSearchAlarmLog = useCallback((event) => {
        const srch = event.target.value
        if (alarmLogSearchTimer) {
            clearTimeout(alarmLogSearchTimer)
        }
        setAlarmLogSearchStringStore(srch)
        setPage(0)
        setAlarmLogSearchTimer(setTimeout(() => {
            setAlarmLogSearchString(srch)
        }, 300))
    }, [alarmLogSearchTimer])

    const handleExpansionComplete = useCallback((panelName, isExpanded) => {
        if (panelName === 'alarmTable') {
            setAlarmTableIsExpanded(isExpanded)
        }
        else if (panelName === 'alarmLog') {
            setAlarmLogIsExpanded(isExpanded)
        }
    }, [])

    const handleExpandPanel = useCallback((event, panelName) => {
        event.preventDefault()
        event.stopPropagation()
        if (panelName === 'alarmTable') {
            setAlarmTableExpand(alarmTableExpand ? false : true)
        }
        else if (panelName === 'alarmLog') {
            setAlarmLogExpand(alarmLogExpand ? false : true)
        }
    }, [alarmLogExpand, alarmTableExpand])

    // const handleSimplePrint = (value, pvname) => {
    //     // console.log(pvname, value)
    // }


    const handleListItemContextClose = useCallback((event, index) => {
        // console.log("close context")
        setAlarmAdminListExpand(false)
        setAreaContextOpen({})
    }, [])

    const handleAckAllAreaAlarms = useCallback((event, index) => {
        // console.log('Ack all alarms for', index)

        let localAlarmAckField = null
        if (index.includes("=")) {
            localAlarmAckField = ['1', index.split("=")[0], index.split("=")[1], null, username, true]
        }
        else {
            localAlarmAckField = ['0', index, null, null, username, true]
        }

        handleListItemContextClose(event, index)

        setAlarmAckField(localAlarmAckField)
        setAlarmAckFieldTrig(alarmAckFieldTrig + 1)
    }, [alarmAckFieldTrig, handleListItemContextClose, username])

    const handleTableItemCheck = useCallback((event, index, alarm, field, value) => {
        // to prevent re render of alarm log table?
        event.preventDefault()
        event.stopPropagation()

        const id = areaMongoId[index]
        let newvalues = null

        // Check if it is a subArea
        // console.log(index)

        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        if (index.includes("=")) {
            const subAreaId = areaSubAreaMongoId[index] + ".pvs." + alarm + "." + field
            newvalues = { '$set': { [subAreaId]: value } }
        }
        else {
            const subAreaId = "pvs." + alarm + "." + field
            newvalues = { '$set': { [subAreaId]: value } }
        }

        // console.log(newvalues)

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
            id: id,
            update: newvalues
        })

    }, [areaMongoId, areaSubAreaMongoId, dbUpdateOne, props.dbName, globalDocId, username])

    const handleTableEnableCheck = useCallback((event, areaName, alarm, entryIndex) => {
        // to prevent re render of alarm log table?
        event.preventDefault()
        event.stopPropagation()

        setEnableDialogData({
            ...filteredAreaAlarms[entryIndex][1],
            areaName: areaName,
            alarm: alarm,
            type: 'pv'
        })
        setEnableDialogOpen(true)

    }, [filteredAreaAlarms])

    const handleExecuteEnablePV = useCallback(() => {
        const index = enableDialogData.areaName
        const alarm = enableDialogData.alarm

        const id = areaMongoId[index]
        let newvalues = null

        // Check if it is a subArea
        // console.log(index)

        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        if (index.includes("=")) {
            // bridge
            newvalues = {
                '$set': {
                    [areaSubAreaMongoId[index] + ".pvs." + alarm + ".bridge"]: enableDialogData.bridge,
                    [areaSubAreaMongoId[index] + ".pvs." + alarm + ".bridgeTime"]: enableDialogData.bridgeTime,
                    [areaSubAreaMongoId[index] + ".pvs." + alarm + ".enable"]: enableDialogData.enable
                }
            }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
                update: newvalues
            })
        }
        else {
            // bridge
            newvalues = {
                '$set': {
                    ["pvs." + alarm + ".bridge"]: enableDialogData.bridge,
                    ["pvs." + alarm + ".bridgeTime"]: enableDialogData.bridgeTime,
                    ["pvs." + alarm + ".enable"]: enableDialogData.enable
                }
            }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
                update: newvalues
            })
        }
        setEnableDialogOpen(false)
    }, [enableDialogData, areaMongoId, areaSubAreaMongoId, dbUpdateOne, props.dbName, username, globalDocId])

    const handleTableRowClick = useCallback((event, alarmName, index) => {
        event.preventDefault()
        event.stopPropagation()
        setAlarmLogSelectedName(alarmName.replace(/[=*]/g, " > "))
        setAlarmLogSelectedKey(alarmName)
        setAlarmRowSelected({
            [index]: true
        })
        // handleUpdateLogDisplayData(alarmName)
    }, [])

    const handleTableItemRightClick = useCallback((event, index, entryIndex) => {
        event.preventDefault();
        const alarmName = `${index.replace(/=pv\d+/g, "")}*${filteredAreaAlarms[entryIndex][1]["name"]}`
        const areaAlarmNameArray = index.split('=')
        let areaName = null
        if (areaAlarmNameArray.length > 2) {
            areaName = areaAlarmNameArray[0] + "=" + areaAlarmNameArray[1]
        }
        else {
            areaName = areaAlarmNameArray[0]
        }
        if (areaEnabled[areaName] && filteredAreaAlarms[entryIndex][1]["enable"]) {
            const localContextMouseX = event.clientX - 2
            const localContextMouseY = event.clientY - 2

            setAlarmContextOpen({
                [index]: true
            })
            setAlarmRowSelected({
                [index]: true
            })
            setAlarmLogSelectedName(alarmName.replace(/[=*]/g, " > "))
            setAlarmLogSelectedKey(alarmName)
            setContextMouseX(localContextMouseX)
            setContextMouseY(localContextMouseY)

        }
    }, [areaEnabled, filteredAreaAlarms])

    const handleAlarmContextClose = useCallback(() => {
        setAlarmRowSelected({})
        setAlarmContextOpen({})
    }, [])

    const handleAlarmAcknowledge = useCallback((event, index) => {
        // console.log("Ack alarm:", index)
        event.preventDefault()
        event.stopPropagation()

        const equalsLength = index.match(/=/g).length
        let localAlarmAckField = null
        if (equalsLength === 2) {
            localAlarmAckField = ['3', index.split("=")[0], index.split("=")[1], index.split("=")[2], username, true]
        }
        else {
            localAlarmAckField = ['2', index.split("=")[0], null, index.split("=")[1], username, true]
        }

        // console.log(alarmAckField)

        handleAlarmContextClose()
        setAlarmAdminPVExpand(false)

        setAlarmAckField(localAlarmAckField)
        setAlarmAckFieldTrig(alarmAckFieldTrig + 1)
    }, [alarmAckFieldTrig, handleAlarmContextClose, username])

    const handleEnableDisableArea = useCallback((event, index, value) => {
        event.preventDefault()
        event.stopPropagation()

        let name = ''
        if (index.includes("=")) {
            name = `${index.split("=")[0]} > ${index.split("=")[1]}`
        }
        else {
            name = `${index}`
        }

        setEnableDialogData({
            name: name,
            index: index,
            enable: areaEnabled[index],
            bridge: areaBridged[index].bridge,
            bridgeTime: areaBridged[index].bridgeTime,
            type: 'area'
        })

        handleListItemContextClose(event, index)
        setEnableDialogOpen(true)


    }, [areaEnabled, areaBridged, handleListItemContextClose])

    const handleExecuteEnableDisableArea = useCallback((event) => {
        const index = enableDialogData.index
        const id = areaMongoId[index]

        let newvalues = null

        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        // Check if it is a subArea
        if (index.includes("=")) {
            // bridge
            newvalues = {
                '$set': {
                    [areaSubAreaMongoId[index] + ".bridge"]: enableDialogData.bridge,
                    [areaSubAreaMongoId[index] + ".bridgeTime"]: enableDialogData.bridgeTime,
                    [areaSubAreaMongoId[index] + ".enable"]: enableDialogData.enable
                }
            }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
                update: newvalues
            })
        }
        else {
            // bridge
            newvalues = {
                '$set': {
                    "bridge": enableDialogData.bridge,
                    "bridgeTime": enableDialogData.bridgeTime,
                    "enable": enableDialogData.enable
                }
            }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
                update: newvalues
            })
        }

        setEnableDialogOpen(false)

    }, [enableDialogData, areaMongoId, areaSubAreaMongoId, dbUpdateOne, props.dbName, globalDocId, username])



    const handleListItemRightClick = useCallback((event, index) => {
        // console.log("right click")
        event.preventDefault()
        event.stopPropagation()
        setAreaContextOpen({
            [index]: true
        })
        setContextMouseX(event.clientX - 2)
        setContextMouseY(event.clientY - 2)
    }, [])

    const handleListItemClick = useCallback((event, index) => {
        let localAreaSelectedName = index.split('=')

        if (localAreaSelectedName.length > 1) {                  // selected area is a subArea
            localAreaSelectedName = localAreaSelectedName[0] + " > " + localAreaSelectedName[1]
        }
        else {                                              // selected area is an area
            if (index === areaSelectedIndex) {   // selected same area twice
                setAreaSubAreaOpen({
                    [index]: !areaSubAreaOpen[index]
                })
            }
            else {                                           // selected a different area
                setAreaSubAreaOpen({
                    [index]: true
                })
            }
        }


        setAreaSelectedIndex(index)
        setAreaSelectedName(localAreaSelectedName)
        setAlarmLogSelectedName(localAreaSelectedName)
        setAlarmLogSelectedKey(index)
        setAlarmRowSelected({})
        setPageAT(0)
        setAlarmTableSearchStringStore('')
        setAlarmTableSearchString('')
        // console.log(index)
        // handleUpdateLogDisplayData(index)
    }, [areaSelectedIndex, areaSubAreaOpen])

    const handleAddNewPV = useCallback((event, index) => {
        const lastKey = lastPVKey[index]
        const newKey = isNaN(lastKey)
            ? 0
            : lastKey + 1
        const areaName = index.includes("=")
            ? `${index.split('=')[0]} > ${index.split('=')[1]}`
            : index
        setNewPVInfo({
            ...newPVInfo,
            alarmKey: newKey,
            areaIndex: index,
            areaName: areaName,
            pvs: [{ pvname: "", connected: false }]
        })
        setAreaContextOpen({})
        setAlarmAdminListExpand(false)
        setAddPVDialogOpen(true)
    }, [lastPVKey, newPVInfo])


    const handleAddNewArea = useCallback(() => {
        setAlarmAdminGListExpand(false)
        setGlobalContextOpen(false)
        setAddAreaDialogData({
            edit: false,
            area: '',
            addRoles: false,
            roles: []
        })
        setAddAreaDialogOpen(true)
    }, [])


    const handleAddNewSubArea = useCallback((event, index) => {
        setAreaContextOpen({})
        setAlarmAdminListExpand(false)
        setAddSubAreaData({
            edit: false,
            areaIndex: index,
            areaNextSubAreaKey: isNaN(lastSubAreaKey[index]) ? 0 : lastSubAreaKey[index] + 1,
            subArea: '',
            addRoles: false,
            roles: []
        })
        setAddSubAreaDialogOpen(true)
    }, [lastSubAreaKey])

    const handleEditArea = useCallback((event, index) => {
        const isSubArea = index.includes("=")
        if (isSubArea) {
            setAddSubAreaData({
                edit: true,
                oldIndex: index,
                areaIndex: index.split("=")[0],
                subArea: index.split("=")[1],
                addRoles: areaRoles[index].length !== 0,
                roles: areaRoles[index]
            })
            setAddSubAreaDialogOpen(true)
        }
        else {
            setAddAreaDialogData({
                edit: true,
                area: index,
                oldArea: index,
                addRoles: areaRoles[index].length !== 0,
                roles: areaRoles[index]
            })
            setAddAreaDialogOpen(true)
        }
        setAreaContextOpen({})
        setAlarmAdminListExpand(false)
    }, [areaRoles])

    const handleDeleteArea = useCallback((event, index) => {
        const areaName = index.includes("=")
            ? index.split("=")[1]
            : index
        setDeleteAreaDialogData({
            index: index,
            areaName: areaName
        })
        setAreaContextOpen({})
        setAlarmAdminListExpand(false)
        setDeleteAreaDialogOpen(true)
    }, [])

    const handleDeletePV = useCallback((event, index, pvname) => {
        const parts = index.split("=")
        const isSubArea = parts.length === 3
        const pvKey = isSubArea ? parts[2] : parts[1]
        setDeletePVDialogData({
            area: parts[0],
            subArea: isSubArea ? parts[1] : undefined,
            pvKey: pvKey,
            pvname: pvname
        })
        setDeletePVDialogOpen(true)
    }, [])

    const handleExecuteEditArea = useCallback(() => {
        const { area, oldArea, roles } = addAreaDialogData
        const id = areaMongoId[oldArea]

        let query = {}
        let newvalues = {}
        let aggregation = {}

        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        newvalues = {
            '$set': {
                area: area,
                roles: roles
            }
        }

        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
            id: id,
            update: newvalues
        })

        const index = oldArea
        const newIndex = area
        const newLogName = area

        query = {
            id: { '$regex': `^${index}=` }
        }
        aggregation = {
            '$set': {
                'id': {
                    '$concat': [{
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}=`]
                        }, 0]
                    },
                    `${newIndex}=`,
                    {
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}=`]
                        }, 1]
                    }]
                }
            }
        }
        dbUpdateMany({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
            query: query,
            aggregation: aggregation
        })
        query = {
            id: { '$regex': `^${index}\\*` }
        }
        aggregation = {
            '$set': {
                'id': {
                    '$concat': [{
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}*`]
                        }, 0]
                    },
                    `${newIndex}*`,
                    {
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}*`]
                        }, 1]
                    }]
                }
            }
        }
        dbUpdateMany({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
            query: query,
            aggregation: aggregation
        })
        query = {
            id: { '$regex': `^${index}$` }
        }
        aggregation = {
            '$set': {
                'id': {
                    '$concat': [{
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}`]
                        }, 0]
                    },
                    `${newIndex}`,
                    {
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}`]
                        }, 1]
                    }]
                },
            }
        }
        dbUpdateMany({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
            query: query,
            aggregation: aggregation
        })

        setAddAreaDialogOpen(false)
        setAreaSelectedIndex(newIndex)
        setAlarmLogSelectedKey(newIndex)
        setAlarmLogSelectedName(newLogName)
        setAreaSelectedName(newLogName)
    }, [addAreaDialogData, areaMongoId, dbUpdateOne, props.dbName, dbUpdateMany, globalDocId, username])

    const handleExecuteEditSubArea = useCallback(() => {
        const { oldIndex, subArea, roles } = addSubAreaData
        const id = areaMongoId[oldIndex]
        const subAreaId = areaSubAreaMongoId[oldIndex]

        let query = {}
        let newvalues = {}
        let aggregation = {}

        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        newvalues = {
            '$set': {
                [`${subAreaId}.name`]: subArea,
                [`${subAreaId}.roles`]: roles
            }
        }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
            id: id,
            update: newvalues
        })

        const index = oldIndex
        const newIndex = `${index.split("=")[0]}=${subArea}`
        const newLogName = `${index.split("=")[0]} > ${subArea}`

        query = {
            id: { '$regex': `^${index}\\*` }
        }
        aggregation = {
            '$set': {
                'id': {
                    '$concat': [{
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}*`]
                        }, 0]
                    },
                    `${newIndex}*`,
                    {
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}*`]
                        }, 1]
                    }]
                }
            }
        }
        dbUpdateMany({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
            query: query,
            aggregation: aggregation
        })
        query = {
            id: { '$regex': `^${index}$` }
        }
        aggregation = {
            '$set': {
                'id': {
                    '$concat': [{
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}`]
                        }, 0]
                    },
                    `${newIndex}`,
                    {
                        '$arrayElemAt': [{
                            '$split': ['$id', `${index}`]
                        }, 1]
                    }]
                },
            }
        }
        dbUpdateMany({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
            query: query,
            aggregation: aggregation
        })

        setAddSubAreaDialogOpen(false)
        setAreaSelectedIndex(newIndex)
        setAlarmLogSelectedKey(newIndex)
        setAlarmLogSelectedName(newLogName)
        setAreaSelectedName(newLogName)
    }, [addSubAreaData, areaMongoId, areaSubAreaMongoId, dbUpdateOne, props.dbName, dbUpdateMany, globalDocId, username])

    const handleExecuteRenameArea = useCallback(() => {
        const { index, newName } = renameDialogData
        const id = areaMongoId[index]
        let subAreaId = ''
        let query = {}
        if (index.includes("=")) {
            subAreaId = areaSubAreaMongoId[index]
        }
        let newvalues = {}

        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        if (subAreaId) {
            newvalues = { '$set': { [`${subAreaId}.name`]: newName } }
        }
        else {
            newvalues = { '$set': { [`area`]: newName } }
        }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
            id: id,
            update: newvalues
        })
        let newIndex = ''
        let newLogName = ''
        let aggregation = {}
        if (index.includes("=")) {
            newIndex = `${index.split("=")[0]}=${newName}`
            newLogName = `${index.split("=")[0]} > ${newName}`
            query = {
                id: { '$regex': `^${index}\\*` }
            }
            aggregation = {
                '$set': {
                    'id': {
                        '$concat': [{
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}*`]
                            }, 0]
                        },
                        `${newIndex}*`,
                        {
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}*`]
                            }, 1]
                        }]
                    }
                }
            }
            dbUpdateMany({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
                query: query,
                aggregation: aggregation
            })
            query = {
                id: { '$regex': `^${index}$` }
            }
            aggregation = {
                '$set': {
                    'id': {
                        '$concat': [{
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}`]
                            }, 0]
                        },
                        `${newIndex}`,
                        {
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}`]
                            }, 1]
                        }]
                    },
                    // Update entry as well for enable/disable area
                    // 'entry': {
                    //     '$concat': [{
                    //         '$arrayElemAt': [{
                    //             '$split': ['$entry', `${index.split("=")[1]}`]
                    //         }, 0]
                    //     },
                    //     `${newName}`,
                    //     {
                    //         '$arrayElemAt': [{
                    //             '$split': ['$entry', `${index.split("=")[1]}`]
                    //         }, 1]
                    //     }]
                    // }
                }
            }
            dbUpdateMany({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
                query: query,
                aggregation: aggregation
            })
        }
        else {
            newIndex = newName
            newLogName = newName
            query = {
                id: { '$regex': `^${index}=` }
            }
            aggregation = {
                '$set': {
                    'id': {
                        '$concat': [{
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}=`]
                            }, 0]
                        },
                        `${newIndex}=`,
                        {
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}=`]
                            }, 1]
                        }]
                    }
                }
            }
            dbUpdateMany({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
                query: query,
                aggregation: aggregation
            })
            query = {
                id: { '$regex': `^${index}\\*` }
            }
            aggregation = {
                '$set': {
                    'id': {
                        '$concat': [{
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}*`]
                            }, 0]
                        },
                        `${newIndex}*`,
                        {
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}*`]
                            }, 1]
                        }]
                    }
                }
            }
            dbUpdateMany({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
                query: query,
                aggregation: aggregation
            })
            query = {
                id: { '$regex': `^${index}$` }
            }
            aggregation = {
                '$set': {
                    'id': {
                        '$concat': [{
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}`]
                            }, 0]
                        },
                        `${newIndex}`,
                        {
                            '$arrayElemAt': [{
                                '$split': ['$id', `${index}`]
                            }, 1]
                        }]
                    },
                    // Update entry as well for enable/disable area
                    // 'entry': {
                    //     '$concat': [{
                    //         '$arrayElemAt': [{
                    //             '$split': ['$entry', `${index}`]
                    //         }, 0]
                    //     },
                    //     `${newIndex}`,
                    //     {
                    //         '$arrayElemAt': [{
                    //             '$split': ['$entry', `${index}`]
                    //         }, 1]
                    //     }]
                    // }
                }
            }
            dbUpdateMany({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:history`,
                query: query,
                aggregation: aggregation
            })
        }
        setRenameDialogOpen(false)
        setAreaSelectedIndex(newIndex)
        setAlarmLogSelectedKey(newIndex)
        setAlarmLogSelectedName(newLogName)
        setAreaSelectedName(newLogName)
    }, [renameDialogData, areaMongoId, areaSubAreaMongoId, dbUpdateOne, props.dbName, dbUpdateMany, globalDocId, username])

    const handleExecuteDeleteArea = useCallback(() => {
        const { index } = deleteAreaDialogData
        const id = areaMongoId[index]
        let newvalues = {}

        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        if (index.includes("=")) {
            const subAreaId = areaSubAreaMongoId[index]
            const topArea = index.split("=")[0]
            newvalues = { '$unset': { [subAreaId]: "" } }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
                update: newvalues
            })
            setAreaSelectedIndex(topArea)
            setAlarmLogSelectedKey(topArea)
            setAlarmLogSelectedName(topArea)
            setAreaSelectedName(topArea)
        }
        else {
            dbDeleteOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
            })
            setAreaSelectedIndex('ALLAREAS')
            setAlarmLogSelectedKey('ALLAREAS')
            setAlarmLogSelectedName('ALL AREAS')
            setAreaSelectedName('ALL AREAS')
        }
        setDeleteAreaDialogOpen(false)
    }, [deleteAreaDialogData, areaMongoId, dbDeleteOne, props.dbName, areaSubAreaMongoId, dbUpdateOne, globalDocId, username])

    const handleExecuteDeletePV = useCallback(() => {
        const { area, subArea, pvKey } = deletePVDialogData
        const index = subArea ? `${area}=${subArea}` : area
        const id = areaMongoId[index]
        const subAreaId = subArea ? areaSubAreaMongoId[index] : undefined
        let newvalues
        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //
        if (subAreaId) {
            newvalues = {
                '$unset': { [`${subAreaId}.pvs.${pvKey}`]: "" }
            }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
                update: newvalues
            })
            setAreaSelectedIndex(index)
            setAlarmLogSelectedKey(index)
            setAlarmLogSelectedName(`${area} > ${subArea}`)
            setAreaSelectedName(`${area} > ${subArea}`)
        }
        else {
            newvalues = {
                '$unset': { [`pvs.${pvKey}`]: "" }
            }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
                update: newvalues
            })
            setAreaSelectedIndex(index)
            setAlarmLogSelectedKey(index)
            setAlarmLogSelectedName(area)
            setAreaSelectedName(area)
        }
        setDeletePVDialogOpen(false)
        setDeletePVDialogData({})
    }, [deletePVDialogData, areaMongoId, areaSubAreaMongoId, dbUpdateOne, globalDocId, props.dbName, username])

    const handleExecuteAddNewSubArea = useCallback(() => {
        const { areaIndex, subArea, areaNextSubAreaKey, roles } = addSubAreaData
        const id = areaMongoId[areaIndex]

        let newvalues = {}

        // set activeUser
        newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        newvalues = {
            '$set': {
                [`subArea${areaNextSubAreaKey}`]: {
                    name: subArea,
                    enable: true,
                    bridge: false,
                    bridgeTime: '',
                    roles: roles,
                    pvs: {}
                }
            }
        }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
            id: id,
            update: newvalues
        })
        setAddSubAreaDialogOpen(false)
    }, [addSubAreaData, areaMongoId, dbUpdateOne, props.dbName, globalDocId, username])

    const handleExecuteAddNewArea = useCallback(() => {

        const { area, roles } = addAreaDialogData

        // set activeUser
        const newvalues = { '$set': { activeUser: username } }
        dbUpdateOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
            id: globalDocId,
            update: newvalues
        })
        //

        const newEntry = {
            area: area,
            enable: true,
            bridge: false,
            bridgeTime: '',
            roles: roles,
            pvs: {}
        }
        dbInsertOne({
            dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
            newEntry: newEntry
        })
        setAddAreaDialogOpen(false)
        setAddAreaDialogData({})
    }, [addAreaDialogData, dbInsertOne, props.dbName, dbUpdateOne, globalDocId, username])

    const handleAppendNewPVInfo = useCallback(() => {
        setNewPVInfo({
            ...newPVInfo,
            pvs: [...newPVInfo.pvs, { pvname: "", connected: false }]
        })
    }, [newPVInfo])

    const handlePopNewPVInfo = useCallback((index) => {
        const newPvs = newPVInfo.pvs.filter((item, itemIndex) => itemIndex !== index)
        setNewPVInfo({
            ...newPVInfo,
            pvs: newPvs
        })
    }, [newPVInfo])

    const handleUpdateNewPVInfoPVName = useCallback((event, index) => {
        const newPvs = newPVInfo.pvs.filter(item => true)
        newPvs[index].pvname = event.target.value
        setNewPVInfo({
            ...newPVInfo,
            pvs: newPvs
        })
    }, [newPVInfo])

    const handleExecuteAddNewPVs = useCallback(() => {
        const { areaIndex, pvs, alarmKey } = newPVInfo
        const id = areaMongoId[areaIndex]
        let subAreaId = null
        let oldPvs = null
        let newPvs = null
        let key = alarmKey
        const matchDoc = dbPVData.filter(el => el["_id"]["$oid"] === id)[0]
        if (areaIndex.includes("=")) {
            subAreaId = areaSubAreaMongoId[areaIndex]
            oldPvs = matchDoc[subAreaId].pvs
        }
        else {
            oldPvs = matchDoc.pvs
        }
        // console.log('oldPvs', oldPvs)
        newPvs = { ...oldPvs }
        let restartAlarmServer = false
        pvs.map(pv => {
            const { pvname } = pv
            let proceedToAddPV = false

            proceedToAddPV = true
            restartAlarmServer = true

            if (proceedToAddPV) {
                newPvs = {
                    ...newPvs,
                    [`pv${key}`]: {
                        name: pvname,
                        enable: true,
                        bridge: false,
                        bridgeTime: '',
                        latch: true,
                        notify: true,
                        lastAlarmVal: "",
                        lastAlarmTime: "",
                        lastAlarmAckTime: ""
                    }
                }
                key = key + 1
            }
            return null
        })
        if (restartAlarmServer) {
            // console.log('newPvs', newPvs)
            let newvalues = {}

            // set activeUser
            newvalues = { '$set': { activeUser: username } }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob`,
                id: globalDocId,
                update: newvalues
            })
            //

            if (subAreaId) {
                newvalues = { '$set': { [`${subAreaId}.pvs`]: newPvs } }
            }
            else {
                newvalues = { '$set': { [`pvs`]: newPvs } }
            }
            dbUpdateOne({
                dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs`,
                id: id,
                update: newvalues
            })
        }

        setAddPVDialogOpen(false)

    }, [dbPVData, newPVInfo, areaMongoId, areaSubAreaMongoId, dbUpdateOne, props.dbName, globalDocId, username])

    const autoLoadAlarmTable = useCallback(() => {
        const timer = setTimeout(() => {
            if (!loadAlarmTable) {
                console.log('Warning: Auto load alarm table')
            }
            const localLoadAlarmTable = { ...loadAlarmTable }
            for (const [key,] of Object.entries(localLoadAlarmTable)) {
                localLoadAlarmTable[key] = true
            }
            setLoadAlarmTable(localLoadAlarmTable)
        }, 10000);
        return () => clearTimeout(timer);
    }, [loadAlarmTable])

    const autoLoadAlarmList = useCallback(() => {
        const timer = setTimeout(() => {
            if (!loadAlarmList) {
                console.log('Warning: Auto load alarm list')
            }
            const localLoadAlarmList = { ...loadAlarmList }
            for (const [key,] of Object.entries(localLoadAlarmList)) {
                localLoadAlarmList[key] = true
            }
            setLoadAlarmList(localLoadAlarmList)
        }, 10000);
        return () => clearTimeout(timer);
    }, [loadAlarmList])

    const handleChangePage = useCallback((event, newPage) => {
        if (newPage === 0) {
            // first page
            setCurrentPageDocId(undefined)
        }
        else if (newPage !== lastPage) {
            // normal page
            if (newPage > page) {
                // page forward
                setCurrentPageDocId(nextPageDocId)
            }
            else {
                // page backward
                setCurrentPageDocId(prevPageDocId)
            }
        }
        else {
            // last page
            setCurrentPageDocId(lastPageDocId)
        }
        setPage(newPage)
    }, [lastPage, page, nextPageDocId, prevPageDocId, lastPageDocId])

    const handleChangeRowsPerPage = useCallback((event) => {
        setPage(0)
        setRowsPerPage(parseInt(event.target.value, 10))
    }, [])

    const handleChangePageAT = useCallback((event, newPage) => {
        setPageAT(newPage)
    }, [])

    const handleChangeRowsPerPageAT = useCallback((event) => {
        setRowsPerPageAT(parseInt(event.target.value, 10))
        setPageAT(0)
    }, [])

    useEffect(() => {
        const keyedAreaAlarms = areaAlarms.reduce((acc, entry) => {
            const areaAlarmName = entry[0]
            let areaKey = areaAlarmName.replace(/=pv\d+/, "")   // areaKey is area | area=subArea
            if (!areaSelectedIndex.includes("=")) {             // areaSelectedIndex is area
                areaKey = areaKey.split('=')[0]                 // areaKey is area
            }
            if (areaKey === areaSelectedIndex || areaSelectedIndex === 'ALLAREAS') {
                acc.push(entry)
            }
            return acc
        }, [])

        const searchedAreaAlarms = keyedAreaAlarms.reduce((acc, entry) => {
            const value = entry[1]
            const visible = value["name"].toLowerCase().includes(alarmTableSearchString.toLowerCase())
            if (visible) {
                acc.push(entry)
            }
            return acc
        }, [])

        setPreSliceAreaAlarms(searchedAreaAlarms)

        const slicedAreaAlarms = rowsPerPageAT > 0
            ? searchedAreaAlarms.slice(pageAT * rowsPerPageAT, pageAT * rowsPerPageAT + rowsPerPageAT)
            : searchedAreaAlarms

        setFilteredAreaAlarms(slicedAreaAlarms)

    }, [areaAlarms, areaSelectedIndex, alarmTableSearchString, pageAT, rowsPerPageAT])

    useEffect(() => {
        if (alarmIOCPVPrefix !== null && alarmIOCPVSuffix !== null) {
            let localAlarmPVs = []
            areaAlarms.map(entry => {
                const key = entry[0]
                const value = entry[1]
                const pvObject =
                    <PV
                        key={key}
                        pv={alarmIOCPVPrefix + value["name"] + alarmIOCPVSuffix}
                        pvData={(pvData) => dispatchAlarmPVDict({ type: 'updatePVData', pvData: pvData })}
                    />
                localAlarmPVs = [...localAlarmPVs, pvObject]
                return null
            })
            setAlarmPVs(localAlarmPVs)
        }
    }, [alarmIOCPVPrefix, alarmIOCPVSuffix, areaAlarms])

    useEffect(() => {
        if (alarmIOCPVPrefix !== null) {
            const localAckPV = (
                <PV
                    pv={alarmIOCPVPrefix + "ACK_PV"}
                    outputValue={alarmAckField}
                    debug={false}
                    newValueTrigger={alarmAckFieldTrig}
                />
            )
            setAckPV(localAckPV)
        }
    }, [alarmIOCPVPrefix, alarmAckField, alarmAckFieldTrig])


    useEffect(() => {
        if (alarmIOCPVPrefix !== null) {
            let localAreaPVs = []
            Object.keys(areaEnabled).map(areaName => {
                const pvObject = <PV
                    key={areaName}
                    pv={alarmIOCPVPrefix + areaName}
                    pvData={(pvData) => dispatchAreaPVDict({ type: 'updatePVData', pvData: pvData })}
                />
                localAreaPVs = [...localAreaPVs, pvObject]
                return null
            })
            setAreaPVs(localAreaPVs)
        }
    }, [alarmIOCPVPrefix, areaEnabled])


    const displayAlarmTable = useMemo(() => {
        return Object.entries(loadAlarmTable).reduce((acc, entry) => {
            return acc && entry[1]
        }, true)
    }, [loadAlarmTable])

    const displayAlarmList = useMemo(() => {
        return Object.entries(loadAlarmList).reduce((acc, entry) => {
            return acc && entry[1]
        }, true)
    }, [loadAlarmList])

    useEffect(() => {
        if (alarmTableExpand && !alarmLogExpand && !alarmLogIsExpanded) {
            setAlarmTableHeight('80vh')
        }
        else if (!alarmTableExpand && !alarmTableIsExpanded && alarmLogExpand) {
            setAlarmLogHeight('80vh')
        }
        else {
            setAlarmTableHeight('43vh')
            setAlarmLogHeight('33vh')
        }
    }, [alarmTableExpand, alarmLogExpand, alarmLogIsExpanded, alarmTableIsExpanded])

    const setDialogPvData = useCallback((pvData) => {
        const epicsPVName = pvData.pvName?.replace("pva://", "")
        const index = newPVInfo.pvs.findIndex(item => item.pvname === epicsPVName)
        if (pvData.initialized) {
            if (!newPVInfo.pvs[index].connected) {
                // console.log('Connected')
                const newPvs = newPVInfo.pvs.filter(item => true)
                newPvs[index].connected = true
                setNewPVInfo({
                    ...newPVInfo,
                    pvs: newPvs
                })
            }
        }
        else if (epicsPVName) {
            if (newPVInfo.pvs[index].connected) {
                // console.log('Disconnected')
                const newPvs = newPVInfo.pvs.filter(item => true)
                newPvs[index].connected = false
                setNewPVInfo({
                    ...newPVInfo,
                    pvs: newPvs
                })
            }
        }
    }, [newPVInfo])

    useEffect(() => {
        if (Object.keys(newPVInfo).length !== 0) {
            let localAddPVDialogPvs = []
            newPVInfo.pvs.map((pv, index) => {
                const pvObject = pv.pvname !== ""
                    ? <PV
                        key={`${pv.pvname}-${index}`}
                        pv={pv.pvname}
                        pvData={setDialogPvData}
                    />
                    : null
                localAddPVDialogPvs = [...localAddPVDialogPvs, pvObject]
                return null
            })
            setAddPVDialogPvs(localAddPVDialogPvs)
        }
        return () => {
            setAddPVDialogPvs([])
        }
    }, [newPVInfo, setDialogPvData])

    useEffect(() => {
        let timer1, timer2
        if (backdropOpen) {
            timer1 = setInterval(() => {
                setASRestartProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
            }, 800)
            timer2 = setInterval(() => {
                setBackDropOpen(false)
            }, 1 * 8000)
        }
        return () => {
            clearInterval(timer1)
            clearInterval(timer2)
            setASRestartProgress(0)
        }
    }, [backdropOpen])

    useEffect(() => {
        if (restartCount !== undefined) {
            if (firstStart) {
                setFirstStart(false)
            }
            else {
                setBackDropOpen(true)
            }
        }
        // disable useEffect dependencies for "firstStart"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restartCount])

    // console.log('Top render')



    return (
        <React.Fragment>
            {ackPV}
            {areaPVs}
            {alarmPVs}
            {addPVDialogPvs}
            <Backdrop
                className={classes.backdrop}
                open={backdropOpen}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
            >
                <Typography variant="h4">Restarting alarm server...</Typography>
                <CircularProgress
                    color="inherit"
                    style={{ marginTop: '2rem' }}
                    size="4rem"
                    variant="determinate"
                    value={ASRestartProgress}
                />
            </Backdrop>
            <AddPVDialog
                open={addPVDialogOpen}
                appendNewPVInfo={handleAppendNewPVInfo}
                popNewPVInfo={handlePopNewPVInfo}
                updateNewPVInfoPVName={handleUpdateNewPVInfoPVName}
                executeAddNewPVs={handleExecuteAddNewPVs}
                handleClose={() => {
                    setAddPVDialogOpen(false)
                    // setNewPVInfo({})
                }}
                newPVInfo={newPVInfo}
            />
            <EnableDialog
                open={enableDialogOpen}
                data={enableDialogData}
                executeEnable={enableDialogData.type === 'pv' ? handleExecuteEnablePV : handleExecuteEnableDisableArea}
                setEnableDialogData={setEnableDialogData}
                handleClose={() => {
                    setEnableDialogOpen(false)
                }}

            />
            <RenameDialog
                open={renameDialogOpen}
                data={renameDialogData}
                setRenameDialogData={setRenameDialogData}
                handleClose={() => {
                    setRenameDialogOpen(false)
                }}
                executeRenameArea={handleExecuteRenameArea}
            />
            <AddAreaDialog
                open={addAreaDialogOpen}
                data={addAreaDialogData}
                setAddAreaDialogData={setAddAreaDialogData}
                handleClose={() => {
                    setAddAreaDialogOpen(false)
                    setAddAreaDialogData({})
                }}
                addNewArea={handleExecuteAddNewArea}
                editArea={handleExecuteEditArea}
            />
            <AddSubAreaDialog
                open={addSubAreaDialogOpen}
                data={addSubAreaData}
                setAddSubAreaData={setAddSubAreaData}
                handleClose={() => {
                    setAddSubAreaDialogOpen(false)
                    setAddSubAreaData({})
                }}
                executeAddNewSubArea={handleExecuteAddNewSubArea}
                executeEditSubArea={handleExecuteEditSubArea}
            />
            <DeleteAreaDialog
                open={deleteAreaDialogOpen}
                data={deleteAreaDialogData}
                handleClose={() => {
                    setDeleteAreaDialogOpen(false)
                    setDeleteAreaDialogData({})
                }}
                handleDelete={handleExecuteDeleteArea}
            />
            <DeletePVDialog
                open={deletePVDialogOpen}
                data={deletePVDialogData}
                handleClose={() => {
                    setDeletePVDialogOpen(false)
                    setDeletePVDialogData({})
                }}
                handleDelete={handleExecuteDeletePV}
            />
            {clientAHDBVer === serverAHDBVer
                ? <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                    className={classes.root}
                >
                    {displayAlarmList && !backdropOpen
                        ? <Grid item xs={2}>
                            <Paper className={classes.paper} elevation={theme.palette.paperElevation}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item xs={2} style={{ textAlign: 'right' }}>
                                        <IconButton
                                            aria-label="global_alarms"
                                            style={{ padding: 0 }}
                                            onClick={() => handleGlobalArea()}
                                            onContextMenu={(event) => handleIconClick(event)}
                                            size="large">
                                            {areaSelectedIndex === 'ALLAREAS'
                                                ? <PublicIcon color="secondary" />
                                                : <PublicIcon />}
                                        </IconButton>
                                        {isAlarmUser && <Menu
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
                                            {isAlarmAdmin &&
                                                <MenuItem
                                                    onClick={() => setAlarmAdminGListExpand(!alarmAdminGListExpand)}
                                                >
                                                    <ListItemIcon >
                                                        <SupervisorAccountIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Alarm admin actions" />
                                                    {alarmAdminGListExpand ? <ExpandLess style={{ marginLeft: 16 }} /> : <ExpandMore style={{ marginLeft: 16 }} />}
                                                </MenuItem>
                                            }
                                            <Collapse in={alarmAdminGListExpand} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding >
                                                    <ListItem
                                                        button
                                                        className={classes.nested}
                                                        onClick={handleAddNewArea}
                                                    >
                                                        <ListItemIcon >
                                                            <AddIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Add new area" />
                                                    </ListItem>
                                                </List>
                                            </Collapse>

                                        </Menu>}
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
                                                fadeList={fadeList}
                                                isAlarmAdmin={isAlarmAdmin}
                                                isAlarmUser={isAlarmUser}
                                                alarmAdminListExpand={alarmAdminListExpand}
                                                ackAllAreaAlarms={handleAckAllAreaAlarms}
                                                enableDisableArea={handleEnableDisableArea}
                                                listItemClick={handleListItemClick}
                                                listItemRightClick={handleListItemRightClick}
                                                listItemContextClose={handleListItemContextClose}
                                                addNewPV={handleAddNewPV}
                                                addNewSubArea={handleAddNewSubArea}
                                                editArea={handleEditArea}
                                                deleteArea={handleDeleteArea}
                                                setAlarmAdminListExpand={setAlarmAdminListExpand}
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
                    {displayAlarmTable && !backdropOpen ?
                        <Grid item xs={10} >
                            <Accordion
                                elevation={theme.palette.paperElevation}
                                expanded={alarmTableExpand}
                                onClick={(event) => handleExpandPanel(event, 'alarmTable')}
                                TransitionProps={{
                                    onEntered: () => handleExpansionComplete('alarmTable', true),
                                    onExited: () => handleExpansionComplete('alarmTable', false)
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    classes={{ content: classes.expansionPanelSummaryContent, expanded: classes.expanded }}
                                >
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <div className={classes.verticalMiddle} style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>{`ALARM TABLE: ${areaSelectedName}`}</div>
                                        {
                                            alarmTableExpand
                                                ? <TablePagination
                                                    component="div"
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        event.stopPropagation()
                                                    }}
                                                    rowsPerPageOptions={[25, 50]}
                                                    colSpan={3}
                                                    count={preSliceAreaAlarms.length}
                                                    rowsPerPage={rowsPerPageAT}
                                                    page={pageAT}
                                                    SelectProps={{
                                                        inputProps: { 'aria-label': 'rows per page' },
                                                        native: true,
                                                    }}
                                                    onPageChange={handleChangePageAT}
                                                    onRowsPerPageChange={handleChangeRowsPerPageAT}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                                : null
                                        }
                                        <div className={classes.verticalMiddle} style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 1 }}>{
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
                                                        // onBlur={() => { setAlarmTableSearchStringStore(''); setAlarmTableSearchString('') }}
                                                        value={alarmTableSearchStringStore}
                                                    />
                                                </div>
                                                : '[click to show]'
                                        }</div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {areaNames
                                        ? <AlarmTable
                                            alarmIOCPVPrefix={alarmIOCPVPrefix}
                                            enableAllAreas={enableAllAreas}
                                            debug={alarmDebug}
                                            alarmPVDict={alarmPVDict}
                                            alarmRowSelected={alarmRowSelected}
                                            alarmContextOpen={alarmContextOpen}
                                            areaSelectedIndex={areaSelectedIndex}
                                            areaAlarms={filteredAreaAlarms}
                                            contextMouseX={contextMouseX}
                                            contextMouseY={contextMouseY}
                                            areaEnabled={areaEnabled}
                                            height={alarmTableHeight}
                                            alarmTableSearchString={alarmTableSearchString}
                                            isAlarmUser={isAlarmUser}
                                            isAlarmAdmin={isAlarmAdmin}
                                            alarmAdminPVExpand={alarmAdminPVExpand}
                                            alarmAcknowledge={handleAlarmAcknowledge}
                                            alarmContextClose={handleAlarmContextClose}
                                            itemChecked={handleTableItemCheck}
                                            enableChecked={handleTableEnableCheck}
                                            tableItemRightClick={handleTableItemRightClick}
                                            tableRowClick={handleTableRowClick}
                                            setAlarmAdminPVExpand={setAlarmAdminPVExpand}
                                            deletePV={handleDeletePV}
                                            fadeTU={fadeTU}
                                            page={pageAT}
                                            rowsPerPage={rowsPerPageAT}
                                        />
                                        : "No data from database"}
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                elevation={theme.palette.paperElevation}
                                expanded={alarmLogExpand}
                                onClick={(event) => handleExpandPanel(event, 'alarmLog')}
                                TransitionProps={{
                                    onEntered: () => handleExpansionComplete('alarmLog', true),
                                    onExited: () => handleExpansionComplete('alarmLog', false)
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    classes={{ content: classes.expansionPanelSummaryContent, expanded: classes.expanded }}
                                >
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <div className={classes.verticalMiddle} style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 20 }}>{`ALARM LOG: ${alarmLogSelectedName}`}</div>
                                        {
                                            alarmLogExpand
                                                ? <TablePagination
                                                    component="div"
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        event.stopPropagation()
                                                    }}
                                                    rowsPerPageOptions={[25, 50, 100]}
                                                    colSpan={3}
                                                    count={totalDocs}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    SelectProps={{
                                                        inputProps: { 'aria-label': 'rows per page' },
                                                        native: true,
                                                    }}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                                : null
                                        }
                                        <div className={classes.verticalMiddle} style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 1 }}>{
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
                                                        // onBlur={() => { setAlarmLogSearchStringStore(''); setAlarmLogSearchString('') }}
                                                        value={alarmLogSearchStringStore}
                                                    />
                                                </div>
                                                : '[click to show]'
                                        }
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <AlarmLog
                                        height={alarmLogHeight}
                                        alarmLogDisplayArray={alarmLogDisplayArray}
                                        scrollReset={{
                                            page: page,
                                            rowsPerPage: rowsPerPage,
                                            alarmLogSearchString: alarmLogSearchString,
                                            alarmLogSelectedKey: alarmLogSelectedKey
                                        }}
                                    />
                                </AccordionDetails>
                            </Accordion>

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
                : <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                    className={classes.root}
                >
                    <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={theme.palette.paperElevation}>
                            <div style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                                Alarm Handler database version is not current. Please prune
                                the database and restart the Alarm Handler server.
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            }
            {/* </div> */}
        </React.Fragment>
    );
}


export default React.memo(AlarmSetup);
