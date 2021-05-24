The access rights for each user are managed in the web administrator. If logged in as an admin role, the administrator link is via the more options in the right corner.

The default access rights are seeded only once by the adminDbInit mircoservice.

Regular expression rules are used to evaluate the read and write access rights.

The order in which the user access groups and rules are defined are important. The first rule applied is the DEFAULT, all user will get this. The final access group rules to be applied are the ADMIN rules to the applicable user groups.

For example in the default user access group, the rules disables write access and enable read access for all usernames and process variables:

The table display in the user interface allows one ot edit the access rights in the database and the DEFAULT UAG is shown in Fig 3.3.1

<img src="img/UAGSdefault.png" alt="drawing" width="80%"/>

*Fig 3.3.1. The administrator access control page showing the default UAG*

To enable write access for everyone one could check the write access check boxes. To disable read access and therefore prevent access by anyone by default one could deselect the read checkboxes. The username set in DEFAULT UAG is '*' and by setting any of the UAG usernames to '*' implies that all users will get the rules defined in the UAG. 
In the pvServer, the read and write access of the rules in the UAG are applied if the username is defined in the UAG and the following match function is satisfied:<br/><br/>
   match=re.search(rule,pv)
   <br/>
   <br/>
   If the match is true, then the rule is applied.
   <br/>
    
  <br/>
  In theory, all regular expression searches allowed by Python regex can be used although this has not been tested. More examples are available at:<br/>
  <br/>
https://www.w3schools.com/python/python_regex.asp

  
   <br/>
   <br/>
   In the two examples shown below in Fig 3.3.2 and 3.3.3, the ENGINEERS UAG, with roles as 'engineers' and user name user1 get read and write access to every pv, whilst the OPERATORS UAG, with roles as operators and username operator1 only gets read access for all pvs and write access for the two setpoint pvs.
   In this way the same user interface can be used for different roles and the operators will have different rights to the engineers.
   <br/>
   <br/>
   <img src="img/UAGengineers.png" alt="drawing" width="60%"/>
   <br/>
  
   *Fig 3.3.2. An example UAG for Engineers*
  <br/>
   <br/>
  <img src="img/UAGoperators.png" alt="drawing" width="60%"/>
   <br/>
   *Fig 3.3.3. An example UAG for Operators*

<br/>
<br/>
** New** to release 3.0.0 are the protected routes which uses the role and roles array prop to protect the route. This now enables portions of your app to isolated from other users.
<br/>
<br/>

## 3.4 Access and refresh tokens expiry

<br/>
<br/>
By default, unless a user logs out the refresh token will keep as user logged in for 1 week. And whilst the user is logged in the access tokens and refresh tokens are refreshed once a minute.
<br/>
<br/>
The token expiry is controlled by the following variables in the .env file. 

<br/>
<br/>

| Variable Name |Default [s] | Description |
|-|-|-|
|REFRESH_COOKIE_MAX_AGE_SECS|604800|The refresh token will expire by default after 1 week.
|ACCESS_TOKEN_MAX_AGE_SECS|300|The access token will expire by default after 5 minutes.
|REFRESH_TIMEOUT|60|If the user is logged in then the refresh token and access token will be refresh by default once a minute.
