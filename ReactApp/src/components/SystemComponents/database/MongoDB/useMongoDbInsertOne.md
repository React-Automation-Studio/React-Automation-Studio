
The `useMongoDbInsertOne` hook can be used to inert a document into a MongoDB collection.

It returns a function which can be called with the following props:

|  Property |Type |Default | Description |
|:-:|:-|
|dbURL|string|| The dbURL string format is : <br/><br/>mongodb://**`host`**:**`databaseName`**:**`collectionName`**<br/><br/> **`host`**: Is name of the environment variable defined in your .env or docker-compose yaml file file and corresponds to hostname or ip and port of the mongoDB replica set, eg. `LOADSAVE_DATABASE`<br/><br/>**`databaseName`**: Is the internal MongoDB database name<br/><br/>**`collectionName`**: Is the MongoDB collection name<br/><br/>
|newEntry|Object|| The new document that will be inserted into the collection

The dBURL for example, to connect to the  LOAD_SAVE database example and insert new a new entry is:<br/>
`mongodb://LOADSAVE_DATABASE:testIOCSystems:testIOC_DATA`






useMongoDbInsertOne example:

```js static
import useMongoDbInsertOne from ' path to SystemComponents/database/MongoDB/useMongoDbInsertOne';
const dbInsertOne=useMongoDbInsertOne({});

///   define your dbURL

const dbInsertOneURL='mongodb://LOADSAVE_DATABASE:testIOCSystems:testIOC_DATA'
// and you new entry
const newEntry={"example":"example data"}

/// in your code you can call the function

    dbInsertOne({dbURL:dbInsertOneURL,newEntry:newEntry});
...

/// see the loadSave component for more usage examples.
```

