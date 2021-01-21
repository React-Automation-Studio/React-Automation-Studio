
import { useContext, useCallback } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
const useMongoDbDeleteOne = (props) => {

    const { socket } = useContext(AutomationStudioContext);

    const dbDeleteOne = useCallback((props) => {

        if (props.dbURL && props.id) {

            let jwt = JSON.parse(localStorage.getItem('jwt'));
            if (jwt === null) {
                jwt = 'unauthenticated'
            }
  
                    socket.emit('databaseDeleteOne', { dbURL: props.dbURL, 'id': props.id, 'clientAuthorisation': jwt }, (data) => {
  
            if (data !== "OK") {

                console.log("deleteOne  unsuccessful")
            }
        });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (dbDeleteOne);
   
}
export default useMongoDbDeleteOne
