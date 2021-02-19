
import { useContext, useCallback } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
const useMongoDbDeleteOne = (props) => {
    const context=useContext(AutomationStudioContext);
    const { socket } = context;

    const dbDeleteOne = useCallback((props) => {

        if (props.dbURL && props.id) {

            let jwt = context.userTokens.accessToken;
  
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
