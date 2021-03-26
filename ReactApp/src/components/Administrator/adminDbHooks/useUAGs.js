import { useContext, useState, useEffect, useRef } from 'react';
import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import { v4 as uuidv4 } from 'uuid';

const useUAGs = (props) => {

    const context = useContext(AutomationStudioContext);
    const socket = context.socket;
    const jwt = context.userTokens.accessToken;
    const jwtRef = useRef(jwt);
    const socketRef = useRef(socket);
    const dbWatchIdRef=useRef(null)
    useEffect(() => {
        if (jwt === null) {
            jwtRef.current = 'unauthenticated'
        }
        else {
            jwtRef.current = jwt;
        }
    }, [jwt])
    useEffect(() => {

        socketRef.current = socket;
    }, [socket])

    const [dbWatchId, setDbWatchId] = useState(null);
    const [userGroups, setUserGroups] = useState(null);
    const [userGroupsId, setUserGroupsId] = useState(null);
    const [writeAccess, setWriteAccess] = useState(false);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        dbWatchIdRef.current=uuidv4();
        const handleAdminWatchUAGsAck = (msg) => {

            // if (msg?.dbWatchId) {
            //     setDbWatchId(msg.dbWatchId)
            // }
        }
        const handleAdminWatchUAGsReadWatchBroadcast = (msg) => {

            const newData = JSON.parse(msg.data);
            setUserGroups(newData[0]['userGroups']);
            setUserGroupsId(newData[0]['_id']['$oid']);
            setInitialized(true)
            setWriteAccess(msg.write_access)
        }


        
            socketRef.current.emit('adminWatchUAGs', { 'clientAuthorisation': jwtRef.current,dbWatchId:dbWatchIdRef.current }, handleAdminWatchUAGsAck)
            socketRef.current.on('databaseWatchData:adminWatchUAGs',  handleAdminWatchUAGsReadWatchBroadcast);
       
        const reconnect = () => {
            dbWatchIdRef.current=uuidv4();
            socketRef.current.emit('adminWatchUAGs', { 'clientAuthorisation': jwtRef.current,dbWatchId:dbWatchIdRef.current }, handleAdminWatchUAGsAck)
        }
        const disconnect = () => {
           
                setInitialized(false);
                setUserGroups(null);
            setUserGroupsId(null);
          
        }
        socketRef.current.on('disconnect', disconnect);
        socketRef.current.on('connect', reconnect);
        return () => {

                if (dbWatchIdRef.current !== null) {
                    console.log("removing watch",dbWatchIdRef.current,"adminWatchUAGs")
                    socketRef.current.emit('remove_dbWatch', { dbURL: 'adminWatchUAGs', dbWatchId: dbWatchIdRef.current, 'clientAuthorisation': jwtRef.current });
                }
                socketRef.current.removeListener('databaseWatchData:adminWatchUAGs', handleAdminWatchUAGsReadWatchBroadcast);
                socketRef.current.removeListener('connect', reconnect);
                socketRef.current.removeListener('disconnect', disconnect);
          

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ({ userGroups: userGroups, writeAccess: writeAccess, initialized: initialized})
}



export default useUAGs