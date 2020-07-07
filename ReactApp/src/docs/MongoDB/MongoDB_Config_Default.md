The tables below show the various MongoDB and Mongo Express settings, their default values and the file(s) that should be edited to change them.

<br/><br/>
<center>
| Parameter | Description | Default | Specification file |
|-|-|-|-|
| MONGO\_INITDB\_ROOT\_USERNAME | MongoDB root ("superuser" role) username | admin | ./mongosetup/mongosetup.env |
| MONGO\_INITDB\_ROOT\_PASSWORD | MongoDB root ("superuser" role) password | password | ./mongosetup/mongosetup.env |
| REPLICA\_SET\_NAME | MongoDB replica set name | devrs | docker-compose files |
| REPLICA\_SET\_MEMBERS | The three members of the MongoDB replica set | localhost:27017<br>localhost:27018<br>localhost:27019 | docker-compose files |
</center>
<center>*Table 1: MongoDB settings*</center>
<br/><br/>

<br/><br/>
<center>
| Parameter | Description | Default | Specification file |
|-|-|-|-|
| ME\_CONFIG\_MONGODB\_ADMINUSERNAME | MongoDB admin username* | admin | ./mongosetup/mongosetup.env |
| ME\_CONFIG\_MONGODB\_ADMINPASSWORD | MongoDB admin password* | password | ./mongosetup/mongosetup.env |
| ME\_CONFIG\_BASICAUTH\_USERNAME | Mongo Express web username | user1 | ./mongosetup/mongosetup.env |
| ME\_CONFIG\_BASICAUTH\_PASSWORD | Mongo Express web password | password | ./mongosetup/mongosetup.env |
| ME\_CONFIG\_MONGODB\_SERVER | MongoDB server location | localhost | docker-compose files |
</center>
<center>*Table 2: Mongo Express settings*</center>
<br/>
\**Enables admin access to MongoDB server using Mongo Express.*
<br/><br/>