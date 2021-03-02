import { useContext, useCallback,useRef,useEffect } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
export const useMongoDbInsertOne = (props) => {

    const context=useContext(AutomationStudioContext);
    const socket = context.socket;
    const jwt = context.userTokens.accessToken;
    const jwtRef = useRef(jwt);
    const socketRef = useRef(socket);
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

    const dbInsertOne = useCallback((props) => {

        if (props.dbURL && props.newEntry) {

           
            
            socketRef.current.emit('databaseInsertOne', { dbURL: props.dbURL, 'newEntry': props.newEntry, 'clientAuthorisation': jwtRef.current }, (data) => {
                console.log("ackdata", data);
                if (data !== "OK") {

                    console.log("InsertOne  unsuccessful")
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (dbInsertOne);
   
}


export default useMongoDbInsertOne