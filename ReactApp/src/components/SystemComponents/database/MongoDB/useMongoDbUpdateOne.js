import React, { useReducer, useContext, useCallback } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';

const useMongoDbUpdateOne = (props) => {

    const context = useContext(AutomationStudioContext);
    const memoizedReducer = useCallback((state, action) => {
        let socket = context.socket;
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }
        socket.emit('databaseUpdateOne', { dbURL: action.dbURL, 'id': action.id, 'newvalues': action.newValues, 'clientAuthorisation': jwt }, (data) => {
            console.log("ackdata", data);
            if (data !== "OK") {

                console.log("updateOne  unsuccessful")
            }
        });

    },[])
    const [state, dispatch] = useReducer(memoizedReducer, {});
    return ([dispatch])
}
export default useMongoDbUpdateOne