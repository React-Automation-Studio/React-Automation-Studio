import { useContext, useState, useEffect, useRef } from 'react';
import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';
import { v4 as uuidv4 } from 'uuid';

const useUserDetails = (props) => {

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

    
    const [data, setData] = useState({});
    const [writeAccess, setWriteAccess] = useState(false);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        dbWatchIdRef.current=uuidv4();
        const handleUserDetailsAck = (msg) => {

            // if (msg?.dbWatchId) {
            //     setDbWatchId(msg.dbWatchId)
            // }
        }
        const handleUserDetailsReadWatchBroadcast = (msg) => {

            const newData = JSON.parse(msg.data);
            const userData=newData[0]
            if (userData){
            setData(userData);
            setInitialized(true)
            setWriteAccess(msg.write_access)
            }
        }
        const reconnect = () => {
          dbWatchIdRef.current=uuidv4();
          socketRef.current.emit('UserDetailsWatch', {username:props.username,'clientAuthorisation': jwtRef.current,dbWatchId:dbWatchIdRef.current }, handleUserDetailsAck)
      }
      const disconnect = () => {
         
              setInitialized(false);
              setData(null)
        
      }
        console.log(props.username)  
        if (props.username){
            socketRef.current.emit('UserDetailsWatch', {username:props.username,'clientAuthorisation': jwtRef.current,dbWatchId:dbWatchIdRef.current }, handleUserDetailsAck)
            socketRef.current.on('databaseWatchData:UserDetailsWatch:'+props.username,  handleUserDetailsReadWatchBroadcast);
            socketRef.current.on('disconnect', disconnect);
            socketRef.current.on('connect', reconnect);
        }
       
        
        return () => {
                if (props.username){
                if (dbWatchIdRef.current !== null) {
             //       console.log("removing watch",dbWatchIdRef.current,"UserDetailsWatch")
                    socketRef.current.emit('remove_dbWatch', { dbURL: 'UserDetailsWatch', dbWatchId: dbWatchIdRef.current, 'clientAuthorisation': jwtRef.current });
                }
                socketRef.current.removeListener('databaseWatchData:UserDetailsWatch', handleUserDetailsReadWatchBroadcast);
                socketRef.current.removeListener('connect', reconnect);
                socketRef.current.removeListener('disconnect', disconnect);
              }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.username])

    return ({ userData: data,  initialized: initialized})
}



export default useUserDetails