
import { useContext, useCallback,useRef,useEffect,useState } from 'react';
import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';

const useDeleteUser = (props) => {
    const context=useContext(AutomationStudioContext);
    const [error,setError]=useState(false);
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

      const deleteUser = useCallback((props) => {
        if ( props.id) {
          console.log(props)
          setError(false)
          socketRef.current.emit('adminDeleteUser', {'id': props.id, 'clientAuthorisation': jwtRef.current }, (data) => {
            if (data !== "OK") {
              setError(true)
              console.log("adminDeleteUser  unsuccessful")
            }
          });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return ({deleteUser:deleteUser,deleteUserError:error});   
}

export default useDeleteUser
