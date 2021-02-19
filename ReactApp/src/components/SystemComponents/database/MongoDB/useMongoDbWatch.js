import  { useContext, useState, useEffect } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';


const useMongoDbWatch = (props) => {

    const context = useContext(AutomationStudioContext);
    const [dbWatchId, setDbWatchId] = useState(null);
    const [data, setData] = useState(null);
    const [writeAccess, setWriteAccess] = useState(false);
    const [initialized, setInitialized] = useState(false);
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

      
        let socket = context.socket;
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }
        if (props.dbURL) {
            socket.emit('databaseReadWatchAndBroadcast', { 'dbURL': props.dbURL, 'clientAuthorisation': jwt }, handleDatabaseReadWatchAndBroadcastAck)
            socket.on('databaseWatchData:' + props.dbURL, handleNewDbLogReadWatchBroadcast);
        }

        const reconnect = () => {
            if (props.dbURL) {
                socket.emit('databaseReadWatchAndBroadcast', { 'dbURL': props.dbURL, 'clientAuthorisation': jwt }, handleDatabaseReadWatchAndBroadcastAck)
            }
        }
        const disconnect = () => {
            if (props.dbURL) {
                setInitialized(false);
                setData(null)
            }
        }
        socket.on('disconnect', disconnect);
        socket.on('connect', reconnect);
        return () => {

            if (props.dbURL) {
                if (dbWatchId !== null) {
                    socket.emit('remove_dbWatch', { dbURL: props.dbURL, dbWatchId: dbWatchId, 'clientAuthorisation': jwt });
                }
                socket.removeListener('databaseWatchData:' + props.dbURL, handleNewDbLogReadWatchBroadcast);
                socket.removeListener('connect', reconnect);
                socket.removeListener('disconnect', disconnect);
            }

        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.dbURL])

    return ({ data: data, writeAccess: writeAccess,initialized:initialized, dbURl: props.dbURL })
}


  
export default useMongoDbWatch