
The `useMongoDbUpdateOne` hook can be used to update a document into a MongoDB collection.

It returns a function which can be called with the following props:

|  Property |Type |Default | Description |
|:-:|:-|
|dbURL|string|| The dbURL string format is : <br/><br/>mongodb://**`MongoDbReplicaSet`**:**`databaseName`**:**`collectionName`**<br/><br/> **`MongoDbReplicaSet`**: Is name of the environment variable defined in your .env or docker-compose yaml file file and corresponds to hostname or ip and port of the mongoDB replica set, eg. `LOADSAVE_DATABASE`<br/><br/>**`databaseName`**: Is the internal MongoDB database name<br/><br/>**`collectionName`**: Is the MongoDB collection name<br/><br/>
|id|string| |The id of the document to be updated
|update|Object|| This Object defines the pyMongo update_one update that will be performed eg. <br> 



The dBURL for example, to connect to the  LOAD_SAVE database example and insert new a new entry is:<br/>
`mongodb://LOADSAVE_DATABASE:testIOCSystems:testIOC_DATA`






useMongoDbUpdateOne example:

```js static
import useMongoDbUpdateOne from ' path to SystemComponents/database/MongoDB/useMongoDbUpdateOne';
const dbUpdateOne=useMongoDbUpdateOne({});

///   define your dbURL

const dbUpdateOneURL='mongodb://LOADSAVE_DATABASE:testIOCSystems:testIOC_DATA'


    //define the id to filter by
     let id = externallyDefinedIdFromWatch['_id']['$oid'];
    // define the update to be performed
    let update = { '$set': { "beam_setup.Status": "Working" } }
    /// in your code you can call the function
    dbUpdateOne({dbURL:dbListUpdateOneURL,id:id,update:update});
...
...

/// see the loadSave component for more usage examples.
```
