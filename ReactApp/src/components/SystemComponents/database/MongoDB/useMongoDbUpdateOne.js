
import { useContext, useCallback } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
const useMongoDbUpdateOne = (props) => {

    const { socket } = useContext(AutomationStudioContext);

    const dbUpdateOne = useCallback((props) => {

        if (props.dbURL && props.update&&props.id) {

            let jwt = JSON.parse(localStorage.getItem('jwt'));
            if (jwt === null) {
                jwt = 'unauthenticated'
            }
  
                    socket.emit('databaseUpdateOne', { dbURL: props.dbURL, 'id': props.id, 'newvalues': props.update, 'clientAuthorisation': jwt }, (data) => {
  
            if (data !== "OK") {

                console.log("updateOne  unsuccessful")
            }
        });
        }
    }, [])
    return (dbUpdateOne);
   
}
export default useMongoDbUpdateOne
