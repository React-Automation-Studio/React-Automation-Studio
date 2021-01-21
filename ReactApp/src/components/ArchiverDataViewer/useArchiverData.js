import  React,{useContext,  useState, useEffect } from 'react';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';



const useArchiverData = (props) => {
  
    const context = useContext(AutomationStudioContext);
    const [dbWatchId, setDbWatchId] = useState(null);
    const [data, setData] = useState(null);
    const [writeAccess, setWriteAccess] = useState(false);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        const handleArchiverReadAck = (msg) => {
         
            if (typeof msg !== 'undefined') {
                setDbWatchId(msg.dbWatchId)
            }
        }
        const handleArchiverReadData = (msg) => {
           // console.log(msg.data)
            //const newData = JSON.parse(msg.data);
            setData(msg.data);
            setInitialized(true)
            setWriteAccess(msg.write_access)
        }

      
        let socket = context.socket;
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }
        if (props.archiverURL) {
            socket.emit('archiverRead', { 'archiverURL': props.archiverURL, 'clientAuthorisation': jwt }, handleArchiverReadAck)
            socket.on('archiverReadData:' + props.archiverURL, handleArchiverReadData);
        }

        const reconnect = () => {
            if (props.archiverURL) {
                socket.emit('archiverRead', { 'archiverURL': props.archiverURL, 'clientAuthorisation': jwt }, handleArchiverReadAck)
            }
        }
        const disconnect = () => {
            if (props.archiverURL) {
                setInitialized(false);
                setData(null)
            }
        }
        socket.on('disconnect', disconnect);
        socket.on('connect', reconnect);
        return () => {

            if (props.archiverURL) {
                if (dbWatchId !== null) {
                    socket.emit('remove_dbWatch', { archiverURL: props.archiverURL, dbWatchId: dbWatchId, 'clientAuthorisation': jwt });
                }
                socket.removeListener('databaseWatchData:' + props.archiverURL, handleArchiverReadData);
                socket.removeListener('connect', reconnect);
                socket.removeListener('disconnect', disconnect);
            }

        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.archiverURL])

    return ({ data: data, writeAccess: writeAccess,initialized:initialized, archiverURL: props.archiverURL })
    
}


  
export default useArchiverData
