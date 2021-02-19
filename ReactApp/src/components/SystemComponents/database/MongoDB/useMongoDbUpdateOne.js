
import { useContext, useCallback } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
const useMongoDbUpdateOne = (props) => {

    const context=useContext(AutomationStudioContext);
    const { socket } = context;

    const dbUpdateOne = useCallback((props) => {

        if (props.dbURL && props.update&&props.id) {

            let jwt = context.userTokens.accessToken;
            if (jwt === null) {
                jwt = 'unauthenticated'
            }
  
                    socket.emit('databaseUpdateOne', { dbURL: props.dbURL, 'id': props.id, 'newvalues': props.update, 'clientAuthorisation': jwt }, (data) => {
  
            if (data !== "OK") {

                console.log("updateOne  unsuccessful")
            }
        });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (dbUpdateOne);
   
}
export default useMongoDbUpdateOne
