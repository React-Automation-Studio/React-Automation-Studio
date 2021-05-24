
import { useContext, useCallback,useRef,useEffect } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
const useMongoDbUpdateOne = (props) => {
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

    const dbUpdateOne = useCallback((props) => {

        if (props.dbURL && props.update&&props.id) {

           
            socketRef.current.emit('databaseUpdateOne', { dbURL: props.dbURL, 'id': props.id, 'newvalues': props.update, 'clientAuthorisation': jwtRef.current }, (data) => {
  
            if (data !== "OK") {

                console.log("updateOne  unsuccessful")
            }
        });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (dbUpdateOne);
   
}
export default useMongoDbUpdateOne
