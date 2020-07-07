Replication is the process of providing redundancy and increased data availability by storing multiple copies of data on different database servers. This provides a level of fault tolerance against the loss of a single database server and should be the basis for all production deployments.

In MongoDB replication is provided for using a replica set - a group of mongod processes that maintain the same data set. A replica set contains several data bearing nodes and optionally one arbiter node. Of the data bearing nodes, only one member is deemed the primary node, while the other nodes are deemed secondary nodes.

The primary node receives all write operations. The secondaries replicate the primary’s oplog and apply the operations to their data sets such that the secondaries’ data sets reflect the primary’s data set. If the primary is unavailable, an eligible secondary will hold an election to elect itself the new primary.

<center><img src="src/docs/MongoDB/replica-set.svg" alt="RDBMS-MongoDB" width="50%"/></center>  
<center>*Replication in MongoDB (source: docs.mongodb.com)*</center>
<br/><br/>

***In React Automation Studio a replica set with three (3) data bearing nodes and no arbiter is used to provide replication.**