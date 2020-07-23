MongoDB has been integrated with React-Automation-Studio following release V2.0.0

There are currently several hooks available that setup a watch, perform an update or an insert to MongoDB replica set within the pvServer. 

### useMongoDbWatch Hook

The `useMongoDbWatch` returns all the data on the initial read and after subsequent updates to the data in the database.

### useMongoDbUpdateOne Hook
The `useMongoDbUpdateOne` hook can be used to update a document into a MongoDB collection.

### useMongoDbInsertOne Hook

The `useMongoDbInsertOne` hook can be used to inert a document into a MongoDB collection.
