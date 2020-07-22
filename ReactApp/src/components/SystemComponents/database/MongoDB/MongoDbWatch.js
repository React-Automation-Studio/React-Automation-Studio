import  React,{ useContext, useState, useEffect } from 'react';
import AutomationStudioContext from '../../AutomationStudioContext';
import PropTypes from "prop-types";

export const useMongoDbWatch = (props) => {

    const context = useContext(AutomationStudioContext);
    const [dbWatchId, setDbWatchId] = useState(null);
    const [data, setData] = useState(null);
    const [writeAccess, setWriteAccess] = useState(false);
    useEffect(() => {
        const handleDatabaseReadWatchAndBroadcastAck = (msg) => {
            //console.log(msg)
            if (typeof msg !== 'undefined') {
                setDbWatchId(msg.dbWatchId)
            }
        }
        const handleNewDbLogReadWatchBroadcast = (msg) => {
            //console.log(msg)
            const newData = JSON.parse(msg.data);
            setData(newData);
            setWriteAccess(msg.write_access)
        }

        let socket = context.socket;
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }
        if (props.dbURL) {
            socket.emit('databaseReadWatchAndBroadcast', { 'dbURL': props.dbURL, 'clientAuthorisation': jwt }, handleDatabaseReadWatchAndBroadcastAck)
            socket.on('databaseWatchData:' + props.dbURL, handleNewDbLogReadWatchBroadcast);
        }

        return () => {

            if (props.dbURL) {
                if (dbWatchId !== null) {
                    socket.emit('remove_dbWatch', { dbURL: props.dbURL, dbWatchId: dbWatchId, 'clientAuthorisation': jwt });
                }
                socket.removeListener('databaseWatchData:' + props.dbURL, handleNewDbLogReadWatchBroadcast);
            }

        }

    }, [props.dbURL])

    return ({ data: data, writeAccess: writeAccess, dbURl: props.dbURL })
}

/**
 * The MongoDbWatch component setups a watch to MongoDB replica set within the pvServer. The watch returns all the data on the initial read and after subsequent updates to the data in the database.
 * The component exposes an object to child function component that is composed of the watched data, writeAccess and dbURL
 * The data is of null type until it returned form the pvServer. The data is broadcast to any clients that have subscribed to the same dbURL.
 * The access rights within the pvServer can used to secure the data and provide access to privileged users only. 
 * 
 * A hook called useMongoDbWatch is also exported which returns the watch object.
 * 
 * We recommend using the Hook over the other methods in your code.
 * 
 * 
 * 
 * 
 **/
const MongoDbWatch=(props)=>{
    const watchObject=useMongoDbWatch(props.dbURL);
    useEffect(() => {
        if (props.watchObject){
        props.watchObject(watchObject);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [watchObject,props.watchObject])
    return (
        <React.Fragment>
        {props.children(watchObject)}
        </React.Fragment>
    )
}

MongoDbWatch.propTypes = {
  
    /** The pvServer's MongoDB watch string
     *  The dbURL string format is : <br/>
     *  mongodb://**`databaseName`**:**`collectionName`**:Parameters:**`Parameters`**
     *  <br/>
     *  <br/>
     *  **`databaseName`**: Is the enviroment variable defined in your .env file and corresponds to hostname or ip and port of the mongoDB replica set.
     *  <br/>
     *  <br/>
     *  **`collectionName`**: Is the MongoDB collection name
     *  <br/>
     *  <br/>
     *  **`Parameters`**: is a JSON object that defines the MongoDB `find` query parameters
     *  <br/>
     *  <br/>
     *  The dBURL for example, to connect to the  LOAD_SAVE database example and read and watch the data that is not marked deleted is:<br/>
     * 
     *   `mongodb://LOADSAVE_DATABASE:testIOCSystems:testIOC_DATA:Parameters:{"query":{"beam_setup.Status":{"$ne":"Delete"}}}`
     */
    dbURL: PropTypes.string,
     /** A function that returns the watched db object */

   callback: PropTypes.func,
    
  
  
  };
  
 
  MongoDbWatch.defaultProps = {
  
  
  };
  
export default MongoDbWatch