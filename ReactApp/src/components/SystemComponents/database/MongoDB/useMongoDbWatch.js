import { useContext, useState, useEffect, useRef } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
import { v4 as uuidv4 } from 'uuid';

const useMongoDbWatch = (props) => {
    
    const context = useContext(AutomationStudioContext);
    const socket = context.socket;
    const jwt = context.userTokens.accessToken;
    const jwtRef = useRef(jwt);
    const socketRef = useRef(socket);
    const dbWatchIdRef=useRef(null)
    const {dbURL} = props
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

    // const [dbWatchId, setDbWatchId] = useState(null);
    const [data, setData] = useState(null);
    const [writeAccess, setWriteAccess] = useState(false);

    const [initialized, setInitialized] = useState(false);

    // useEffect(()=>{
    //     dbWatchIdRef.current=dbWatchId;
    // },[dbWatchId])
    useEffect(() => {
        console.log(dbURL)
        dbWatchIdRef.current=uuidv4();
        const handleDatabaseReadWatchAndBroadcastAck = (msg) => {
            console.log("ack",msg)
            // if (msg?.dbWatchId) {
            //     setDbWatchId(msg.dbWatchId)
            // }
        }
        const handleNewDbLogReadWatchBroadcast = (msg) => {

            const newData = JSON.parse(msg.data);
            console.log(msg)
            // if (msg?.dbWatchId) {
            //     setDbWatchId(msg.dbWatchId)
            // }
            setData(newData);
            setInitialized(true)
            setWriteAccess(msg.write_access)
        }


        if (dbURL) {
            socketRef.current.emit('databaseReadWatchAndBroadcast', { 'dbURL': dbURL,dbWatchId:dbWatchIdRef.current, 'clientAuthorisation': jwtRef.current }, handleDatabaseReadWatchAndBroadcastAck)
            socketRef.current.on('databaseWatchData:' + dbURL, handleNewDbLogReadWatchBroadcast);
        }

        const reconnect = () => {
            if (dbURL) {
                console.log("reconnect")
                dbWatchIdRef.current=uuidv4();
                socketRef.current.emit('databaseReadWatchAndBroadcast', { 'dbURL': dbURL,dbWatchId:dbWatchIdRef.current, 'clientAuthorisation': jwtRef.current }, handleDatabaseReadWatchAndBroadcastAck)
            }
        }
        const disconnect = () => {
            if (dbURL) {
                setInitialized(false);
                setData(null)
            }
        }
        socketRef.current.on('disconnect', disconnect);
        socketRef.current.on('connect', reconnect);
        return () => {
            
           
                if (dbWatchIdRef.current !== null) {
                    console.log("removing watch id",dbWatchIdRef.current)
                    socketRef.current.emit('remove_dbWatch', { dbURL: dbURL, dbWatchId: dbWatchIdRef.current, 'clientAuthorisation': jwtRef.current });
                }
                else{
                    console.log("return null")
                }
                socketRef.current.removeListener('databaseWatchData:' + dbURL, handleNewDbLogReadWatchBroadcast);
                socketRef.current.removeListener('connect', reconnect);
                socketRef.current.removeListener('disconnect', disconnect);
          

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbURL])

    return ({ data: data, writeAccess: writeAccess, initialized: initialized, dbURl: dbURL })
}



export default useMongoDbWatch