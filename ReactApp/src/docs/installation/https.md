The system is by default configured to serve the socket connections and client webserver over HTTP on localhost.

To enable secure login and installation as a PWA, a certificate and key needs to be installed that is bound to your hostname and the .env environment variables needs to be edited to serve overs HTTPS .

Inside the React Automation Studio installation folder:

```bash
ls .env
```
If it exists edit the .env file, otherwise copy example.env to .env and set

```bash

SERVER_PORT=5000
SECURE=true
HTTP_REDIRECT_TO_HTTPS=true

```
Alternately set SERVER_PORT to 443 which is the standard ssl port.

The certificates need to be placed in the the React Automation Studio installation folder under the certificates folder.

The certificate needs to be called: server.cer And the key needs to be called: server.key The .gitignore will prevent them from being copied to the repository

It is recommended to use a CA signed certificate, otherwise you can generate a self signed certificate using:

 openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout server.key -out server.cer -subj "/CN=selfsigned" -addext "subjectAltName=DNS:localhost,IP:xxx.xxx.xxx.xxx"

In chrome you will need to add the certificate manually:
In Chrome go to
chrome://settings/security
Navigate to Manage certificates > Authorities and click on Import
Browse to where the self signed certificate and key and stored (certificates) and click OPEN
Ensure all Trust settings for the Certificate authority is ticked

The docker-compose  environment, will need to be restarted. Nginx will detect the change and serve the app over https.


The built client will be then served  https://(hostname or ip):SERVER_PORT/, the styleguide at https://(hostname or ip):6060/ and the dev client at https://(hostname or ip):3000
