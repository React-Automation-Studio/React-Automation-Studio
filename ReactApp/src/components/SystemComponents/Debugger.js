
import React, {useContext,useEffect} from 'react';
import AutomationStudioContext from './AutomationStudioContext';
const Debugger=(props)=>{
    const context=useContext(AutomationStudioContext)
    
    console.log("loggedin:"+props.id,context.userData.loggedIn)
    return (<div/>)
}
export default Debugger;  