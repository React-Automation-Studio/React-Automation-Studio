The object return through the callback or passed to the child function has a default structure with the following properties:
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



We recommend using the hook.


Hooks example:

```js static
import {useMongoDbWatch} from 'path to SystemComponents/database/MongoDB/MongoDbWatch'
const dbObject=useMongoDbWatch({dbURL:"customDbURL"});
const {data}=dbObject;
const {writeAccess}=dbObject;
...
```

For Class components pass the data to the children or raise it using the callback:
```js static
<MongoDbWatch>
    dbURL={"custom dbURL string"}
    {
    ({data})=>{
        console.log(data)
    }
    }
</MongoDbWatch>
```
```js static
<MongoDbWatch>
    dbURL={"custom dbURL string"}
    callback={myCustomCallback}
</MongoDbWatch>
```
