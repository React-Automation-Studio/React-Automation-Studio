#!/bin/bash
echo "exporting dynamic enviroment variable"

mkdir /etc/nginx/templates
cp /custom/nginx.production.conf /etc/nginx/templates/default.conf.template
if [ $SERVER_PORT == "443" ]
then
    export listen="443 ssl"
    if [ $HTTP_REDIRECT_TO_HTTPS == "true" ]
    then
        cat /custom/nginx.httpredirect.conf >> /etc/nginx/templates/default.conf.template
    fi
else
    if [ $SECURE == "true" ]
    then
        export listen="$SERVER_PORT ssl"
    else
         export listen="$SERVER_PORT"
    fi
fi
echo listen = $listen
echo HTTP_REDIRECT_TO_HTTPS= $HTTP_REDIRECT_TO_HTTPS
exec "$@"