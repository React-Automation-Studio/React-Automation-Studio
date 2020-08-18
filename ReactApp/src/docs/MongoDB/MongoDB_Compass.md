MongoDB Compass is a free app offered by MongoDB to visually explore and manipulate your MongoDB data. It allows the user to interact with MongoDB databases with full CRUD functionality. Learn more and download the latest stable release appropriate for your OS from the [official MongoDB Compass download page](https://www.mongodb.com/try/download/compass).

Upon startup of the MongoDB Compass app, you will be required to enter a connection string to connect to your MongoDB database. To connect to a replica set, you require the hostname and port of one of the replica set members and the replica set name.

The following connection string can be used if the default React Automation Studio MongoDB configuration was deployed:
```bash
    mongodb://localhost:27017/?replicaSet=devrs
```

If you have changed the replica set members or the replica set name, please replace them in the above connection string as necessary.

***We recommend the use of MongoDB Compass as a means to debug and maintain the MongoDB servers. CRUD operations on production MongoDB servers using MongoDB Compass is not advised.**