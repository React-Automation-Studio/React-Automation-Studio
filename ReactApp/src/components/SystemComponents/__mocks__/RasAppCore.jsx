import {useMemo} from 'react';
import AutomationStudioContext from '../AutomationStudioContext';


const RasAppCore = (props) => {
    const {socket, userData, children, pvServerUrl} = props;
    
    const system = useMemo(() => ({
        socket,
        pvServerUrl,
        userData: userData ?? {
            username: "",
            roles: [],
            loggedIn: false,
            loggingIn: false,
        },
        userTokens: {
            accessToken: userData?.loggedIn ? "TEST-USER-TOKEN" : "unauthenticated"
        },
        refreshTokenConfig: {},        
    }), [socket, userData]);

    return (
        <AutomationStudioContext.Provider value={system}>
            {children}
        </AutomationStudioContext.Provider>
    )
}


export default RasAppCore;
