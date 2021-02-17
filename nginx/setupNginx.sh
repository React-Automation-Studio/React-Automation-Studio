#!/bin/bash
echo "exporting dynamic enviroment variable"

mkdir /etc/nginx/templates
cp /custom/nginx.production.conf /etc/nginx/templates/default.conf.template
if [ $SERVER_PORT == "443" ]
then
    export listen="443 ssl"
    export styleguidelisten="6060 ssl"
    sed -i '10s/.*/    ssl_certificate certificates\/server.cer;/' /etc/nginx/templates/default.conf.template
    sed -i '11s/.*/    ssl_certificate_key certificates\/server.key;/' /etc/nginx/templates/default.conf.template
    sed -i '39s/.*/    ssl_certificate certificates\/server.cer;/' /etc/nginx/templates/default.conf.template
    sed -i '40s/.*/    ssl_certificate_key certificates\/server.key;/' /etc/nginx/templates/default.conf.template
    if [[ ! -z ${HTTP_REDIRECT_TO_HTTPS} ]]
    then
        if [ $HTTP_REDIRECT_TO_HTTPS == "true" ]
        then
            cat /custom/nginx.httpredirect.conf >> /etc/nginx/templates/default.conf.template
            cat /etc/nginx/templates/default.conf.template
        fi
    fi
else
    if [[ ! -z ${SECURE} ]]
    then
        if [ $SECURE == "true" ]
        then
            export listen="$SERVER_PORT ssl"
            export styleguidelisten="6060 ssl"
            sed -i '10s/.*/    ssl_certificate certificates\/server.cer;/' /etc/nginx/templates/default.conf.template
            sed -i '11s/.*/    ssl_certificate_key certificates\/server.key;/' /etc/nginx/templates/default.conf.template
            sed -i '39s/.*/    ssl_certificate certificates\/server.cer;/' /etc/nginx/templates/default.conf.template
            sed -i '40s/.*/    ssl_certificate_key certificates\/server.key;/' /etc/nginx/templates/default.conf.template
        else  
            export listen="$SERVER_PORT"
            export styleguidelisten="6060"  
        fi
    else
        export listen="$SERVER_PORT"
        export styleguidelisten="6060"
        
    fi
fi
echo listen = $listen
echo HTTP_REDIRECT_TO_HTTPS= $HTTP_REDIRECT_TO_HTTPS
exec "$@"