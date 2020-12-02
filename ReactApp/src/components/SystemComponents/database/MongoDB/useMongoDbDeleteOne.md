
The `useMongoDbDeleteOne` hook can be used to delete a document in a MongoDB collection.

It returns a function which can be called with the following props:

|  Property |Type |Default | Description |
|:-:|:-|
|dbURL|string|| The dbURL string format is : <br/><br/>mongodb://**`host`**:**`databaseName`**:**`collectionName`**<br/><br/> **`host`**: Is name of the environment variable defined in your .env or docker-compose yaml file file and corresponds to hostname or ip and port of the mongoDB replica set, eg. `LOADSAVE_DATABASE`<br/><br/>**`databaseName`**: Is the internal MongoDB database name<br/><br/>**`collectionName`**: Is the MongoDB collection name<br/><br/>
|id|string| |The id of the document to be deleted
<br> 









useMongoDbDeleteOne example:

```js static
import useMongoDbDeleteOne from ' path to SystemComponents/database/MongoDB/useMongoDbDeleteOne';
const dbDeleteOne=useMongoDbDeleteOne({});

///   define your dbURL

const dbUpdateOneURL='mongodb://LOADSAVE_DATABASE:testIOCSystems:testIOC_DATA'


    //define the id of document to delete
     let id = externallyDefinedIdFromWatch['_id']['$oid'];
    /// in your code you can call the function
    dbDeleteOne({dbURL:dbListUpdateOneURL,id:id});
...
...

/// see the alarmHandler component for more usage examples.
```
