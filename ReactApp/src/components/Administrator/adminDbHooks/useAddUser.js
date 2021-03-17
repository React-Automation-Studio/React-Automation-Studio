
import { useContext, useCallback,useRef,useEffect } from 'react';
import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
const useAddUSer = (props) => {
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

    const adminAddUser = useCallback((props) => {
        console.log(props)
        if (props.submit) {

           
            socketRef.current.emit('adminAddUser', { user:props.user, 'clientAuthorisation': jwtRef.current }, (data) => {
  
            if (data !== "OK") {

                console.log("add user failed")
            }
        });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (adminAddUser);
   
}
export default useAddUSer
