import React, { useState, useContext, useEffect, useRef } from "react";
import ReactAutomationStudioContext from "./AutomationStudioContext";
import Typography from "@mui/material/Typography";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export type EpicsPVType = {
  editMode?: boolean;
  initialized: boolean;
  pvname: string;
  value: number | string;
  severity: string | undefined;
  timestamp: string | undefined;
  metadata: {
    initialized: boolean;
    pvname: string;
    value: string;
    char_value: string;
    alarmColor: string;
    lower_disp_limit: string;
    upper_disp_limit: string;
    lower_warning_limit: string;
    upper_warning_limit: string;
    units: string;
    precision: number;
    enum_strs: string[];
    write_access: boolean;
  };
};



export const useEpicsPV = (props) => {
  const { editMode = false } = props;

  const [pv, setPv] = useState<EpicsPVType>(() => {
    let pvname = props.pv;
    if (props.macros) {
      let macro;
      for (macro in props.macros) {
        pvname = pvname.replace(
          macro.toString(),
          props.macros[macro].toString()
        );
      }
    }
    if (pvname.includes("pva://")) {
      console.info(
        "It is no longer necessary to provide the prefix `pva://` for EPICS V3 PVs.\n Perform a global text replace to update.\n For convenience the `pva://` prefix is automatically removed when displayed\n and will be deprecated in a future release",
        pvname
      );
      pvname = pvname.replace("pva://", "");
    }
    let pv = {
      initialized: false,
      pvname: pvname,
      value: props.useStringValue?"":0,
      severity: undefined,
      timestamp: undefined,
      metadata: {
        initialized: false,
        pvname: "",
        value: "",
        char_value: "",
        alarmColor: "",
        lower_disp_limit: "",
        upper_disp_limit: "",
        lower_warning_limit: "",
        upper_warning_limit: "",
        units: "",
        precision: 0,
        enum_strs: [],
        write_access: false,
      },
    };

    return pv;
  });
  const pvName = pv.pvname;

  const [pvConnectionId] = useState(null);


  const context = useContext(ReactAutomationStudioContext);
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    if (!editMode) {
      if (props.makeNewSocketIoConnection === true) {
        let newSocket = io(context.pvServerUrl ?? "/pvServer", {
          transports: ["websocket"],
          forceNew: true,
        });
        console.log("make new socket");
        setSocket(newSocket);
      } else {
        setSocket(context.socket);
      }
    }
  }, [props.makeNewSocketIoConnection, context.socket, context.pvServerUrl, editMode]);

  const jwt = context.userTokens.accessToken;
  const jwtRef = useRef(jwt);
  const socketRef = useRef(socket);
  useEffect(() => {
    if (jwt === null) {
      jwtRef.current = "unauthenticated";
    } else {
      jwtRef.current = jwt;
    }
  }, [jwt]);

  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);
  const pvConnectionIdRef = useRef<any>(pvConnectionId);

  useEffect(() => {
    const updatePVData = (msg) => {
      if (msg.connected === "0") {
        setPv((pv) => ({ ...pv, initialized: false }));
      } else {
        if (msg.newmetadata === "False") {
          setPv((pv) => ({
            ...pv,
            value: props.useStringValue === true ? msg.char_value : msg.value,
            severity: msg.severity,
            timestamp: msg.timestamp,
          }));
        } else {
          setPv((pv: EpicsPVType) => ({
            ...pv,
            value: props.useStringValue === true ? msg.char_value : msg.value,
            severity: msg.severity,
            timestamp: msg.timestamp,
            initialized: true,
            metadata: {
              initialized: true,
              pvname: msg.pvname,
              value: msg.value,
              char_value: msg.char_value,
              alarmColor: "",
              enum_strs: msg.enum_strs,
              lower_disp_limit: msg.lower_disp_limit,
              upper_disp_limit: msg.upper_disp_limit,
              lower_warning_limit: msg.lower_warning_limit,
              upper_warning_limit: msg.upper_warning_limit,
              lower_ctrl_limit: msg.lower_ctrl_limit,
              upper_ctrl_limit: msg.upper_ctrl_limit,
              units: msg.units,
              precision: parseInt(msg.precision),
              severity: msg.severity,
              write_access: msg.write_access,
              read_access: msg.read_access,
              host: msg.host,
            },
          }));
        }
      }
    };
    const connectError = () => {
      if (props.debug) {
        console.log(pv.pvname, "client: connect_error");
      }
      setPv((pv) => ({ ...pv, initialized: false }));
    };

    const disconnect = () => {
      if (props.debug) {
        console.log(pv.pvname, "client: disconnected");
      }
      setPv((pv) => ({ ...pv, initialized: false }));
    };


    if (!editMode && socket) {

      pvConnectionIdRef.current = uuidv4();
      socketRef.current.emit("request_pv_info", {
        data: pv.pvname,
        useBinaryValue: props.useBinaryValue ? true : false,
        pvConnectionId: pvConnectionIdRef.current,
        clientAuthorisation: jwtRef.current,
      });
      socketRef.current.on(pv.pvname, updatePVData);
      socketRef.current.on("connect_error", connectError);
      socketRef.current.on("disconnect", disconnect);
    }

    return () => {
      if (!editMode && socket) {
        if (pvConnectionIdRef.current !== null) {
          socketRef.current.emit("remove_pv_connection", {
            pvname: pv.pvname,
            pvConnectionId: pvConnectionIdRef.current,
            clientAuthorisation: jwtRef.current,
          });
        }
        socketRef.current.removeListener(pv.pvname, updatePVData);
        socketRef.current.removeListener("connect_error", connectError);
        socketRef.current.removeListener("disconnect", disconnect);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pvName, socket, editMode]);

  useEffect(() => {
    const reconnect = () => {
      if (props.debug) {
        console.log(pv.pvname, "client: reconnect");
      }

      pvConnectionIdRef.current = uuidv4();
      if (socket) {
        socketRef.current.emit("request_pv_info", {
          data: pv.pvname,
          useBinaryValue: props.useBinaryValue ? true : false,
          pvConnectionId: pvConnectionIdRef.current,
          clientAuthorisation: jwtRef.current,
        });
      }
    };
    if (!editMode && socket) {
      socketRef.current.on("connect", reconnect);
    }

    return () => {
      if (!editMode &&  socket) {
        socketRef.current.removeListener("connect", reconnect);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pvName, socket, editMode]);
  useEffect(() => {
    if (!editMode && props.newValueTrigger > 0) {
      socketRef.current.emit("write_to_pv", {
        pvname: pv.pvname,
        data: props.outputValue,
        clientAuthorisation: jwtRef.current,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newValueTrigger,editMode]);

  return pv;
};


/**
 * The EpicsPV  component handles connections to EPICS process variables.
 * This is done by defining the pv name in the pv prop and using a prefix to define protocol ie "pva://" for EPICS .
 * The EpicsPV component also performs macro substitution on the pv prop using the macros prop.
 * The pv state can be raised as an object using the pvData callback or passed to child function component. All the data in this pv object is valid when pv.initialized===true
 *
 * A hook called `useEpicsPV` is also exported which returns the pv object.
 *
 *
 *
 *
 *
 **/
const EpicsPV = ({
  debug = false,
  makeNewSocketIoConnection = false,
  useBinaryValue = false,
  editMode = false,
  ...props
}: EpicsPVProps) => {
  const pv = useEpicsPV({
    editMode: editMode,
    debug: debug,
    makeNewSocketIoConnection: makeNewSocketIoConnection,
    useBinaryValue: useBinaryValue,
    ...props,
  });
  useEffect(() => {
    if (props.pvData) {
      props.pvData(pv);
    }
  }, [pv, props.pvData]);
  if (debug) {
    console.log(`EpicsPV ${props.pv}:`, { props, pv });
  }
  return (
    <React.Fragment>
      {debug && (
        <Typography>
          {"PV name: " + pv.pvname}
          {"Value: " + pv.value}
        </Typography>
      )}
    </React.Fragment>
  );
};

/**
 * Props interface for the EpicsPV component.
 */
interface EpicsPVProps {
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug?: boolean;
  /** PV is in edit mode */
  editMode?: boolean;
  /**
   * If defined, then the DataConnection  will be over a new socketIO  connection, otherwise the global socketIO connection
   */
  makeNewSocketIoConnection?: boolean;

  /**
   * when writing to the  pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */
  newValueTrigger?: number;
  /**
   * the output value to the process variable. It is only emitted once the newValueTrigger is incremented.
   */
  outputValue?: any;

  /** Name of the process variable,  eg. '$(device):test$(id)'*/

  pv?: string;

  /** A function that returns the pv object */

  pvData?: (pv: EpicsPVType) => void;

  /**
   * Directive to use PV's string values.
   */
  useStringValue?: boolean;
  /**
   * Directive to use numpy binary value of the PV value.
   */
  useBinaryValue?: boolean;
}

export default EpicsPV;
