
To customize the footer text try the example below:

``` js
<Login 
    footerString= "Login is now customizable"
    version="V5.0.0"
    timeout={5000}/>
```
Set the following in .env file to enable  Login and authentication

``` bash
VITE_EnableLogin=true
```
This will enable the standard login using local credentials by default.
To disable the standard login set the following in .env file: 

``` bash
VITE_DisableStandardLogin=true
```
Set the following in the .env file to enable Active Directory Login

``` bash
VITE_EnableActiveDirectoryLogin=true
LDAP_HOST=ldap://xxxxxx
LDAP_PORT=389
```
Set the following in .env file to enable  Google login:

``` bash
VITE_EnableGoogleLogin=true
VITE_EnableGoogleLoginId= "set this to your google client id for your domain"
```
Go to https://console.developers.google.com/apis/credentials/       
and click create new credentials and the create a new oAuth id  for the web app

It needs an https domain. 

You can enter multiple domains:

for example: https://mydomain

https://mydomain:5000

https://mydomain:3000