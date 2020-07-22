import React, {useReducer,useContext,useState, useEffect } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';

const useMongoDbWatch= (dbURL) =>{

    const context=useContext(AutomationStudioContext);
    const [dbWatchId,setDbWatchId]=useState(null);
    const [data,setData]=useState(null);
    const [writeAccess,setWriteAccess]=useState(false);
    useEffect(()=>{
        const handleDatabaseReadWatchAndBroadcastAck = (msg) => {
            //console.log(msg)
            if (typeof msg !== 'undefined') {
                setDbWatchId(msg.dbWatchId)
            }
        }
        const handleNewDbLogReadWatchBroadcast=(msg) =>{
            //console.log(msg)
            const newData = JSON.parse(msg.data);
            setData(newData);
            setWriteAccess(msg.write_access) 
        }
  
    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    if(dbURL){  
    socket.emit('databaseReadWatchAndBroadcast', { 'dbURL':dbURL, 'clientAuthorisation': jwt },handleDatabaseReadWatchAndBroadcastAck)
    socket.on('databaseWatchData:' + dbURL, handleNewDbLogReadWatchBroadcast);
    }

    return () => {
        
        if(dbURL){
        if (dbWatchId !== null) {
            socket.emit('remove_dbWatch', { dbURL: dbURL, dbWatchId: dbWatchId, 'clientAuthorisation': jwt });
        }
        socket.removeListener('databaseWatchData:' + dbURL, handleNewDbLogReadWatchBroadcast);
    }
    
    }
    
}
    ,[dbURL])
   
    return({data:data,writeAccess:writeAccess,dbURl:dbURL})
} 
export default useMongoDbWatch