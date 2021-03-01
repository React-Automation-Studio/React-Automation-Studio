
import React, {useContext,useEffect} from 'react';
import AutomationStudioContext from './AutomationStudioContext';
const Debugger=(props)=>{
    const context=useContext(AutomationStudioContext)
    const newjwt = context.userTokens.accessToken;
    useEffect(()=>{
        const reconnect=()=>{
         const jwt = context.userTokens.accessToken;
         console.log("useEffect jwt",jwt)
        }
      reconnect();
      return ()=>{
       
      }
    },[newjwt])
    console.log("newJwt",newjwt)
    return (<div/>)
}
export default Debugger;  