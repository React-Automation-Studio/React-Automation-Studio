import { useContext, useCallback } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
export const useMongoDbInsertOne = (props) => {

    const { socket } = useContext(AutomationStudioContext);

    const dbInsertOne = useCallback((props) => {

        if (props.dbURL && props.newEntry) {

            let jwt = JSON.parse(localStorage.getItem('jwt'));
            if (jwt === null) {
                jwt = 'unauthenticated'
            }
            
            socket.emit('databaseInsertOne', { dbURL: props.dbURL, 'newEntry': props.newEntry, 'clientAuthorisation': jwt }, (data) => {
                console.log("ackdata", data);
                if (data !== "OK") {

                    console.log("InsertOne  unsuccessful")
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (dbInsertOne);
   
}


export default useMongoDbInsertOne