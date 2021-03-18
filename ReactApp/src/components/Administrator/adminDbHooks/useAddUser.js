
import { useContext, useCallback,useRef,useEffect, useState } from 'react';
import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
const useAddUSer = (props) => {
    const context=useContext(AutomationStudioContext);
    const socket = context.socket;
    const jwt = context.userTokens.accessToken;
    const jwtRef = useRef(jwt);
    const socketRef = useRef(socket);
    const {submit}=props;
    const {user}=props;
    const {username}=user;
    const [duplicateUser,setDuplicateUser]=useState(false)
    const [userAdded,setUserAdded]=useState(false)
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

    useEffect(()=>{

        if (submit) {

           
            socketRef.current.emit('adminAddUser', { user:props.user, 'clientAuthorisation': jwtRef.current }, (data) => {
  
            if (data !== "OK") {
              if (data==="Error: Username Exists"){
                setDuplicateUser(true)
                setUserAdded(false)
              }
                console.log("add user failed")

            }
            else{
              setDuplicateUser(false)
                setUserAdded(true)
            }
        });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[submit])
    useEffect(()=>{
      setDuplicateUser(false)
    },[username])
     
    
    
    return {userAdded:userAdded,duplicateUser:duplicateUser};
   
}
export default useAddUSer
