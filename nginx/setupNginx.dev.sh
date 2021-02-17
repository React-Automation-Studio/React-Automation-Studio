#!/bin/bash
echo "exporting dynamic enviroment variable"

mkdir -p /etc/nginx/templates
cp /custom/nginx.dev.conf /etc/nginx/templates/default.conf.template
if [ $SECURE == "true" ]
then
    export listen="3000 ssl"
    export styleguidelisten="6060 ssl"
    sed -i '8s/.*/    ssl_certificate certificates\/server.cer;/' /etc/nginx/templates/default.conf.template
    sed -i '9s/.*/    ssl_certificate_key certificates\/server.key;/' /etc/nginx/templates/default.conf.template
    sed -i '41s/.*/    ssl_certificate certificates\/server.cer;/' /etc/nginx/templates/default.conf.template
    sed -i '42s/.*/    ssl_certificate_key certificates\/server.key;/' /etc/nginx/templates/default.conf.template
else
         export listen="3000"
         export styleguidelisten="6060"
fi

echo listen = $listen

exec "$@"