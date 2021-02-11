#!/bin/bash
echo "exporting dynamic enviroment variable"

mkdir /etc/nginx/templates
cp /custom/nginx.production.conf /etc/nginx/templates/default.conf.template
if [ $port == "443" ]
then
    export listen="443 ssl"
    if [ $httpRedirect == "true" ]
    then
        cat /custom/nginx.httpredirect.conf >> /etc/nginx/templates/default.conf.template
    fi
else
    if [ $ssl == "true" ]
    then
        export listen="$port ssl"
    else
         export listen="$port"
    fi
fi
echo listen = $listen
echo httpRedirect= $httpRedirect
exec "$@"