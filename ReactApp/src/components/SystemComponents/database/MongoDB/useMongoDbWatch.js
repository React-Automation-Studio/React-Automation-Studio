import { useContext, useState, useEffect, useRef } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';


const useMongoDbWatch = (props) => {

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

    useEffect(()=>{
        dbWatchIdRef.current=dbWatchId;
    },[dbWatchId])
    useEffect(() => {
        const handleDatabaseReadWatchAndBroadcastAck = (msg) => {

            if (msg?.dbWatchId) {
                setDbWatchId(msg.dbWatchId)
            }
        }
        const handleNewDbLogReadWatchBroadcast = (msg) => {

            const newData = JSON.parse(msg.data);
            setData(newData);
            setInitialized(true)
            setWriteAccess(msg.write_access)
        }


        if (props.dbURL) {
            socketRef.current.emit('databaseReadWatchAndBroadcast', { 'dbURL': props.dbURL, 'clientAuthorisation': jwtRef.current }, handleDatabaseReadWatchAndBroadcastAck)
            socketRef.current.on('databaseWatchData:' + props.dbURL, handleNewDbLogReadWatchBroadcast);
        }

        const reconnect = () => {
            if (props.dbURL) {
                socketRef.current.emit('databaseReadWatchAndBroadcast', { 'dbURL': props.dbURL, 'clientAuthorisation': jwtRef.current }, handleDatabaseReadWatchAndBroadcastAck)
            }
        }
        const disconnect = () => {
            if (props.dbURL) {
                setInitialized(false);
                setData(null)
            }
        }
        socketRef.current.on('disconnect', disconnect);
        socketRef.current.on('connect', reconnect);
        return () => {

            if (props.dbURL) {
                if (dbWatchIdRef.current !== null) {
                    socketRef.current.emit('remove_dbWatch', { dbURL: props.dbURL, dbWatchId: dbWatchIdRef.current, 'clientAuthorisation': jwtRef.current });
                }
                socketRef.current.removeListener('databaseWatchData:' + props.dbURL, handleNewDbLogReadWatchBroadcast);
                socketRef.current.removeListener('connect', reconnect);
                socketRef.current.removeListener('disconnect', disconnect);
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.dbURL])

    return ({ data: data, writeAccess: writeAccess, initialized: initialized, dbURl: props.dbURL })
}



export default useMongoDbWatch