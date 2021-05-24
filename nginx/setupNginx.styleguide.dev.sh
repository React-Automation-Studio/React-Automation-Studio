#!/bin/bash
echo "exporting dynamic enviroment variable"

mkdir -p /etc/nginx/templates
cp /custom/nginx.styleguide.dev.conf /etc/nginx/templates/default.conf.template
if [ $SECURE == "true" ]
then
    export listen="3000 ssl"
    export styleguidelisten="6060 ssl"
    sed -i 's/#insert ssl_certificate def here;/ssl_certificate certificates\/server.cer;/g' /etc/nginx/templates/default.conf.template
    sed -i 's/#insert ssl_certificate_key def here;/ssl_certificate_key certificates\/server.key;/g' /etc/nginx/templates/default.conf.template
else
         export listen="3000"
         export styleguidelisten="6060"
fi

echo listen = $listen

exec "$@"