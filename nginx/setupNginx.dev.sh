#!/bin/bash
echo "exporting dynamic enviroment variable"

mkdir /etc/nginx/templates
cp /custom/nginx.dev.conf /etc/nginx/templates/default.conf.template
if [ $SECURE == "true" ]
then
    export listen="3000 ssl"
    export styleguidelisten="6060 ssl"
else
         export listen="3000"
         export styleguidelisten="6060"
fi

echo listen = $listen

exec "$@"