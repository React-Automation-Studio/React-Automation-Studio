#!/bin/bash
echo "exporting dynamic enviroment variable"

mkdir -p /etc/nginx/templates
cp /custom/nginx.production.conf /etc/nginx/templates/default.conf.template
if [[ $SERVER_PORT == "443" ]]
then
    export listen="443 ssl"
    export styleguidelisten="6060 ssl"
    sed -i 's/#insert ssl_certificate def here;/ssl_certificate certificates\/server.cer;/g' /etc/nginx/templates/default.conf.template
    sed -i 's/#insert ssl_certificate_key def here;/ssl_certificate_key certificates\/server.key;/g' /etc/nginx/templates/default.conf.template
    if [[ ! -z ${HTTP_REDIRECT_TO_HTTPS} ]]
    then
        if [[ $HTTP_REDIRECT_TO_HTTPS == "true" ]]
        then
            cat /custom/nginx.httpredirect.conf >> /etc/nginx/templates/default.conf.template
            cat /etc/nginx/templates/default.conf.template
        fi
    fi
else
    if [[ ! -z ${SECURE} ]]
    then
        if [[ $SECURE == "true" ]]
        then
            export listen="$SERVER_PORT ssl"
            export styleguidelisten="6060 ssl"
            sed -i 's/#insert ssl_certificate def here;/ssl_certificate certificates\/server.cer;/g' /etc/nginx/templates/default.conf.template
            sed -i 's/#insert ssl_certificate_key def here;/ssl_certificate_key certificates\/server.key;/g' /etc/nginx/templates/default.conf.template
        else  
            export listen="$SERVER_PORT"
            export styleguidelisten="6060"  
        fi
    else
        export listen="$SERVER_PORT"
        export styleguidelisten="6060"
        
    fi
fi
echo ""
echo listen = $listen
echo HTTP_REDIRECT_TO_HTTPS= $HTTP_REDIRECT_TO_HTTPS
exec "$@"