After enabling HTTPS 

Set up the .env to enable login:
```bash
cd ..
ls .env
```
If the .env file exists in the root folder, then edit it and set :
```bash
REACT_APP_EnableLogin=true
```
If the .env file does not exist in the root folder, then:
```bash
cp example.env .env
```
 then edit .env and set:
```bash
REACT_APP_EnableLogin=true
```
Make sure that the other parameters in the file are correct. Or see 4.1:

The default username and password  will be admin / admin

The admin user will have full read and write access, whilst any other user will have read access by default.

To enable Active Directory Authentication open the .env and add, (You will need to rebuild the docker images):
```bash
REACT_APP_EnableActiveDirectoryLogin=true
LDAP_HOST=ldap://xxxxxx
LDAP_PORT=389

```

To enable Active Directory Authentication open the .env and add, (You will need to rebuild the docker images):
```bash
Set REACT_APP_EnableGoogleLogin=true
REACT_APP_EnableGoogleLoginId= xxxxx
```
Set `REACT_APP_EnableGoogleLoginId` to your google client id for your domain
at https://console.developers.google.com/apis/credentials/           
click create new credentials and the create a new oAuth id  for the web app
It needs an https domain. 
you can enter multiple domains:
for example: https://mydomain
https://mydomain:5000
https://mydomain:3000


It is envisioned that in the future more external authentication mechanisms will be added. In this case one may want to disable the standard authentication. This can be done by setting:

```bash
REACT_APP_DisableStandardLogin=true
```
in the .env file.
