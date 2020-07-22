import React, { useReducer, useContext, useState, useEffect, useCallback } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';

const useMongoDbInsertOne = (props) => {

    const context = useContext(AutomationStudioContext);

    const memoizedReducer = useCallback((state, action) => {
        let socket = context.socket;
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }
        console.log("insertone")
        socket.emit('databaseInsertOne', { dbURL: action.dbURL,'newEntry': action.newEntry, 'clientAuthorisation': jwt }, (data) => {
            console.log("ackdata", data);
            if (data !== "OK") {

                console.log("InsertOne  unsuccessful")
            }
        });

    },[])
    const [state, dispatch] = useReducer(memoizedReducer, {});
    return (dispatch)
}
export default useMongoDbInsertOne