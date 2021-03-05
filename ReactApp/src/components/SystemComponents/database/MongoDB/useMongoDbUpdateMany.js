
import { useContext, useCallback } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
const useMongoDbUpdateMany = (props) => {

    const { socket } = useContext(AutomationStudioContext);

    const dbUpdateMany = useCallback((props) => {

        if (props.dbURL && (props.update || props.aggregation)) {

            let jwt = JSON.parse(localStorage.getItem('jwt'));
            if (jwt === null) {
                jwt = 'unauthenticated'
            }
                    socket.emit('databaseUpdateMany', { dbURL: props.dbURL, 'query': props.query, 'newvalues': props?.update,'aggregation':props?.aggregation, 'clientAuthorisation': jwt }, (data) => {
  
            if (data !== "OK") {

                console.log("updateOne  unsuccessful")
            }
        });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (dbUpdateMany);
   
}
export default useMongoDbUpdateMany
