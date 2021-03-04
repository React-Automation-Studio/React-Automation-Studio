
To customize the footer text try the example below:
```js static
<Login 
    footerString= "Login is now customizable"
    version="V2.2.0"
    timeout={5000}/>
```
Set the following in .env file to enable  Login and authentication
```bash
REACT_APP_EnableLogin=true
```
This will enable the standard login using local credentials by default.
To disable the standard login set the following in .env file: 
```bash
REACT_APP_DisableStandardLogin=true
```
Set the following in the .env file to enable Active Directory Login
```bash
REACT_APP_EnableActiveDirectoryLogin=true
LDAP_HOST=ldap://xxxxxx
LDAP_PORT=389
```
Set the following in .env file to enable  Google login:

``` bash
REACT_APP_EnableGoogleLogin=true
REACT_APP_EnableGoogleLoginId= "set this to your google client id for your domain"
```
Go to https://console.developers.google.com/apis/credentials/       
and click create new credentials and the create a new oAuth id  for the web app

It needs an https domain. 

You can enter multiple domains:

for example: https://mydomain

https://mydomain:5000

https://mydomain:3000