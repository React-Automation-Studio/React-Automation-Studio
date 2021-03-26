import { useContext, useState, useEffect, useRef } from 'react';
import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import { v4 as uuidv4 } from 'uuid';

const useAllUsers = (props) => {

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
    const [data, setData] = useState(null);
    const [writeAccess, setWriteAccess] = useState(false);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        dbWatchIdRef.current=uuidv4();
        const handleAdminAllUsersAck = (msg) => {

            // if (msg?.dbWatchId) {
            //     setDbWatchId(msg.dbWatchId)
            // }
        }
        const handleAdminAllUsersReadWatchBroadcast = (msg) => {

            const newData = JSON.parse(msg.data);
            setData(newData);
            setInitialized(true)
            setWriteAccess(msg.write_access)
        }


        
            socketRef.current.emit('adminAllUsers', { 'clientAuthorisation': jwtRef.current,dbWatchId:dbWatchIdRef.current }, handleAdminAllUsersAck)
            socketRef.current.on('databaseWatchData:adminAllUsers',  handleAdminAllUsersReadWatchBroadcast);
       
        const reconnect = () => {
            dbWatchIdRef.current=uuidv4();
            socketRef.current.emit('adminAllUsers', { 'clientAuthorisation': jwtRef.current,dbWatchId:dbWatchIdRef.current }, handleAdminAllUsersAck)
        }
        const disconnect = () => {
           
                setInitialized(false);
                setData(null)
          
        }
        socketRef.current.on('disconnect', disconnect);
        socketRef.current.on('connect', reconnect);
        return () => {

                if (dbWatchIdRef.current !== null) {
                    console.log("removing watch",dbWatchIdRef.current,"adminAllUsers")
                    socketRef.current.emit('remove_dbWatch', { dbURL: 'adminAllUsers', dbWatchId: dbWatchIdRef.current, 'clientAuthorisation': jwtRef.current });
                }
                socketRef.current.removeListener('databaseWatchData:adminAllUsers', handleAdminAllUsersReadWatchBroadcast);
                socketRef.current.removeListener('connect', reconnect);
                socketRef.current.removeListener('disconnect', disconnect);
          

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ({ data: data, writeAccess: writeAccess, initialized: initialized})
}



export default useAllUsers