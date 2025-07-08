import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import AutomationStudioContext from "../SystemComponents/AutomationStudioContext";
import DataConnection from "../SystemComponents/DataConnection";
import ScheduleDialog from "./ScheduleDialog";
import EditUsersDialog from "./EditUsersDialog";
import HelpDialog from "./HelpDialog";
import UserTable from "./UserTable";
import PVList from "./PVList";
import useMongoDbWatch from "../SystemComponents/database/MongoDB/useMongoDbWatch";
import useMongoDbUpdateOne from "../SystemComponents/database/MongoDB/useMongoDbUpdateOne";
import { AccountCog } from "mdi-material-ui/";
import { format, parseISO } from "date-fns";

const UserNotification = (props) => {
  const theme = useTheme();

  const context = useContext(AutomationStudioContext);

  const username = useMemo(() => {
    return context.userData.username;
  }, [context.userData.username]);

  const roles = useMemo(() => {
    return context.userData.roles;
  }, [context.userData.roles]);

  const isAlarmAdmin = useMemo(() => {
    const isLoggedIn = username !== undefined;
    return isLoggedIn ? roles.includes("alarmAdmin") : false;
  }, [username, roles]);

  // to connect to all PVs before updating state
  const firstAlarmPVDict = {};
  const [alarmList, setAlarmList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userEdit, setUserEdit] = useState({});
  const [userTableExpand, setUserTableExpand] = useState(true);
  const [pvListExpand, setPvListExpand] = useState(true);
  const [userTableIsExpanded, setUserTableIsExpanded] = useState(true);
  const [pvListIsExpanded, setPvListIsExpanded] = useState(true);
  const [filterUser, setFilterUser] = useState({});
  const [filterUserRegex, setFilterUserRegex] = useState([]);
  const [dictUserRegex, setDictUserRegex] = useState({});
  const [alarmIOCPVPrefix, setAlarmIOCPVPrefix] = useState(null);
  const [alarmIOCPVSuffix, setAlarmIOCPVSuffix] = useState(null);
  const [loadPVList, setLoadPVList] = useState(false);
  const [lastAlarm, setLastAlarm] = useState(null);
  const [alarmPVDict, setAlarmPVDict] = useState({});
  const [backupUserList, setBackupUserList] = useState({});
  const [regexError, setRegexError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [mobileError, setMobileError] = useState({});
  const [addRegexVal, setAddRegexVal] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogUserObject, setDialogUserObject] = useState({});
  const [dialogUserNotifyIndex, setDialogUserNotifyIndex] = useState(0);
  const [snackMessage, setSnackMessage] = useState("");
  const [userTableSearchString, setUserTableSearchString] = useState("");
  const [userTableSearchStringStore, setUserTableSearchStringStore] =
    useState("");
  const [userTableSearchTimer, setUserTableSearchTimer] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [editUsersDialogOpen, setEditUsersDialogOpen] = useState(false);
  const [editUsersList, setEditUsersList] = useState({});
  const [forwardBDisabled, setForwardBDisabled] = useState(true);
  const [backwardBDisabled, setBackwardBDisabled] = useState(true);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [clientAHDBVer] = useState(props.AHDBVer);
  const [serverAHDBVer, setServerAHDBVer] = useState(props.AHDBVer);
  const dbPVData = useMongoDbWatch({
    dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:pvs:Parameters:{}`,
  }).data;
  const dbUsersData = useMongoDbWatch({
    dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users:Parameters:{}`,
  }).data;
  const dbConfigData = useMongoDbWatch({
    dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:config:Parameters:{}`,
  }).data;
  const dbGlobData = useMongoDbWatch({
    dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:glob:Parameters:{}`,
  }).data;
  const dbUpdateOne = useMongoDbUpdateOne({});
  const loadPVListRef = useRef(loadPVList);
  loadPVListRef.current = loadPVList;
  const userScheduleString = useCallback((userObject) => {
    let sumString;
    if (userObject.isGlobal) {
      sumString = "Global - Do not notify me";
    } else {
      sumString = "Do not notify me";
    }
    if (userObject.notify) {
      if (userObject.isGlobal) {
        sumString = "Global - Notify me about ";
      } else {
        sumString = "Notify me about ";
      }
      // alarm types - Backwards compatible
      if (
        (userObject.alarmMinor ?? true) &&
        (userObject.alarmMajor ?? true) &&
        (userObject.alarmInvalid ?? true) &&
        (userObject.alarmDisconn ?? true)
      ) {
        sumString = sumString.concat("all alarm types on ");
      } else if (
        (userObject.alarmMinor ?? true) &&
        (userObject.alarmMajor ?? true) &&
        (userObject.alarmInvalid ?? true)
      ) {
        sumString = sumString.concat(
          "MINOR, MAJOR and INVALID alarm types on "
        );
      } else if (
        (userObject.alarmMinor ?? true) &&
        (userObject.alarmMajor ?? true) &&
        (userObject.alarmDisconn ?? true)
      ) {
        sumString = sumString.concat(
          "MINOR, MAJOR and DISCONN alarm types on "
        );
      } else if (
        (userObject.alarmMinor ?? true) &&
        (userObject.alarmInvalid ?? true) &&
        (userObject.alarmDisconn ?? true)
      ) {
        sumString = sumString.concat(
          "MINOR, INVALID and DISCONN alarm types on "
        );
      } else if (
        (userObject.alarmMajor ?? true) &&
        (userObject.alarmInvalid ?? true) &&
        (userObject.alarmDisconn ?? true)
      ) {
        sumString = sumString.concat(
          "MAJOR, INVALID and DISCONN alarm types on "
        );
      } else if (
        (userObject.alarmMinor ?? true) &&
        (userObject.alarmMajor ?? true)
      ) {
        sumString = sumString.concat("MINOR and MAJOR alarm types on ");
      } else if (
        (userObject.alarmMinor ?? true) &&
        (userObject.alarmInvalid ?? true)
      ) {
        sumString = sumString.concat("MINOR and INVALID alarm types on ");
      } else if (
        (userObject.alarmMinor ?? true) &&
        (userObject.alarmDisconn ?? true)
      ) {
        sumString = sumString.concat("MINOR and DISCONN alarm types on ");
      } else if (
        (userObject.alarmMajor ?? true) &&
        (userObject.alarmInvalid ?? true)
      ) {
        sumString = sumString.concat("MAJOR and INVALID alarm types on ");
      } else if (
        (userObject.alarmMajor ?? true) &&
        (userObject.alarmDisconn ?? true)
      ) {
        sumString = sumString.concat("MAJOR and DISCONN alarm types on ");
      } else if (
        (userObject.alarmInvalid ?? true) &&
        (userObject.alarmDisconn ?? true)
      ) {
        sumString = sumString.concat("INVALID and DISCONN alarm types on ");
      } else if (userObject.alarmMinor ?? true) {
        sumString = sumString.concat("MINOR alarm types on ");
      } else if (userObject.alarmMajor ?? true) {
        sumString = sumString.concat("MAJOR alarm types on ");
      } else if (userObject.alarmInvalid ?? true) {
        sumString = sumString.concat("INVALID alarm types on ");
      } else if (userObject.alarmDisconn ?? true) {
        sumString = sumString.concat("DISCONN alarm types on ");
      } else {
        sumString = sumString.concat("no alarm types on ");
      }
      //
      // Backwards compatible
      if (
        userObject.email &&
        userObject.sms &&
        userObject.whatsapp &&
        (userObject.signal ?? false)
      ) {
        sumString = sumString.concat("email, SMS, WhatsApp and Signal ");
      } else if (userObject.email && userObject.sms && userObject.whatsapp) {
        sumString = sumString.concat("email, SMS and WhatsApp ");
      }
      // Backwards compatible
      else if (
        userObject.email &&
        userObject.sms &&
        (userObject.signal ?? false)
      ) {
        sumString = sumString.concat("email, SMS and Signal ");
      }
      // Backwards compatible
      else if (
        userObject.email &&
        userObject.whatsapp &&
        (userObject.signal ?? false)
      ) {
        sumString = sumString.concat("email, WhatsApp and Signal ");
      }
      // Backwards compatible
      else if (
        userObject.sms &&
        userObject.whatsapp &&
        (userObject.signal ?? false)
      ) {
        sumString = sumString.concat("SMS, WhatsApp and Signal ");
      } else if (userObject.email && userObject.sms) {
        sumString = sumString.concat("email and SMS ");
      } else if (userObject.email && userObject.whatsapp) {
        sumString = sumString.concat("email and WhatsApp ");
      }
      // Backwards compatible
      else if (userObject.email && (userObject.signal ?? false)) {
        sumString = sumString.concat("email and Signal ");
      } else if (userObject.sms && userObject.whatsapp) {
        sumString = sumString.concat("SMS and WhatsApp ");
      }
      // Backwards compatible
      else if (userObject.sms && (userObject.signal ?? false)) {
        sumString = sumString.concat("SMS and Signal ");
      }
      // Backwards compatible
      else if (userObject.whatsapp && (userObject.signal ?? false)) {
        sumString = sumString.concat("WhatsApp and Signal ");
      } else if (userObject.email) {
        sumString = sumString.concat("email ");
      } else if (userObject.sms) {
        sumString = sumString.concat("SMS ");
      } else if (userObject.whatsapp) {
        sumString = sumString.concat("WhatsApp ");
      }
      // Backwards compatible
      else if (userObject.signal ?? false) {
        sumString = sumString.concat("Signal ");
      }
      if (userObject.allDay) {
        sumString = sumString.concat("all day ");
      } else {
        const fromTime = format(parseISO(userObject.fromTime), "HH:mm");
        const toTime = format(parseISO(userObject.toTime), "HH:mm");
        sumString = sumString.concat(`between ${fromTime} and ${toTime} `);
      }
      if (userObject.weekly) {
        let days = Object.entries(userObject.days).reduce((acc, day) => {
          if (day[1]) {
            acc.push(day[0]);
          }
          return acc;
        }, []);
        if (days.length === 7) {
          sumString = sumString.concat("everyday");
        } else if (days.length === 1) {
          sumString = sumString.concat(`on a ${days}`);
        } else {
          const lastDay = days[days.length - 1];
          days.pop();
          days = days.join(", ");
          days = days.concat(` and ${lastDay}`);
          sumString = sumString.concat(`on a ${days}`);
        }
      } else {
        const fromDate = format(parseISO(userObject.fromDate), "dd MMM yyyy");
        const toDate = format(parseISO(userObject.toDate), "dd MMM yyyy");
        sumString = sumString.concat(`from ${fromDate} to ${toDate}`);
      }
      return sumString;
    } else {
      return sumString;
    }
  }, []);

  const constructDESC_HOST = (value, pvname) => {
    let epicsPVName = pvname.replace("pva://", "");
    epicsPVName = epicsPVName.replace(alarmIOCPVPrefix, "");
    epicsPVName = epicsPVName.replace(alarmIOCPVSuffix, "");

    // still connecting to pvs
    if (!loadPVList) {
      firstAlarmPVDict[epicsPVName] = value;
      if (epicsPVName === lastAlarm) {
        setLoadPVList(true);
        setAlarmPVDict(firstAlarmPVDict);
      }
    }
    // all pvs connected
    else {
      const localAlarmPVDict = { ...alarmPVDict };
      localAlarmPVDict[epicsPVName] = value;
      setAlarmPVDict(localAlarmPVDict);
    }
  };

  const autoLoadPVList = () => {
    const timer = setTimeout(() => {
      if (!loadPVListRef.current) {
        console.log("Warning: Auto load PV List");
      }
      setLoadPVList(true);
    }, 5000);
    return () => clearTimeout(timer);
  };

  const handleSetAddRegexVal = useCallback(
    (event, username, name) => {
      const localAddRegexVal = { ...addRegexVal };
      const textEval = `${username}-${name}`;
      localAddRegexVal[textEval] = event.target.value;
      setAddRegexVal(localAddRegexVal);

      try {
        new RegExp(event.target.value);
        const localRegexError = { ...regexError };
        localRegexError[textEval] = false;
        setRegexError(localRegexError);
        setFilterUserRegex([
          {
            index: -1,
            regEx: event.target.value,
          },
        ]);
      } catch (e) {
        const localRegexError = { ...regexError };
        localRegexError[textEval] = true;
        setRegexError(localRegexError);
      }
    },
    [addRegexVal, regexError]
  );

  const handleSetFilterUser = useCallback(
    (name, username) => {
      setFilterUser({
        name: name,
        username: username,
      });
      const textEval = `${username}-${name}`;
      const newFilterUserRegex = Object.values(dictUserRegex[textEval]).reduce(
        (acc, entry, index) => {
          acc.push({
            index: index,
            regEx: entry.regEx,
          });
          return acc;
        },
        []
      );
      setFilterUserRegex(newFilterUserRegex);
    },
    [dictUserRegex]
  );

  const handleSetFilterUserRegex = useCallback((event, expression, index) => {
    event.preventDefault();
    event.stopPropagation();
    setFilterUserRegex([
      {
        index: index,
        regEx: expression,
      },
    ]);
    setFilterUser({});
    setDialogUserNotifyIndex(index);
  }, []);

  const handleSetUserEdit = useCallback(
    (event, name, username, value) => {
      event.preventDefault();
      event.stopPropagation();

      const match = userList.filter(
        (el) => el.name === name && el.username === username
      )[0];
      const newFilterUserRegex = Object.values(match.notifyPVs).reduce(
        (acc, entry, index) => {
          acc.push({
            index: index,
            regEx: entry.regEx,
          });
          return acc;
        },
        []
      );

      setFilterUserRegex(newFilterUserRegex);
      setFilterUser({
        name: match.name,
        username: match.username,
      });

      if (value) {
        // only back up when starting to edit
        const localBackupUserList = { ...backupUserList };
        const textEval = `${username}-${name}`;
        localBackupUserList[textEval] = { ...match };
        setBackupUserList(localBackupUserList);
      }
      const textEval = `${username}-${name}`;
      let localUserEdit = { ...userEdit };
      localUserEdit[textEval] = value;
      setUserEdit(localUserEdit);
    },
    [userEdit, userList, backupUserList]
  );

  const applyEdit = useCallback(
    (event, name, username) => {
      const localAddRegexVal = { ...addRegexVal };
      const textEval = `${username}-${name}`;
      localAddRegexVal[textEval] = "";
      setAddRegexVal(localAddRegexVal);

      handleSetUserEdit(event, name, username, false);
      // Find match and note it's index in userList
      const match = userList.filter(
        (el) => el.name === name && el.username === username
      )[0];
      const userIndex = userList.indexOf(match);

      // Reset userList to backup to guarantee
      // new values propogate from dbwatch
      const newUserList = [...userList];
      newUserList[userIndex] = backupUserList[textEval];
      setUserList(newUserList);

      const id = match["_id"]["$oid"];

      const newFilterUserRegex = Object.values(match.notifyPVs).reduce(
        (acc, entry, index) => {
          acc.push({
            index: index,
            regEx: entry.regEx,
          });
          return acc;
        },
        []
      );
      setFilterUserRegex(newFilterUserRegex);

      let newvalues = { $set: { email: match.email } };

      dbUpdateOne({
        dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
        id: id,
        update: newvalues,
      });

      newvalues = { $set: { mobile: match.mobile } };

      dbUpdateOne({
        dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
        id: id,
        update: newvalues,
      });

      newvalues = { $set: { notifyPVs: match.notifyPVs } };

      dbUpdateOne({
        dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
        id: id,
        update: newvalues,
      });
    },
    [
      handleSetUserEdit,
      userList,
      dbUpdateOne,
      addRegexVal,
      props.dbName,
      backupUserList,
    ]
  );

  const cancelEdit = useCallback(
    (event, name, username) => {
      handleSetUserEdit(event, name, username, false);

      // Find match and note it's index in userList
      const match = userList.filter(
        (el) => el.name === name && el.username === username
      )[0];
      const userIndex = userList.indexOf(match);

      // Create new userList
      const newUserList = [...userList];
      const textEval = `${username}-${name}`;
      newUserList[userIndex] = backupUserList[textEval];
      setUserList(newUserList);

      const localAddRegexVal = { ...addRegexVal };
      localAddRegexVal[textEval] = "";
      setAddRegexVal(localAddRegexVal);

      const newFilterUserRegex = Object.values(
        backupUserList[textEval].notifyPVs
      ).reduce((acc, entry, index) => {
        acc.push({
          index: index,
          regEx: entry.regEx,
        });
        return acc;
      }, []);
      setFilterUserRegex(newFilterUserRegex);

      // Clear email and mobile errors
      setEmailError((prevState) => {
        const textEval = `${username}-${name}`;
        return {
          ...prevState,
          [textEval]: false,
        };
      });
      setMobileError((prevState) => {
        const textEval = `${username}-${name}`;
        return {
          ...prevState,
          [textEval]: false,
        };
      });
      //
    },
    [backupUserList, handleSetUserEdit, addRegexVal, userList]
  );

  const validateEmail = useCallback((email) => {
    if (
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email
      )
    ) {
      return false;
    } else {
      return true;
    }
  }, []);

  const updateUserEmail = useCallback(
    (event, name, username) => {
      // Find match and note it's index in userList
      const match = userList.filter(
        (el) => el.name === name && el.username === username
      )[0];
      const userIndex = userList.indexOf(match);

      const { value } = event.target;

      match.email = value;

      // Create new userList
      const newUserList = [...userList];
      newUserList[userIndex] = match;

      // email error
      setEmailError((prevState) => {
        const textEval = `${username}-${name}`;
        return {
          ...prevState,
          [textEval]: validateEmail(value),
        };
      });
      //

      setUserList(newUserList);
    },
    [userList, validateEmail]
  );

  const validateMobile = useCallback((mobile) => {
    if (/^\+?[1-9]\d{1,14}$/.test(mobile)) {
      return false;
    } else {
      return true;
    }
  }, []);

  const updateUserMobile = useCallback(
    (event, name, username) => {
      // Find match and note it's index in userList
      const match = userList.filter(
        (el) => el.name === name && el.username === username
      )[0];
      const userIndex = userList.indexOf(match);

      const { value } = event.target;

      match.mobile = value;

      // Create new userList
      const newUserList = [...userList];
      newUserList[userIndex] = match;

      // mobile error
      setMobileError((prevState) => {
        const textEval = `${username}-${name}`;
        return {
          ...prevState,
          [textEval]: validateMobile(value),
        };
      });
      //

      setUserList(newUserList);
    },
    [userList, validateMobile]
  );

  const addChip = useCallback(
    (event, name, username, expression) => {
      event.stopPropagation();
      event.preventDefault();

      // Only add non blank chips
      if (expression !== "") {
        const localAddRegexVal = { ...addRegexVal };
        const textEval = `${username}-${name}`;
        localAddRegexVal[textEval] = "";
        setAddRegexVal(localAddRegexVal);

        // Find match and note it's index in userList
        const match = userList.filter(
          (el) => el.name === name && el.username === username
        )[0];
        const userIndex = userList.indexOf(match);

        // Update match by adding relevant expression
        const newNotifyPVs = [
          ...match.notifyPVs,
          {
            regEx: expression,
            notifySetup: {
              notify: true,
              email: true,
              sms: false,
              whatsapp: false,
              allDay: true,
              fromTime: "",
              toTime: "",
              weekly: true,
              days: {
                Monday: true,
                Tuesday: true,
                Wednesday: true,
                Thursday: true,
                Friday: true,
                Saturday: true,
                Sunday: true,
              },
              dateRange: false,
              fromDate: "",
              toDate: "",
            },
          },
        ];
        match.notifyPVs = newNotifyPVs;

        // Create new userList
        const newUserList = [...userList];
        newUserList[userIndex] = match;

        setUserList(newUserList);

        const newFilterUserRegex = Object.values(newNotifyPVs).reduce(
          (acc, entry, index) => {
            acc.push({
              index: index,
              regEx: entry.regEx,
            });
            return acc;
          },
          []
        );
        setFilterUserRegex(newFilterUserRegex);
      }
    },
    [userList, addRegexVal]
  );

  const deleteChip = useCallback(
    (event, name, username, expression) => {
      event.preventDefault();
      event.stopPropagation();

      // Find match and note it's index in userList
      const match = userList.filter(
        (el) => el.name === name && el.username === username
      )[0];
      const userIndex = userList.indexOf(match);

      // Remove regEx not required
      const newNotifyPVs = match.notifyPVs.filter(
        (el) => el.regEx !== expression
      );

      // Create new match with updated notifyPVs
      const newMatch = {
        ...match,
        notifyPVs: newNotifyPVs,
      };

      // Create new userList
      const newUserList = [...userList];
      newUserList[userIndex] = newMatch;

      setUserList(newUserList);

      const newFilterUserRegex = Object.values(newNotifyPVs).reduce(
        (acc, entry, index) => {
          acc.push({
            index: index,
            regEx: entry.regEx,
          });
          return acc;
        },
        []
      );
      setFilterUserRegex(newFilterUserRegex);
    },
    [userList]
  );

  const handleExpansionComplete = useCallback((panelName, isExpanded) => {
    if (panelName === "userTable") {
      setUserTableIsExpanded(isExpanded);
    } else if (panelName === "pvList") {
      setPvListIsExpanded(isExpanded);
    }
  }, []);

  const handleExpandPanel = useCallback(
    (panelName) => {
      if (panelName === "userTable") {
        setUserTableExpand(userTableExpand ? false : true);
      } else if (panelName === "pvList") {
        setPvListExpand(pvListExpand ? false : true);
      }
    },
    [pvListExpand, userTableExpand]
  );

  const handleOpenDialog = useCallback(
    (event, name, username) => {
      event.preventDefault();
      event.stopPropagation();

      const match = userList.filter(
        (el) => el.name === name && el.username === username
      )[0];

      setDialogUserObject(match);
      setDialogOpen(true);
    },
    [userList]
  );

  const handleAcceptDialog = useCallback(
    (name, username) => {
      // Find match and note it's index in userList
      const match = userList.filter(
        (el) => el.name === name && el.username === username
      )[0];
      const id = match["_id"]["$oid"];

      // console.log(dialogUserObject)

      let newvalues = { $set: { global: dialogUserObject.global } };

      dbUpdateOne({
        dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
        id: id,
        update: newvalues,
      });

      newvalues = { $set: { globalSetup: dialogUserObject.globalSetup } };

      dbUpdateOne({
        dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
        id: id,
        update: newvalues,
      });

      newvalues = { $set: { notifyPVs: dialogUserObject.notifyPVs } };

      dbUpdateOne({
        dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
        id: id,
        update: newvalues,
      });

      setDialogOpen(false);
      setDialogUserNotifyIndex(0);
    },
    [dbUpdateOne, userList, props.dbName, dialogUserObject]
  );

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setDialogUserNotifyIndex(0);
  }, []);

  const handleSnackClose = () => {
    setSnackMessage("");
  };

  const handleSearchUserTable = useCallback(
    (event) => {
      const srch = event.target.value;
      if (userTableSearchTimer) {
        clearTimeout(userTableSearchTimer);
      }
      setUserTableSearchStringStore(srch);
      setUserTableSearchTimer(
        setTimeout(() => {
          setUserTableSearchString(srch);
          setFilterUserRegex([]);
          setFilterUser({});
        }, 300)
      );
    },
    [userTableSearchTimer]
  );

  const clearAllUserSelects = useCallback(() => {
    Object.values(editUsersList).map((user) => {
      setEditUsersList((prevState) => {
        const textEval2 = `${user.username}-${user.name}`;
        return {
          ...prevState,
          [textEval2]: {
            ...prevState[textEval2],
            isSelected: false,
          },
        };
      });
      return null;
    });
  }, [editUsersList]);

  const applyEditUsers = useCallback(() => {
    Object.values(editUsersList).map((user) => {
      const id = user["id"]["$oid"];
      const newvalues = { $set: { isAHUser: user.isAHUser } };
      dbUpdateOne({
        dbURL: `mongodb://ALARM_DATABASE:${props.dbName}:users`,
        id: id,
        update: newvalues,
      });
      return null;
    });
    setEditUsersDialogOpen(false);
    clearAllUserSelects();
  }, [clearAllUserSelects, editUsersList, dbUpdateOne, props.dbName]);

  const pushToAlarmUsers = useCallback(() => {
    Object.values(editUsersList).map((entry) => {
      if (entry.adminDB_en && !entry.isAHUser && entry.isSelected) {
        setEditUsersList((prevState) => ({
          ...prevState,
          [`${entry.username}-${entry.name}`]: {
            ...prevState[`${entry.username}-${entry.name}`],
            isSelected: false,
            isAHUser: true,
          },
        }));
      }
      return null;
    });
  }, [editUsersList]);

  const pushToRASUsers = useCallback(() => {
    Object.values(editUsersList).map((entry) => {
      if (entry.adminDB_en && entry.isAHUser && entry.isSelected) {
        setEditUsersList((prevState) => ({
          ...prevState,
          [`${entry.username}-${entry.name}`]: {
            ...prevState[`${entry.username}-${entry.name}`],
            isSelected: false,
            isAHUser: false,
          },
        }));
      }
      return null;
    });
  }, [editUsersList]);

  // handleNewDbPVsList
  useEffect(() => {
    if (dbPVData !== null) {
      let localAlarmList = [];
      let localLastAlarm = "";

      dbPVData.map((area) => {
        // Map alarms in area
        Object.keys(area["pvs"]).map((alarmKey) => {
          localAlarmList.push(area["pvs"][alarmKey]["name"]);
          localLastAlarm = area["pvs"][alarmKey]["name"];
          return null;
        });
        Object.keys(area).map((areaKey) => {
          if (areaKey.includes("subArea")) {
            // Map alarms in subarea
            Object.keys(area[areaKey]["pvs"]).map((alarmKey) => {
              localAlarmList.push(area[areaKey]["pvs"][alarmKey]["name"]);
              localLastAlarm = area[areaKey]["pvs"][alarmKey]["name"];
              return null;
            });
          }
          return null;
        });
        return null;
      });

      localAlarmList.sort();

      setAlarmList(localAlarmList);
      setLastAlarm(localLastAlarm);

      if (!loadPVList) {
        autoLoadPVList();
      }
    }
    // disable useEffect dependencies for "dbPVData"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbPVData]);

  // handleDbUsers
  useEffect(() => {
    if (dbUsersData !== null) {
      const localUserEdit = {};
      const localDictUserRegex = {};
      const localBackupUserList = {};
      const localRegexError = {};
      const localAddRegexVal = {};
      const localEditUsersList = {};

      dbUsersData.map((user, index) => {
        const textEval2 = `${user.username}-${user.name}`;
        localDictUserRegex[textEval2] = user.notifyPVs;
        localBackupUserList[textEval2] = user;
        localUserEdit[textEval2] = false;
        localRegexError[textEval2] = false;
        localAddRegexVal[textEval2] = "";
        localEditUsersList[textEval2] = {
          id: user._id,
          name: user.name,
          username: user.username,
          adminDB_en: user.adminDB_en,
          isAHUser: user.isAHUser,
          isSelected: false,
        };
        return null;
      });

      if (Object.keys(userEdit).length === 0) {
        setUserEdit(localUserEdit);
        setRegexError(localRegexError);
        setAddRegexVal(localAddRegexVal);
      }

      setDictUserRegex(localDictUserRegex);
      setBackupUserList(localBackupUserList);
      // Sort users alphabetically by name field
      dbUsersData.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      //
      setUserList(dbUsersData);
      setEditUsersList(localEditUsersList);
    }
    // disable useEffect dependencies for "dbUsersData"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUsersData]);

  // handleDbConfig
  useEffect(() => {
    if (dbConfigData !== null) {
      const data = dbConfigData[0];
      setAlarmIOCPVPrefix(data["alarmIOCPVPrefix"]);
      setAlarmIOCPVSuffix(data["alarmIOCPVSuffix"]);
    }
    // disable useEffect dependencies for "dbConfigData"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbConfigData]);

  // handleDbGlobal
  useEffect(() => {
    if (dbGlobData !== null) {
      const data = dbGlobData[0];
      // Backwards compatible
      setServerAHDBVer(data["AHDBVer"] ?? 0);
    }
  }, [dbGlobData]);

  useEffect(() => {
    const filteredUsers = userList.reduce((acc, entry) => {
      const visible = entry["name"]
        .toLowerCase()
        .includes(userTableSearchString.toLowerCase());
      if (visible) {
        acc.push(entry);
      }
      return acc;
    }, []);
    setSearchedUsers(filteredUsers);
  }, [userList, userTableSearchString]);

  useEffect(() => {
    const enableForwardButton = Object.values(editUsersList).reduce(
      (acc, entry) => {
        return acc || (entry.adminDB_en && !entry.isAHUser && entry.isSelected);
      },
      false
    );
    const enableBackwardButton = Object.values(editUsersList).reduce(
      (acc, entry) => {
        return acc || (entry.adminDB_en && entry.isAHUser && entry.isSelected);
      },
      false
    );
    setForwardBDisabled(!enableForwardButton);
    setBackwardBDisabled(!enableBackwardButton);
  }, [editUsersList]);

  let alarmPVs = null;
  if (alarmIOCPVPrefix !== null && alarmIOCPVSuffix !== null) {
    alarmPVs = alarmList.map((alarm) => (
      <DataConnection
        key={alarm}
        pv={`${alarmIOCPVPrefix}${alarm}${alarmIOCPVSuffix}`}
        handleInputValue={constructDESC_HOST}
      />
    ));
  }

  const filterName =
    filterUserRegex.length === 0
      ? "ALL"
      : filterUserRegex.length === 1
      ? filterUserRegex[0].regEx === ""
        ? "ALL"
        : filterUserRegex[0].regEx
      : filterUser.name;

  let userTableHeight = "43vh";
  let pvListHeight = "33vh";
  if (userTableExpand && !pvListExpand && !pvListIsExpanded) {
    userTableHeight = "80vh";
  } else if (!userTableExpand && pvListExpand && !userTableIsExpanded) {
    pvListHeight = "80vh";
  }

  const warnAdminMessageEdit = "Only alarmAdmin role users can edit users";

  return (
    <React.Fragment>
      {alarmPVs}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackMessage !== ""}
        autoHideDuration={5000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <EditUsersDialog
        open={editUsersDialogOpen}
        editUsersList={editUsersList}
        forwardBDisabled={forwardBDisabled}
        backwardBDisabled={backwardBDisabled}
        handleClose={() => {
          setEditUsersDialogOpen(false);
          clearAllUserSelects();
        }}
        setEditUsersList={setEditUsersList}
        pushToAlarmUsers={pushToAlarmUsers}
        pushToRASUsers={pushToRASUsers}
        handleApplyEditUsers={applyEditUsers}
      />
      <HelpDialog
        open={helpDialogOpen}
        handleClose={() => {
          setHelpDialogOpen(false);
        }}
      />
      {Object.entries(dialogUserObject).length !== 0 ? (
        <ScheduleDialog
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
      ) : null}
      {clientAHDBVer === serverAHDBVer ? (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{
            padding: theme.spacing(1),
            width: "100%",
            margin: 0,
          }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Accordion
              elevation={theme.palette.paperElevation}
              expanded={userTableExpand}
              onClick={() => handleExpandPanel("userTable")}
              TransitionProps={{
                onEntered: () => handleExpansionComplete("userTable", true),
                onExited: () => handleExpansionComplete("userTable", false),
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  '& .MuiAccordionSummary-content': {
                    paddingTop: 0,
                    paddingBottom: 0,
                    '&.Mui-expanded': {
                      margin: 0,
                    },
                  },
                }}
              >
                <div style={{ display: "flex", width: "100%" }}>
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    style={{ fontSize: 16, fontWeight: "bold", flexGrow: 20 }}
                  >
                    Alarm Handler Users
                  </div>
                  {userTableExpand ? (
                    <Tooltip
                      title={isAlarmAdmin ? "Edit users" : warnAdminMessageEdit}
                      placement="bottom"
                      slotProps={{
                        tooltip: {
                          sx: { maxWidth: 200 }
                        }
                      }}
                    >
                      <div
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          isAlarmAdmin && setEditUsersDialogOpen(true);
                        }}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          size="medium"
                          sx={{ margin: theme.spacing(1) }}
                          startIcon={<AccountCog />}
                          style={{ marginRight: 20 }}
                          disabled={!isAlarmAdmin}
                        >
                          Edit Alarm Users
                        </Button>
                      </div>
                    </Tooltip>
                  ) : null}
                  {userTableExpand ? (
                    <Tooltip
                      title={"Help"}
                      placement="bottom"
                      slotProps={{
                        tooltip: {
                          sx: { maxWidth: 200 }
                        }
                      }}
                    >
                      <div
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setHelpDialogOpen(true);
                        }}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          aria-label="close"
                          color="secondary"
                          sx={{ margin: theme.spacing(1) }}
                          style={{ marginRight: 20 }}
                        >
                          <HelpIcon fontSize="large" />
                        </IconButton>
                      </div>
                    </Tooltip>
                  ) : null}
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    style={{ fontSize: 16, fontWeight: "bold", flexGrow: 1 }}
                  >
                    {userTableExpand ? (
                      <div sx={{
                        position: "relative",
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? alpha(theme.palette.common.white, 0.15)
                            : alpha(theme.palette.common.black, 0.15),
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? alpha(theme.palette.common.white, 0.25)
                              : alpha(theme.palette.common.black, 0.25),
                        },
                        marginLeft: 0,
                        width: "100%",
                        [theme.breakpoints.up("sm")]: {
                          marginLeft: theme.spacing(1),
                          width: "auto",
                        },
                      }}>
                        <div sx={{
                          padding: theme.spacing(0, 2),
                          height: "100%",
                          position: "absolute",
                          pointerEvents: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder="Search user table…"
                          sx={{
                            color: "inherit",
                            '& .MuiInputBase-input': {
                              padding: theme.spacing(1, 1, 1, 0),
                              paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                              transition: theme.transitions.create("width"),
                              width: "100%",
                              [theme.breakpoints.up("sm")]: {
                                width: "20ch",
                                "&:focus": {
                                  width: "30ch",
                                },
                              },
                            },
                          }}
                          inputProps={{ "aria-label": "search" }}
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                          onChange={(event) => handleSearchUserTable(event)}
                          value={userTableSearchStringStore}
                        />
                      </div>
                    ) : (
                      "[click to show]"
                    )}
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
                  emailError={emailError}
                  mobileError={mobileError}
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
              onClick={() => handleExpandPanel("pvList")}
              TransitionProps={{
                onEntered: () => handleExpansionComplete("pvList", true),
                onExited: () => handleExpansionComplete("pvList", false),
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  '& .MuiAccordionSummary-content': {
                    paddingTop: 0,
                    paddingBottom: 0,
                    '&.Mui-expanded': {
                      margin: 0,
                    },
                  },
                }}
              >
                <div style={{ display: "flex", width: "100%" }}>
                  <div
                    style={{ fontSize: 16, fontWeight: "bold", flexGrow: 20 }}
                  >{`Filtered PVs: ${filterName}`}</div>
                  <div
                    style={{ fontSize: 16, fontWeight: "bold", flexGrow: 1 }}
                  >
                    {pvListExpand ? null : "[click to show]"}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {loadPVList && (
                  <PVList
                    alarmPVDict={alarmPVDict}
                    filterUserRegex={filterUserRegex}
                    height={pvListHeight}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
          sx={{
            padding: theme.spacing(1),
            width: "100%",
            margin: 0,
          }}
        >
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: theme.spacing(2),
                margin: 0,
                height: "100%",
                overflowX: "default",
                overflowY: "default",
              }}
              elevation={theme.palette.paperElevation}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Alarm Handler database version is not current. Please prune the
                database and restart the Alarm Handler server.
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default React.memo(UserNotification);
