
import { useContext, useCallback,useRef,useEffect,useState } from 'react';
import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';
const useModifyUser = (props) => {
    const context=useContext(AutomationStudioContext);
    const [error,setError]=useState(false);
    const [userModified,setUserModified]=useState(false);
    const socket = context.socket;
    const jwt = context.userTokens.accessToken;
    const jwtRef = useRef(jwt);
    const socketRef = useRef(socket);
    useEffect(()=>{
      setError(false)
      setUserModified(false)
    },[props.username,props.passsword,props.email,props.phoneNumber,props.givenName,props.familyName,props.officeLocation])
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
    const modifyUser = useCallback((props) => {
      console.log(props)
        if ( props.id) {

            console.log(props)
            setError(false)
            socketRef.current.emit('ModifyUser', {...props , 'clientAuthorisation': jwtRef.current }, (data) => {
  
            if (data !== "OK") {
                setError(true)
                setUserModified(false)
                console.log("ModifyUser  unsuccessful")
            }
            else{
              setUserModified(true)
            }

        });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return ({modifyUser:modifyUser,modifyUserError:error,userModified:userModified});
   
}
export default useModifyUser
