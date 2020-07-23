

### useMongoDbWatch Hook

The `useMongoDbWatch` returns all the data on the initial read and after subsequent updates to the data in the database.

|  Property |Type |Default | Description |
|:-:|:-|
|dbURL|string|| The dbURL string format is : <br/><br/>mongodb://**`MongoDbReplicaSet`**:**`databaseName`**:**`collectionName`**:Parameters:**`Parameters`**<br/><br/>**`MongoDbReplicaSet`**: Is name of the environment variable defined in your .env or docker-compose yaml file file and corresponds to hostname or ip and port of the mongoDB replica set, eg. `LOADSAVE_DATABASE`<br/><br/>**`databaseName`**: Is the internal MongoDB database name<br/><br/>**`collectionName`**: Is the MongoDB collection name<br/><br/>**`Parameters`**: is a JSON object that defines the MongoDB `find` query parameters<br/><br/>
The dBURL for example, to connect to the  LOAD_SAVE database example and read and watch the data that is not marked deleted is:<br/>
`mongodb://LOADSAVE_DATABASE:testIOCSystems:testIOC_DATA:Parameters:{"query":{"beam_setup.Status":{"$ne":"Delete"}}}`

The object that is returned has a default structure with the following properties:
```js static
{
    data: null,
    writeAccess:false,
    dbURL:props.dbURL
  }
```
|  Property |Type |Default | Description |
|:-:|:-|
|data|any|null| The db watch's returned data
|writeAccess|bool|false| true when has write access to the database
|dbURL|string|| The dbURL .




useMongoDbWatch example:

```js static
import useMongoDbWatch from 'path to SystemComponents/database/MongoDB/useMongoDbWatch'
const dbObject=useMongoDbWatch(
    {
        dbURL:'mongodb://LOADSAVE_DATABASE:testIOCSystems:testIOC_DATA:Parameters:{"query":{"beam_setup.Status":{"$ne":"Delete"}}}'
    });
const {data}=dbObject;
const {writeAccess}=dbObject;
...
```
