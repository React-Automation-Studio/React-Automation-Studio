
import { useContext, useCallback, useEffect, useRef } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
const useMongoDbUpdateMany = (props) => {

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


    const dbUpdateMany = useCallback((props) => {

        if (props.dbURL && (props.update || props.aggregation)) {

           
            socketRef.current.emit('databaseUpdateMany', { dbURL: props.dbURL, 'query': props.query, 'newvalues': props?.update,'aggregation':props?.aggregation, 'clientAuthorisation': jwtRef.current }, (data) => {
  
            if (data !== "OK") {

                console.log("updateOne  unsuccessful")
            }
        });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (dbUpdateMany);
   
}
export default useMongoDbUpdateMany
