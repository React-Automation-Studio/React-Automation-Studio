*(The following section is intended as a primer for developers not familiar with MongoDB and is not intended as a comprehensive helper. For detailed documentation see the [official MongoDB wesbite](https://www.mongodb.com/))*

MongoDB is a document-oriented NoSQL database used for high volume data storage. Instead of using tables and rows as in traditional relational databases (RDBMS), MongoDB makes use of collections and documents.

<center><img src="img/RDBMS-MongoDB.jpg" alt="RDBMS-MongoDB" width="60%"/></center>  
<center>*Comparing traditional RDBMS to MongoDB (source: educba.com)*</center>
<br/><br/>

A MongoDB server can host multiple Mongo databases. Each MongoDB database consists of one or more MongoDB collections. Each collection of a MongoDB consists of one or more MongoDB documents.

<center><img src="img/MongoDB-hierarchy.jpg" alt="RDBMS-MongoDB" width="60%"/></center>  
<center>*MongoDB database hierarchy (source: educba.com)*</center>
<br/><br/>

MongoDB documents consist of key-value pairs which are the basic unit of data in MongoDB. MongoDB stores data in these documents in the format of BSON (binary JSON). Each document can be different with a varying number of fields. The size and content of each document can also vary.

MongoDB is favoured amongst developers as the MongoDB document structure is similar to how dictionaries and objects are constructed in popular scripting languages such as JavaScript and Python.

***In React Automation Studio the PyMongo driver for MongoDB is used to interface with MongoDB servers from Python.**

<center><img src="img/PyMongo.png" alt="RDBMS-MongoDB" width="100%"/></center>  
<center>*MongoDB server hierarchy and interfacing with Python (source: pythontic.com)*</center>
<br/><br/>